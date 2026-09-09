import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { TRAINING_TEMPLATES, templatePlan, saveTrainingPlan, activateTrainingPlan } from '../lib/training-plans.js'
import { DEFAULT_NUTRITION_PROFILE, generateNutritionPlan, saveNutritionPreferences } from '../lib/nutrition-plans.js'

let useStore, storage
beforeEach(async () => {
  vi.resetModules(); vi.useFakeTimers()
  storage = new Map()
  vi.stubGlobal('localStorage', { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, String(v)), removeItem: k => storage.delete(k) })
  vi.stubGlobal('document', { addEventListener: vi.fn(), visibilityState: 'visible' })
  vi.stubGlobal('navigator', { userAgent: 'Unit test' })
  ;({ useStore } = await import('./useStore.js'))
})
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllGlobals() })

describe('planner persistence through the real store', () => {
  it('persists offline guest plans and captures edits to the active projection', () => {
    useStore.getState().update(s => {
      saveTrainingPlan(s, templatePlan(TRAINING_TEMPLATES[0]), 'p1')
      activateTrainingPlan(s, 'p1')
    })
    useStore.getState().update(s => { s.routines[0].name = 'Edited' })
    const saved = JSON.parse(storage.get('gym_state_v1'))
    expect(saved.trainingPlans[0].routines[0].name).toBe('Edited')
    expect(saved.activeTrainingPlanId).toBe('p1')
  })
  it('sends nutrition snapshots through the existing debounced PUT /api/data', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    vi.stubGlobal('fetch', fetcher)
    useStore.getState().setUser({ id: 'fake-local-test-user' })
    useStore.getState().update(s => {
      const p = { ...DEFAULT_NUTRITION_PROFILE, adult: true, exclusionsConfirmed: true }
      saveNutritionPreferences(s, p)
      s.dietPlans.push({ ...generateNutritionPlan(p), id: 'd1' })
    })
    expect(fetcher).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1501)
    expect(fetcher).toHaveBeenCalledTimes(1)
    const [url, options] = fetcher.mock.calls[0]
    expect(url).toBe('/api/data'); expect(options.method).toBe('PUT')
    const sent = JSON.parse(options.body).state
    expect(sent.dietPlans[0].days).toHaveLength(7)
    expect(sent.plannerProfile.nutrition.diet).toBe('vegetarian')
    expect(sent.schemaVersion).toBe(2)
  })
  it('migrates legacy backup replacements without losing workout history', () => {
    const old = { ...useStore.getState().S, routines: [{ id: 'old-id', name: 'Old', ex: [] }], week: { 1: 'old-id' }, workouts: [{ id: 'historic' }] }
    delete old.trainingPlans; delete old.activeTrainingPlanId
    useStore.getState().replaceState(old)
    const saved = useStore.getState().S
    expect(saved.trainingPlans[0].routines[0].id).toBe('old-id')
    expect(saved.workouts).toEqual(old.workouts)
  })
})
