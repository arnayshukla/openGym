import { EXDB } from './exercises-data.js'

const clone = x => JSON.parse(JSON.stringify(x))
const index = Object.fromEntries(EXDB.map(e => [e.id, e]))
export const GOALS = ['general fitness', 'strength', 'muscle gain', 'healthy fat loss']
export const EQUIPMENT = ['dumbbell', 'barbell', 'bench', 'squat rack', 'dip bars', 'cable', 'leverage machine', 'sled machine', 'band', 'pull-up bar', 'row bar', 'stationary bike', 'elliptical machine']
// Equipment in the source catalogue describes resistance, not fixtures: a bodyweight
// row still requires a secure bar. These curated requirements are authoritative here.
export const MOVEMENTS = {
  push: ['0577', '0025', '0493', '0662'], pull: ['0861', '1323', '2300', '0499'],
  verticalPull: ['2330', '0970', '0652'], knee: ['0739', '0043', '2368', '3470'],
  hinge: ['0085', '1459', '3013'], shoulder: ['0405', '0426', '0603'],
  core: ['0276', '0872'], calves: ['0605', '1373'], biceps: ['0031', '0313', '0294'],
  triceps: ['0241', '2398'], cardio: ['2138', '2141', '0685'], lateral: ['0334', '0178']
}
export function requirements(id) {
  const e = index[id]
  if (!e) return ['unknown']
  const extra = { '0025': ['bench'], '0047': ['bench'], '0043': ['squat rack'], '0251': ['dip bars'], '0493': ['bench'], '0405': ['bench'], '2300': ['row bar'], '0499': ['row bar'], '0652': ['pull-up bar'], '0970': ['pull-up bar'] }
  return [...(e.eq === 'body weight' ? [] : [e.eq]), ...(extra[id] || [])]
}
const ex = (id, pattern, sets = 2, reps = 10) => ({ id, pattern, sets, reps, weight: 0, mode: 'reps', prog: 'linear', restSec: 90, ...(index[id]?.eq === 'body weight' ? { bodyweight: true, repsMax: 15 } : {}), ...(['2368', '3470', '0276'].includes(id) ? { side: true, reps: 16, repsMax: 24 } : {}) })
export function replaceTrainingExercise(cfg, id) {
  if (!index[id] || !(MOVEMENTS[cfg.pattern] || [cfg.id]).includes(id)) throw new Error('Choose an exercise from the same supported movement pattern.')
  return cfg.mode === 'cardio' ? { ...cfg, id } : { ...ex(id, cfg.pattern, cfg.sets, cfg.side ? 10 : cfg.reps), restSec: cfg.restSec }
}
const cardio = () => ({ id: '2138', pattern: 'cardio', mode: 'cardio', sets: 1, min: 15, speed: 0, prog: 'off', restSec: 60 })
const fullA = () => [ex('0739', 'knee'), ex('0577', 'push'), ex('0861', 'pull'), ex('1459', 'hinge'), ex('0276', 'core'), ex('1373', 'calves')]
const fullB = () => [ex('2368', 'knee'), ex('0493', 'push'), ex('2330', 'verticalPull'), ex('3013', 'hinge'), ex('0405', 'shoulder'), ex('0872', 'core')]
const routine = (name, items) => ({ name, emoji: 'barbell', prog: 'linear', ex: items })
const tpl = (id, name, level, location, routines, schedule, description) => ({ id, version: 1, name, nameKey: name, description, descriptionKey: description, level, location, routines, schedule, daysPerWeek: schedule.length, goals: GOALS, minutes: Math.max(...routines.map(estimateMinutes)), equipment: [...new Set(routines.flatMap(r => r.ex.flatMap(e => requirements(e.id))))] })
export function estimateMinutes(r) { return Math.ceil(5 + r.ex.reduce((n, e) => n + (e.mode === 'cardio' ? e.min : e.sets * (0.75 + (e.restSec || 90) / 60)), 0)) }
export const TRAINING_TEMPLATES = [
  tpl('foundation-2', 'Full Body Foundation', 'beginner', 'gym', [routine('Foundation A', fullA()), routine('Foundation B', fullB())], [1, 4], 'Two balanced sessions with recovery days between them. A manageable place to start.'),
  tpl('fullbody-3', 'Full Body Progress', 'beginner', 'gym', [routine('Full Body A', fullA()), routine('Full Body B', fullB()), routine('Full Body C', fullA())], [1, 3, 5], 'Our first recommendation for new gym users: practice the basics three times a week.'),
  tpl('calisthenics-3', 'Calisthenics Foundation', 'beginner', 'home', [0, 1, 2].map(i => routine('Calisthenics ' + (i + 1), [ex('0493', 'push'), ex('2300', 'pull'), ex('2368', 'knee'), ex('3013', 'hinge'), ex('0276', 'core'), ex('1373', 'calves')])), [1, 3, 5], 'Build strength with bodyweight. Requires a stable raised surface and a securely mounted low row bar; ordinary furniture is not a substitute.'),
  tpl('fitness-3', 'General Fitness', 'beginner', 'gym', [routine('Strength A', fullA()), routine('Strength B', fullB()), routine('Strength & Cardio', [ex('0739', 'knee'), ex('0577', 'push'), ex('0861', 'pull'), ex('3013', 'hinge'), ex('0276', 'core'), cardio()])], [1, 3, 6], 'Two strength sessions and a gentle conditioning day. Build activity gradually beyond these sessions.'),
  tpl('upperlower-4', 'Upper / Lower', 'intermediate', 'gym', [routine('Upper A', [ex('0025', 'push', 3), ex('0861', 'pull', 3), ex('0405', 'shoulder'), ex('2330', 'verticalPull'), ex('0313', 'biceps')]), routine('Lower A', [ex('0739', 'knee', 3), ex('1459', 'hinge', 3), ex('1373', 'calves'), ex('0276', 'core')]), routine('Upper B', [ex('0577', 'push', 3), ex('1323', 'pull', 3), ex('0426', 'shoulder'), ex('0241', 'triceps'), ex('0294', 'biceps')]), routine('Lower B', [ex('2368', 'knee', 3), ex('3013', 'hinge', 3), ex('0605', 'calves'), ex('0872', 'core')])], [1, 2, 4, 5], 'Four sessions spread the work across two upper and two lower days.'),
  tpl('ppl', 'Push / Pull / Legs', 'intermediate', 'gym', [routine('Push Day', [ex('0025', 'push', 4, 8), ex('0047', 'push', 3), ex('0426', 'shoulder', 3), ex('0334', 'lateral', 3, 12), ex('0241', 'triceps', 3, 12), ex('0251', 'push', 3)]), routine('Pull Day', [ex('2330', 'verticalPull', 4), ex('0027', 'pull', 4, 8), ex('1323', 'pull', 3), ex('0031', 'biceps', 3), ex('0313', 'biceps', 3, 12)]), routine('Leg Day', [ex('0043', 'knee', 4, 8), ex('0085', 'hinge', 3), ex('0739', 'knee', 3, 12), ex('0585', 'knee', 3, 12), ex('0586', 'hinge', 3, 12), ex('0605', 'calves', 4, 15)])], [1, 3, 5], 'The original starter split. Three days train each region once weekly; six days are for experienced users with enough recovery time.')
]
export function templatePlan(template, days = template.daysPerWeek) {
  const routines = clone(template.routines).map((r, i) => ({ ...r, id: `${template.id}-r${i}` }))
  const schedule = template.id === 'ppl' && days === 6 ? [1, 2, 3, 4, 5, 6] : template.schedule
  return { name: template.name, source: 'template', templateId: template.id, templateVersion: template.version, level: template.level, daysPerWeek: schedule.length, routines, week: Object.fromEntries(schedule.map((d, i) => [d, routines[i % routines.length].id])), explanations: [template.description], dayPlan: {} }
}
export function generateTrainingPlan(p) {
  if (!p.adult || p.healthConcern) throw new Error('Personalized training is for adults without conditions or pain requiring professional exercise guidance.')
  if (!GOALS.includes(p.goal) || !['beginner', 'intermediate'].includes(p.level)) throw new Error('Choose a goal and experience level.')
  if (!['low', 'moderate', 'high'].includes(p.activity) || !['gym', 'home', 'mixed', 'calisthenics'].includes(p.style) || !Array.isArray(p.equipment) || p.equipment.some(e => !EQUIPMENT.includes(e))) throw new Error('Choose valid activity, training style and equipment preferences.')
  if (![2, 3, 4, 6].includes(+p.days) || !(+p.minutes >= 25 && +p.minutes <= 90)) throw new Error('Choose 2, 3, 4 or 6 days and 25–90 minutes per session.')
  if (+p.days === 6 && p.level === 'beginner') throw new Error('Start with 2–4 training days. Six-day plans are reserved for experienced users.')
  const id = +p.days === 2 ? 'foundation-2' : +p.days === 4 ? 'upperlower-4' : +p.days === 6 ? 'ppl' : p.style === 'calisthenics' ? 'calisthenics-3' : p.goal === 'general fitness' || p.goal === 'healthy fat loss' ? 'fitness-3' : 'fullbody-3'
  const plan = templatePlan(TRAINING_TEMPLATES.find(t => t.id === id), +p.days)
  const allowed = new Set(p.equipment || [])
  const avoided = new Set(p.avoidIds || [])
  const avoidPatterns = new Set(p.avoidPatterns || [])
  const usable = (id, pattern) => !avoided.has(id) && !avoidPatterns.has(pattern) && requirements(id).every(x => allowed.has(x)) && !(p.lowImpact && id === '0685')
  plan.routines.forEach(r => {
    r.ex = r.ex.map(cfg => {
      const candidates = p.style === 'calisthenics' ? (MOVEMENTS[cfg.pattern] || []).filter(id => index[id].eq === 'body weight' || id === '0970') : MOVEMENTS[cfg.pattern] || []
      let id = usable(cfg.id, cfg.pattern) && (p.style !== 'calisthenics' || candidates.includes(cfg.id)) ? cfg.id : candidates.find(id => usable(id, cfg.pattern))
      if (!id) throw new Error(`No compatible ${cfg.pattern} exercise. Adjust equipment or exclusions; excluded movements will not be silently restored.`)
      if (id !== cfg.id) plan.explanations.push(`${index[cfg.id].n} → ${index[id].n}: matches your equipment and preferences.`)
      const next = cfg.mode === 'cardio' ? { ...cfg, id, min: p.activity === 'low' ? 10 : 15 } : { ...ex(id, cfg.pattern, p.level === 'beginner' || p.activity === 'low' ? 2 : 3, p.goal === 'strength' ? 8 : 10) }
      return next
    })
    while (estimateMinutes(r) > +p.minutes && r.ex.some(e => ['calves', 'biceps', 'triceps', 'shoulder', 'lateral'].includes(e.pattern))) r.ex.splice(r.ex.findLastIndex(e => ['calves', 'biceps', 'triceps', 'shoulder', 'lateral'].includes(e.pattern)), 1)
    if (estimateMinutes(r) > +p.minutes) r.ex.forEach(e => { if (e.sets > 2) e.sets = 2 })
    if (estimateMinutes(r) > +p.minutes) throw new Error(`This balanced session needs approximately ${estimateMinutes(r)} minutes. Increase your session time.`)
  })
  plan.source = 'personalized'; plan.goal = p.goal; plan.level = p.level
  plan.name = `${plan.name} · ${p.goal}`
  plan.generationProfileSnapshot = clone(p)
  plan.explanations = [...new Set([...plan.explanations, `${p.days} days, up to ${p.minutes} minutes; start with comfortable loads and controlled technique.`])]
  return plan
}
// routines/week remain the active projection used by the existing workout and reminder
// engines. Persist captures it into its named plan; inactive plans retain their own IDs.
export function migratePlans(s) {
  if (!Array.isArray(s.trainingPlans)) s.trainingPlans = []
  if (!s.trainingPlans.some(p => p.id === s.activeTrainingPlanId) && ((s.routines || []).length || Object.keys(s.week || {}).length)) {
    let id = 'legacy-plan', i = 1
    while (s.trainingPlans.some(p => p.id === id)) id = `legacy-plan-${i++}`
    s.trainingPlans.push({ id, name: 'My current plan', source: 'legacy', createdAt: 0, routines: clone(s.routines || []), week: clone(s.week || {}), dayPlan: clone(s.dayPlan || {}) })
    s.activeTrainingPlanId = id
  }
  if (s.trainingPlans.length && !s.trainingPlans.some(p => p.id === s.activeTrainingPlanId)) {
    s.activeTrainingPlanId = null
  }
  s.dietPlans ||= []; s.activeDietPlanId ||= null; s.plannerProfile ||= null
  s.schemaVersion = 2
  return s
}
export function captureActivePlan(s) {
  migratePlans(s)
  const p = s.trainingPlans.find(p => p.id === s.activeTrainingPlanId)
  if (p) { p.routines = clone(s.routines); p.week = clone(s.week); p.dayPlan = clone(s.dayPlan) }
}
export function saveTrainingPlan(s, draft, id, now = Date.now()) {
  captureActivePlan(s)
  const map = Object.fromEntries(draft.routines.map((r, i) => [r.id, `${id}-r${i}`]))
  if (s.trainingPlans.some(p => p.id === id)) throw new Error('A plan with that ID already exists.')
  const p = { ...clone(draft), id, createdAt: now, activatedAt: null, reviewedAt: null, routines: draft.routines.map(r => ({ ...clone(r), id: map[r.id] })), week: Object.fromEntries(Object.entries(draft.week).map(([d, rid]) => [d, map[rid]])), dayPlan: {} }
  s.trainingPlans.push(p)
  return p.id
}
export function activateTrainingPlan(s, id, now = Date.now()) {
  if (s.active) throw new Error('Finish or discard your current workout before switching plans.')
  captureActivePlan(s)
  const p = s.trainingPlans.find(p => p.id === id)
  if (!p) throw new Error('Plan not found.')
  s.activeTrainingPlanId = id; p.activatedAt = now
  s.routines = clone(p.routines); s.week = clone(p.week); s.dayPlan = clone(p.dayPlan || {})
}
export function validateTemplates() {
  for (const t of TRAINING_TEMPLATES) {
    if (new Set(t.schedule).size !== t.schedule.length || t.schedule.some(d => d < 0 || d > 6)) throw new Error(`Invalid schedule: ${t.id}`)
    for (const r of t.routines) for (const e of r.ex) {
      if (!index[e.id] || !(e.sets > 0) || !['linear', 'off'].includes(e.prog)) throw new Error(`Invalid exercise in ${t.id}: ${e.id}`)
    }
  }
  return true
}
