import { describe, it, expect } from 'vitest'
import { EXDB } from './exercises-data.js'
import { buildSets } from './history.js'
import { TRAINING_TEMPLATES, MOVEMENTS, EQUIPMENT, GOALS, requirements, templatePlan, generateTrainingPlan, estimateMinutes, replaceTrainingExercise, migratePlans, captureActivePlan, saveTrainingPlan, activateTrainingPlan, validateTemplates } from './training-plans.js'

const profile = { adult: true, healthConcern: false, goal: 'general fitness', level: 'beginner', days: 3, minutes: 60, style: 'gym', equipment: EQUIPMENT, avoidIds: [], avoidPatterns: [], lowImpact: true, activity: 'low' }
const state = () => ({ routines: [{ id: 'r1', name: 'Existing', ex: [{ id: '0025', sets: 3, reps: 8, weight: 25 }] }], week: { 1: 'r1' }, dayPlan: { '2026-09-09': 'r1' }, workouts: [{ id: 'logged', rid: 'r1', entries: [] }], exWeights: { '0025': 25 }, customEx: [{ id: 'custom', n: 'Mine' }], active: null })
describe('versioned workout templates', () => {
  it('validates six families and references existing exercises only', () => {
    expect(validateTemplates()).toBe(true)
    expect(TRAINING_TEMPLATES).toHaveLength(6)
    for (const t of TRAINING_TEMPLATES) for (const r of t.routines) for (const e of r.ex) {
      expect(EXDB.some(x => x.id === e.id)).toBe(true)
      expect(e.restSec).toBeGreaterThan(0)
      if (e.bodyweight) expect(e.repsMax).toBeGreaterThanOrEqual(e.reps)
      expect(requirements(e.id).every(x => EQUIPMENT.includes(x))).toBe(true)
    }
    for (const ids of Object.values(MOVEMENTS)) expect(ids.every(id => EXDB.some(e => e.id === id))).toBe(true)
  })
  it('retains the original PPL IDs and offers a six-day schedule', () => {
    const p = templatePlan(TRAINING_TEMPLATES.find(t => t.id === 'ppl'), 6)
    expect(Object.keys(p.week)).toHaveLength(6)
    expect(p.routines[0].ex.map(e => e.id)).toEqual(['0025', '0047', '0426', '0334', '0241', '0251'])
    expect(p.week[1]).toBe(p.week[4])
  })
  it('tracks fixtures as well as resistance equipment', () => {
    expect(requirements('2300')).toEqual(['row bar'])
    expect(requirements('0043')).toContain('squat rack')
    expect(requirements('0251')).toContain('dip bars')
    expect(requirements('0970')).toEqual(['band', 'pull-up bar'])
  })
  it('does not turn unspecified conditioning speed into an 8 km/h prescription', () => {
    const cfg = { id: '2138', mode: 'cardio', min: 10, speed: 0, sets: 1 }
    expect(buildSets({ workouts: [] }, cfg)).toEqual([{ min: 10, speed: 0, done: false }])
  })
  it('swapping recomputes per-side and bodyweight configuration', () => {
    const side = replaceTrainingExercise({ id: '0739', pattern: 'knee', sets: 2, reps: 10, mode: 'reps', restSec: 90 }, '2368')
    expect(side).toMatchObject({ side: true, bodyweight: true, reps: 16 })
    const back = replaceTrainingExercise(side, '0739')
    expect(back.side).toBeUndefined(); expect(back.bodyweight).toBeUndefined()
    expect(back.reps).toBe(10)
  })
})
describe('deterministic training personalization', () => {
  it.each(GOALS)('supports %s with bounded session estimates', goal => {
    const p = { ...profile, goal }
    const a = generateTrainingPlan(p)
    expect(a).toEqual(generateTrainingPlan(p))
    expect(a.routines.every(r => estimateMinutes(r) <= p.minutes)).toBe(true)
    expect(a.generationProfileSnapshot).not.toBe(p)
  })
  it.each([2, 3, 4, 6])('builds %s training days', days => {
    const a = generateTrainingPlan({ ...profile, days, level: days === 6 ? 'intermediate' : 'beginner', minutes: 90 })
    expect(Object.keys(a.week)).toHaveLength(days)
  })
  it('never invents exercises or restores unavailable equipment', () => {
    const a = generateTrainingPlan({ ...profile, style: 'calisthenics', equipment: ['bench', 'row bar'], avoidIds: ['0493'] })
    for (const r of a.routines) for (const e of r.ex) {
      expect(e.id).not.toBe('0493')
      expect(EXDB.find(x => x.id === e.id).eq).toBe('body weight')
      expect(requirements(e.id).every(eq => ['bench', 'row bar'].includes(eq))).toBe(true)
    }
  })
  it.each([
    [{ adult: false }, /adults/], [{ healthConcern: true }, /professional/],
    [{ days: 6 }, /experienced/], [{ equipment: [] }, /No compatible/],
    [{ avoidPatterns: ['knee'] }, /No compatible knee/], [{ minutes: 25 }, /minutes/],
    [{ goal: 'invented' }, /goal/], [{ equipment: ['magic'] }, /equipment/],
  ])('fails explicitly for incompatible preferences %j', (changes, message) => {
    expect(() => generateTrainingPlan({ ...profile, ...changes })).toThrow(message)
  })
})
describe('active projection and migrations', () => {
  it('migrates once without losing IDs, overrides, weights, custom exercises or history', () => {
    const s = state(), old = structuredClone(s)
    migratePlans(s); migratePlans(s); captureActivePlan(s)
    expect(s.trainingPlans).toHaveLength(1)
    expect(s.trainingPlans[0].routines).toEqual(old.routines)
    expect(s.trainingPlans[0].dayPlan).toEqual(old.dayPlan)
    for (const k of ['workouts', 'exWeights', 'customEx', 'routines', 'week']) expect(s[k]).toEqual(old[k])
    expect(s.schemaVersion).toBe(2)
  })
  it('saving is not activation; activation snapshots and restores independently', () => {
    const s = state(), before = structuredClone(s)
    const draft = templatePlan(TRAINING_TEMPLATES[0])
    saveTrainingPlan(s, draft, 'p2', 100)
    expect(s.routines).toEqual(before.routines)
    activateTrainingPlan(s, 'p2', 200)
    expect(s.routines[0].id).toBe('p2-r0')
    s.routines[0].ex[0].weight = 55
    activateTrainingPlan(s, 'legacy-plan', 300)
    expect(s.routines).toEqual(before.routines)
    expect(s.dayPlan).toEqual(before.dayPlan)
    activateTrainingPlan(s, 'p2', 400)
    expect(s.routines[0].ex[0].weight).toBe(55)
    expect(s.workouts).toEqual(before.workouts)
    expect(draft.routines[0].ex[0].weight).toBe(0)
  })
  it('blocks switching during a live workout', () => {
    const s = state(); migratePlans(s); s.active = { entries: [] }
    const before = structuredClone(s)
    expect(() => activateTrainingPlan(s, 'legacy-plan')).toThrow(/Finish/)
    expect(s).toEqual(before)
  })
  it('does not orphan manually created routines after saving an inactive plan', () => {
    const s = { routines: [], week: {}, dayPlan: {} }
    saveTrainingPlan(s, templatePlan(TRAINING_TEMPLATES[0]), 'saved')
    s.routines.push({ id: 'manual', ex: [] }); captureActivePlan(s)
    expect(s.trainingPlans.find(p => p.id === s.activeTrainingPlanId).routines[0].id).toBe('manual')
  })
  it('round-trips through the existing JSON persistence shape', () => {
    const s = state(); saveTrainingPlan(s, templatePlan(TRAINING_TEMPLATES[0]), 'p2')
    const restored = migratePlans(JSON.parse(JSON.stringify(s)))
    expect(restored).toEqual(s)
    expect(() => saveTrainingPlan(s, templatePlan(TRAINING_TEMPLATES[0]), 'p2')).toThrow(/already exists/)
  })
})
