import { FOODS, FOOD_INDEX, FOOD_DATA_VERSION } from './foods-data.js'
import { MEALS, MEAL_INDEX } from './meals-data.js'

const clone = x => JSON.parse(JSON.stringify(x))
export const DIETS = ['vegan', 'vegetarian', 'eggetarian', 'non-veg']
export const ALLERGENS = ['milk', 'egg', 'fish', 'shellfish', 'peanut', 'tree nuts', 'soy', 'wheat', 'sesame', 'other / uncertain']
export const INTOLERANCES = ['lactose', 'gluten', 'other / uncertain']
export const CULTURAL = ['no onion / garlic', 'no root vegetables']
export const DEFAULT_NUTRITION_PROFILE = {
  diet: 'vegetarian', allergens: [], intolerances: [], cultural: [], excludedFoods: [],
  meals: '4', minutes: '30', budget: 'low', portion: 'regular', goal: 'general fitness',
  adult: false, medical: false, exclusionsConfirmed: false, targets: false,
  age: '', height: '', weight: '', sex: '', activity: 'low',
}
const roots = ['carrot', 'onion', 'garlic', 'ginger', 'potato', 'sweet-potato', 'beet', 'radish', 'turnip']
export function validateNutritionProfile(p) {
  if (!p.adult || p.medical) throw new Error('This planner is only for healthy adults 18+. Pregnancy, breastfeeding, eating-disorder concerns or a condition needing a therapeutic diet require qualified professional guidance; automatic planning is unavailable.')
  if (!p.exclusionsConfirmed) throw new Error('Please confirm that you have reviewed your food exclusions.')
  if (!DIETS.includes(p.diet) || ![3, 4, 5].includes(+p.meals) || ![15, 30, 45].includes(+p.minutes) || !['low', 'standard'].includes(p.budget) || !['smaller', 'regular', 'larger'].includes(p.portion)) throw new Error('Choose valid meal, portion, budget and preparation preferences.')
  for (const [key, allowed] of [['allergens', ALLERGENS], ['intolerances', INTOLERANCES], ['cultural', CULTURAL], ['excludedFoods', FOODS.map(f => f.id)]]) {
    if (!Array.isArray(p[key]) || p[key].some(x => !allowed.includes(x) || x === 'other / uncertain')) throw new Error('An exclusion is unknown or uncertain. Do not use this planner until the ingredient restriction is supported and confirmed.')
  }
  if (!['general fitness', 'strength', 'muscle gain', 'healthy fat loss'].includes(p.goal)) throw new Error('Choose a supported goal.')
  return true
}
export function foodAllowed(f, p) {
  if (!f || !DIETS.includes(f.diet) || !Array.isArray(f.allergens)) return false
  if (DIETS.indexOf(f.diet) > DIETS.indexOf(p.diet)) return false
  const blocked = new Set(p.allergens || [])
  if (p.intolerances?.includes('lactose')) blocked.add('milk')
  if (p.intolerances?.includes('gluten')) ['wheat', 'barley', 'oats'].forEach(x => blocked.add(x))
  // Even nominally gluten-free oats can be cross-contaminated; no certified products
  // are represented by the generic USDA record, so exclude them conservatively.
  if (f.allergens.some(x => blocked.has(x)) || p.excludedFoods?.includes(f.id)) return false
  if (p.cultural?.includes('no onion / garlic') && ['onion', 'garlic'].includes(f.id)) return false
  if (p.cultural?.includes('no root vegetables') && roots.includes(f.id)) return false
  return true
}
export function mealAllowed(m, p) {
  return !!m?.ingredients?.length && m.ingredients.every(i => foodAllowed(FOOD_INDEX[i.foodId], p) && (!i.food || foodAllowed(i.food, p)))
}
export function eligibleMeals(p, slot) {
  return MEALS.filter(m => m.slot === slot && m.minutes <= +p.minutes && (p.budget === 'standard' || m.budget === 'low') && mealAllowed(m, p))
}
export function energyTarget(p) {
  if (!p.targets) return null
  const age = +p.age, height = +p.height, weight = +p.weight
  if (!(age >= 18 && age <= 80 && height >= 120 && height <= 220 && weight >= 40 && weight <= 200) || !['female', 'male'].includes(p.sex) || !['low', 'moderate', 'high'].includes(p.activity)) throw new Error('For estimated energy targets, enter age 18–80, height 120–220 cm, weight 40–200 kg, physiological sex and activity. Otherwise switch off energy targets for a portion-based menu.')
  const resting = 10 * weight + 6.25 * height - 5 * age + (p.sex === 'male' ? 5 : -161)
  const estimated = resting * ({ low: 1.35, moderate: 1.55, high: 1.75 }[p.activity])
  const midpoint = Math.round((estimated + (p.goal === 'healthy fat loss' ? -200 : p.goal === 'muscle gain' ? 150 : 0)) / 50) * 50
  // Product scope, not a universal safe-intake threshold. Never clamp an extreme
  // estimate into a deceptively precise prescription.
  if (midpoint < 1600 || midpoint > 3200) throw new Error('This estimated energy need is outside our supported range. Use a non-targeted portion menu or seek individual nutrition guidance.')
  return { low: Math.round(midpoint * .9), high: Math.round(midpoint * 1.1), midpoint, method: 'Mifflin–St Jeor with an approximate activity multiplier and a modest goal adjustment; not a measured energy requirement.' }
}
function entry(meal, scale = 1) {
  return { mealId: meal.id, scale, recipe: { ...clone(meal), ingredients: meal.ingredients.map(i => ({ ...i, food: clone(FOOD_INDEX[i.foodId]) })) } }
}
export function entryNutrients(e) {
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  for (const i of e.recipe.ingredients) for (const k of Object.keys(total)) total[k] += i.food[k] * i.grams * e.scale / 100
  return total
}
export function dayNutrients(day) {
  return day.entries.reduce((total, e) => {
    const n = entryNutrients(e)
    for (const k of Object.keys(n)) total[k] = (total[k] || 0) + n[k]
    return total
  }, {})
}
export const estimateRange = (n, step = 1) => `${Math.round(n * .9 / step) * step}–${Math.round(n * 1.1 / step) * step}`
const scales = [.75, 1, 1.25, 1.5]
function fitPortions(day, target) {
  if (!target) return true
  // Enumerate at most 4^5 = 1024 combinations. Stable tie-breaking makes the
  // offline generator reproducible, without a probabilistic model or network.
  let best = null, score = Infinity
  function search(i) {
    if (i === day.entries.length) {
      const kcal = dayNutrients(day).kcal
      const delta = Math.abs(kcal - target.midpoint)
      if (delta < score) { score = delta; best = day.entries.map(e => e.scale) }
      return
    }
    for (const scale of scales) { day.entries[i].scale = scale; search(i + 1) }
  }
  search(0)
  day.entries.forEach((e, i) => { e.scale = best[i] })
  const n = dayNutrients(day).kcal
  return n >= target.low && n <= target.high
}
export function generateNutritionPlan(p, week = {}) {
  validateNutritionProfile(p)
  const target = energyTarget(p)
  const pools = Object.fromEntries(['breakfast', 'main', 'snack'].map(slot => [slot, eligibleMeals(p, slot)]))
  for (const slot of ['breakfast', 'main', ...(+p.meals > 3 ? ['snack'] : [])]) if (!pools[slot].length) throw new Error(`No ${slot} matches every restriction. Your exclusions were not relaxed. Try a longer preparation time or report a catalog gap.`)
  const portion = { smaller: .75, regular: 1, larger: 1.25 }[p.portion]
  const days = [1, 2, 3, 4, 5, 6, 0].map((weekday, d) => {
    const slots = ['breakfast', 'main', 'main', ...Array(+p.meals - 3).fill('snack')]
    const entries = slots.map((slot, i) => {
      // Spread selection across the whole eligible catalog, not just its first
      // fourteen mains (which would make non-vegetarian menus always vegetarian).
      const index = slot === 'main' ? Math.floor((d * 2 + (i === 2 ? 1 : 0)) * (pools[slot].length - 1) / 13) : slot === 'breakfast' ? Math.floor(d * (pools[slot].length - 1) / 6) : (d + i - 3) % pools[slot].length
      return entry(pools[slot][index], portion)
    })
    const day = { weekday, training: !!week[weekday], entries }
    // Workout-day alternatives change the composition, not an automatic calorie
    // bonus. Rest days remain fully nourished, with the same target range.
    if (day.training && +p.meals > 3) {
      const choices = pools.snack.filter(m => m.ingredients.some(i => ['banana', 'corn', 'dates'].includes(i.foodId)))
      if (choices.length) day.entries[3] = entry(choices[d % choices.length], portion)
    }
    if (!fitPortions(day, target)) throw new Error(`The available meals cannot meet the estimated energy range on day ${d + 1} with ordinary portions. Try 4–5 meals, a longer preparation time, or a portion-based menu. Food exclusions remain enforced.`)
    return day
  })
  return { name: `${p.diet} · ${p.targets ? p.goal : 'portion-based'} week`, version: 1, rulesVersion: 1, foodDataVersion: FOOD_DATA_VERSION, source: p.targets ? 'personalized' : 'template', profileSnapshot: clone(p), target, days, scheduleSnapshot: clone(week) }
}
export function checkNutritionPlan(plan, p) {
  try { validateNutritionProfile(p) } catch (e) { return e.message }
  if (!Array.isArray(plan?.days) || plan.days.length !== 7 || new Set(plan.days.map(d => d.weekday)).size !== 7) return 'The saved menu is incomplete. Generate a new preview.'
  for (const day of plan.days) {
    if (!Number.isInteger(day.weekday) || day.weekday < 0 || day.weekday > 6 || !Array.isArray(day.entries) || day.entries.length < 3 || day.entries.length > 5) return 'The saved menu is incomplete. Generate a new preview.'
    for (const e of day.entries) {
      if (!scales.includes(e.scale) || !mealAllowed(e.recipe, p) || e.recipe.ingredients.some(i => !(i.grams > 0) || !i.food || ['kcal', 'protein', 'carbs', 'fat', 'fiber'].some(k => !Number.isFinite(i.food[k]) || i.food[k] < 0))) return 'This menu no longer matches your exclusions. Generate a new preview before activating it.'
    }
  }
  return ''
}
export function swapMeal(plan, dayIndex, entryIndex, mealId, p) {
  validateNutritionProfile(p)
  const next = clone(plan), old = next.days[dayIndex]?.entries[entryIndex], meal = MEAL_INDEX[mealId]
  if (!old || !meal || !eligibleMeals(p, old.recipe.slot).some(m => m.id === meal.id)) throw new Error('That meal does not match your restrictions or preparation preferences.')
  next.days[dayIndex].entries[entryIndex] = entry(meal, old.scale)
  if (!fitPortions(next.days[dayIndex], next.target)) throw new Error('This swap cannot meet your energy range with ordinary portions. Choose another meal; your original menu is unchanged.')
  const issue = checkNutritionPlan(next, p)
  if (issue) throw new Error(issue)
  return next
}
export function groceryList(plan) {
  const quantities = new Map()
  for (const day of plan.days) for (const e of day.entries) for (const i of e.recipe.ingredients) {
    const row = quantities.get(i.foodId) || { foodId: i.foodId, name: i.food.name, group: i.food.group, grams: 0 }
    row.grams += i.grams * e.scale
    quantities.set(i.foodId, row)
  }
  return [...quantities.values()].map(row => ({ ...row, grams: Math.round(row.grams) })).sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name))
}
export function saveNutritionPreferences(s, p) {
  s.plannerProfile = { ...s.plannerProfile, nutrition: clone(p) }
  const active = s.dietPlans?.find(plan => plan.id === s.activeDietPlanId)
  if (active && checkNutritionPlan(active, p)) s.activeDietPlanId = null
}
export function activateNutritionPlan(s, id, now = Date.now()) {
  const plan = s.dietPlans?.find(p => p.id === id)
  if (!plan) throw new Error('Meal plan not found.')
  const issue = checkNutritionPlan(plan, s.plannerProfile?.nutrition || {})
  if (issue) throw new Error(issue)
  s.activeDietPlanId = id; plan.activatedAt = now
}
export function validateNutritionCatalog() {
  if (FOODS.length < 80 || MEALS.filter(m => m.slot !== 'snack').length < 40 || MEALS.filter(m => m.slot === 'snack').length < 12) throw new Error('The starter catalog is incomplete.')
  if (new Set(FOODS.map(f => f.id)).size !== FOODS.length || new Set(MEALS.map(m => m.id)).size !== MEALS.length) throw new Error('Duplicate catalog IDs.')
  for (const f of FOODS) if (!f.source?.fdcId || !DIETS.includes(f.diet) || ['kcal', 'protein', 'carbs', 'fat', 'fiber'].some(k => !Number.isFinite(f[k]) || f[k] < 0)) throw new Error(`Invalid food: ${f.id}`)
  for (const m of MEALS) if (!m.method || !m.ingredients.length || m.ingredients.some(i => !FOOD_INDEX[i.foodId] || !(i.grams > 0))) throw new Error(`Invalid recipe: ${m.id}`)
  return true
}
