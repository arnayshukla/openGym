import { describe, it, expect } from 'vitest'
import { buildPlanBundle, parsePlan, mergePlan } from './plan-share.js'
import { TRAINING_TEMPLATES, templatePlan } from './training-plans.js'

describe('plan share v2 with legacy support', () => {
  it('round-trips rest and progression without exporting health answers or meals', () => {
    const s = { ...templatePlan(TRAINING_TEMPLATES[0]), customEx: [], workouts: [{ private: true }], dietPlans: [{ private: true }], plannerProfile: { nutrition: { weight: 65, allergens: ['milk'] } } }
    const bundle = buildPlanBundle(s, 'Share')
    expect(bundle.opengym_plan).toBe(2)
    expect(Object.keys(bundle).sort()).toEqual(['customEx', 'exported', 'name', 'opengym_plan', 'routines', 'week'])
    const parsed = parsePlan(JSON.stringify(bundle))
    expect(parsed.routines[0].ex[0]).toMatchObject({ restSec: 90, prog: 'linear', sets: 2 })
    const target = { routines: [{ id: 'existing', ex: [] }], week: { 0: 'existing' }, customEx: [] }
    mergePlan(target, parsed, { schedule: true })
    expect(target.routines[0].id).toBe('existing')
    expect(target.routines[1].id).not.toBe(parsed.routines[0].id)
    expect(target.week[0]).toBeUndefined()
    expect(target.week[1]).toBe(target.routines[1].id)
  })
  it('continues to read v1 and rejects unsupported versions', () => {
    expect(parsePlan({ opengym_plan: 1, routines: [{ id: 'r', ex: [{ id: '0025', sets: 3, reps: 8 }] }] }).exerciseCount).toBe(1)
    expect(() => parsePlan({ opengym_plan: 3, routines: [] })).toThrow()
  })
})
