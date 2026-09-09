import { describe, it, expect } from 'vitest'
import { FOODS, FOOD_INDEX as F } from './foods-data.js'
import { MEALS, MEAL_INDEX } from './meals-data.js'
import { DEFAULT_NUTRITION_PROFILE, DIETS, ALLERGENS, INTOLERANCES, CULTURAL, foodAllowed, mealAllowed, eligibleMeals, generateNutritionPlan, energyTarget, dayNutrients, entryNutrients, groceryList, swapMeal, checkNutritionPlan, activateNutritionPlan, saveNutritionPreferences, validateNutritionCatalog } from './nutrition-plans.js'

const p = { ...DEFAULT_NUTRITION_PROFILE, adult: true, exclusionsConfirmed: true }
const sized = { ...p, targets: true, age: 30, height: 170, weight: 65, sex: 'female', activity: 'low' }
describe('nutrition catalog integrity', () => {
  it('validates every source, ingredient and recipe', () => {
    expect(validateNutritionCatalog()).toBe(true)
    expect(FOODS.length).toBeGreaterThanOrEqual(80)
    expect(MEALS.filter(m => m.slot !== 'snack')).toHaveLength(40)
    expect(MEALS.filter(m => m.slot === 'snack')).toHaveLength(12)
  })
  it('keeps raw and cooked measurements distinct', () => {
    expect(F['rice-raw'].kcal).toBeGreaterThan(F.rice.kcal * 2)
    expect(F.rice.source.description).toContain('cooked')
    expect(MEAL_INDEX['rice-dal'].ingredients.find(i => i.foodId === 'rice').grams).toBe(150)
  })
  it.each(DIETS)('only includes eligible foods in %s menus and swaps', diet => {
    const profile = { ...p, diet }, plan = generateNutritionPlan(profile)
    expect(plan).toEqual(generateNutritionPlan(profile))
    expect(plan.days).toHaveLength(7)
    for (const day of plan.days) for (const e of day.entries) expect(mealAllowed(e.recipe, profile)).toBe(true)
    for (const slot of ['breakfast', 'main', 'snack']) for (const meal of eligibleMeals(profile, slot)) expect(mealAllowed(meal, profile)).toBe(true)
  })
  it('uses the non-vegetarian/egg catalog, not only the first plant recipes', () => {
    for (const diet of ['eggetarian', 'non-veg']) {
      const plan = generateNutritionPlan({ ...p, diet, budget: 'standard' })
      expect(plan.days.some(d => d.entries.some(e => e.recipe.ingredients.some(i => i.food.diet === diet)))).toBe(true)
    }
  })
})
describe('hard ingredient constraints', () => {
  it.each(ALLERGENS.filter(a => a !== 'other / uncertain'))('enforces the %s exclusion in generation and alternatives', allergen => {
    const profile = { ...p, diet: 'non-veg', allergens: [allergen] }
    const plan = generateNutritionPlan(profile)
    for (const d of plan.days) for (const e of d.entries) for (const i of e.recipe.ingredients) expect(i.food.allergens).not.toContain(allergen)
    for (const slot of ['breakfast', 'main', 'snack']) for (const m of eligibleMeals(profile, slot)) expect(m.ingredients.every(i => !F[i.foodId].allergens.includes(allergen))).toBe(true)
  })
  it.each(INTOLERANCES.filter(a => a !== 'other / uncertain'))('enforces %s intolerance', intolerance => {
    const profile = { ...p, intolerances: [intolerance] }
    for (const d of generateNutritionPlan(profile).days) for (const e of d.entries) for (const i of e.recipe.ingredients) expect(foodAllowed(i.food, profile)).toBe(true)
    expect(foodAllowed(intolerance === 'gluten' ? F.oats : F.ghee, profile)).toBe(false)
  })
  it.each(CULTURAL)('enforces %s', exclusion => {
    const profile = { ...p, cultural: [exclusion] }
    expect(foodAllowed(F.garlic, profile)).toBe(false)
    for (const d of generateNutritionPlan(profile).days) for (const e of d.entries) expect(mealAllowed(e.recipe, profile)).toBe(true)
  })
  it('enforces combinations and explicit disliked ingredients', () => {
    const profile = { ...p, diet: 'vegan', allergens: ['peanut', 'tree nuts', 'soy'], intolerances: ['gluten'], cultural: ['no onion / garlic'], excludedFoods: ['banana'] }
    for (const d of generateNutritionPlan(profile).days) for (const e of d.entries) for (const i of e.recipe.ingredients) expect(foodAllowed(i.food, profile)).toBe(true)
  })
  it.each([
    { adult: false }, { medical: true }, { exclusionsConfirmed: false },
    { allergens: ['other / uncertain'] }, { allergens: ['unknown'] },
    { intolerances: ['other / uncertain'] }, { excludedFoods: ['not-in-catalog'] },
    { excludedFoods: FOODS.map(f => f.id) }, { diet: 'invented' },
  ])('fails closed rather than relaxing restrictions: %j', changes => {
    expect(() => generateNutritionPlan({ ...p, ...changes })).toThrow()
  })
})
describe('portions, energy estimates and swaps', () => {
  it('does not require measurements for a portion-based menu', () => {
    expect(generateNutritionPlan(p).target).toBeNull()
    expect(energyTarget(sized)).toMatchObject({ midpoint: 1900, low: 1710, high: 2090 })
  })
  it.each(DIETS)('matches daily estimated ranges for %s', diet => {
    const plan = generateNutritionPlan({ ...sized, diet, meals: '5' }, { 1: 'a', 3: 'b' })
    for (const d of plan.days) {
      expect(dayNutrients(d).kcal).toBeGreaterThanOrEqual(plan.target.low)
      expect(dayNutrients(d).kcal).toBeLessThanOrEqual(plan.target.high)
      expect(d.entries.every(e => e.scale >= .75 && e.scale <= 1.5)).toBe(true)
    }
    expect(plan.days.filter(d => d.training).map(d => d.weekday)).toEqual([1, 3])
  })
  it.each([{ age: 17 }, { height: 0 }, { sex: '' }, { weight: -10 }, { age: 80, height: 120, weight: 40, activity: 'low' }])('rejects invalid or unsupported estimates %j', changes => {
    expect(() => energyTarget({ ...sized, ...changes })).toThrow()
  })
  it('keeps profiles and catalog immutable and recalculates after a valid swap', () => {
    const oldProfile = structuredClone(p), plan = generateNutritionPlan(p), oldPlan = structuredClone(plan)
    const next = swapMeal(plan, 0, 0, 'chickpea-breakfast', p)
    expect(plan).toEqual(oldPlan); expect(p).toEqual(oldProfile)
    expect(next.days[0].entries[0].mealId).toBe('chickpea-breakfast')
    expect(dayNutrients(next.days[0]).kcal).not.toBe(dayNutrients(plan.days[0]).kcal)
    const expected = next.days[0].entries.reduce((n, e) => n + entryNutrients(e).protein, 0)
    expect(dayNutrients(next.days[0]).protein).toBeCloseTo(expected)
  })
  it('forbids incompatible swaps without altering the saved plan', () => {
    const profile = { ...p, allergens: ['milk'] }, plan = generateNutritionPlan(profile), original = structuredClone(plan)
    expect(() => swapMeal(plan, 0, 0, 'curd-oats', profile)).toThrow(/restrictions/)
    expect(plan).toEqual(original)
    expect(() => swapMeal(plan, 0, 0, 'rice-dal', profile)).toThrow()
  })
  it('aggregates groceries using actual selected portions and preserves ingredient state', () => {
    const plan = generateNutritionPlan(p), list = groceryList(plan)
    const rice = plan.days.flatMap(d => d.entries).reduce((total, e) => total + e.recipe.ingredients.filter(i => i.foodId === 'rice').reduce((n, i) => n + i.grams * e.scale, 0), 0)
    expect(list.find(r => r.foodId === 'rice').grams).toBe(Math.round(rice))
    expect(list.find(r => r.foodId === 'rice').name).toContain('cooked')
  })
})
describe('saved nutrition plan safety and round trips', () => {
  it('checks current exclusions on activation and deactivates incompatible menus', () => {
    const plan = { ...generateNutritionPlan(p), id: 'd1' }
    const s = { dietPlans: [plan] }; saveNutritionPreferences(s, p); activateNutritionPlan(s, 'd1', 100)
    expect(s.activeDietPlanId).toBe('d1')
    saveNutritionPreferences(s, { ...p, allergens: ['peanut', 'milk'] })
    expect(s.activeDietPlanId).toBeNull()
    expect(() => activateNutritionPlan(s, 'd1')).toThrow(/exclusions/)
    expect(s.dietPlans).toHaveLength(1)
  })
  it('retains immutable ingredient/source snapshots through JSON sync', () => {
    const plan = generateNutritionPlan(p), saved = JSON.parse(JSON.stringify(plan))
    expect(saved).toEqual(plan)
    expect(saved.days[0].entries[0].recipe.ingredients[0].food.source.fdcId).toBeTruthy()
    expect(checkNutritionPlan(saved, p)).toBe('')
  })
  it('rejects corrupt saved menus and unknown ingredient metadata', () => {
    const plan = generateNutritionPlan(p)
    plan.days[0].entries = []
    expect(checkNutritionPlan(plan, p)).toMatch(/incomplete/)
    expect(foodAllowed({ id: 'mystery' }, p)).toBe(false)
  })
})
