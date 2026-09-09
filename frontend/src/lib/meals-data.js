import { FOOD_INDEX as F } from './foods-data.js'

export const MEAL_VERSION = 1
// Authored single-serving combinations, not nutrient measurements of named dishes.
// Quantities always refer to the ingredient's named state. Water is not counted.
const recipe = (id, name, slot, items, method, minutes = 15, budget = 'low') => ({
  id, name, nameKey: name, version: MEAL_VERSION, slot, minutes, budget,
  ingredients: items.map(([foodId, grams]) => ({ foodId, grams })), method,
  source: 'OpenGym recipe; USDA ingredient estimates',
})
const bowl = (id, name, grain, pulse, veg, extra = []) => recipe(id, name, 'main', [[grain, 150], [pulse, 200], [veg, 150], ['sunflower-oil', 5], ['cumin', 1], ['turmeric', 1], ...extra], 'Use the listed cooked grain and fully cooked pulses. Cook the vegetables in the measured oil with spices and a little water until tender; combine and heat through. This time assumes batch-cooked pulses and grains.')
const roti = (id, name, pulse, veg, flour = 'atta', extra = []) => recipe(id, name, 'main', [[flour, 70], [pulse, 200], [veg, 150], ['sunflower-oil', 5], ['cumin', 1], ...extra], 'Make two small flatbreads from the weighed flour and water; cook fully on a hot pan. Heat the fully cooked pulses with vegetables and measured oil until the vegetables are tender. Gluten-free flatbreads may need to be patted out rather than rolled.', 30)
const snack = (id, name, items, method = 'Weigh the edible portions and serve. Use ready-to-eat ingredients; wash fresh produce.') => recipe(id, name, 'snack', items, method, 5)
export const MEALS = [
  recipe('oat-banana', 'Banana peanut oats', 'breakfast', [['oats', 60], ['banana', 100], ['peanuts', 20], ['chia', 5]], 'Cook oats in water until soft. Top with sliced banana, crushed roasted peanuts and chia.'),
  recipe('apple-oats', 'Apple cinnamon oats', 'breakfast', [['oats', 60], ['apple', 150], ['almonds', 20], ['cinnamon', 1]], 'Cook oats and chopped apple in water until soft; add cinnamon and almonds.'),
  recipe('curd-oats', 'Curd and banana oat bowl', 'breakfast', [['oats', 50], ['curd', 200], ['banana', 100], ['pumpkin-seeds', 15]], 'Cook oats in water, cool promptly, then mix with yogurt. Add banana and seeds.'),
  recipe('millet-peas', 'Millet pea breakfast bowl', 'breakfast', [['millet', 200], ['peas', 120], ['carrot', 70], ['peanuts', 20], ['sunflower-oil', 5], ['cumin', 1]], 'Cook carrots in the measured oil with a splash of water. Add cooked millet, cooked peas and cumin, heat through and top with roasted peanuts.'),
  recipe('semolina-upma', 'Vegetable semolina upma', 'breakfast', [['semolina', 70], ['peas', 100], ['carrot', 70], ['peanuts', 15], ['sunflower-oil', 5]], 'Toast semolina in the measured oil. Add water gradually with finely chopped carrot and cooked peas; simmer until the semolina and carrot are fully cooked. Add peanuts.', 25),
  recipe('mung-breakfast', 'Mung and sweet-corn chaat', 'breakfast', [['mung', 220], ['corn', 100], ['tomato', 80], ['cucumber', 80], ['peanuts', 15], ['lemon', 15]], 'Combine fully cooked mung and corn with washed chopped vegetables, lemon and roasted peanuts. No raw sprouts are used.'),
  recipe('chickpea-breakfast', 'Chickpea breakfast chaat', 'breakfast', [['chickpeas', 220], ['tomato', 80], ['cucumber', 80], ['lemon', 15], ['pumpkin-seeds', 15]], 'Combine fully cooked chickpeas with washed chopped vegetables, lemon and seeds.'),
  recipe('tofu-breakfast', 'Tofu bhurji with flatbread', 'breakfast', [['tofu', 150], ['atta', 60], ['tomato', 100], ['pepper', 80], ['sunflower-oil', 5], ['turmeric', 1]], 'Make and fully cook two small flatbreads from flour and water. Cook vegetables and crumbled tofu in the measured oil with turmeric; heat through.', 30),
  recipe('egg-breakfast', 'Egg and vegetable flatbread plate', 'breakfast', [['egg', 100], ['atta', 60], ['tomato', 100], ['spinach', 80], ['sunflower-oil', 5]], 'Make and cook two small flatbreads. Cook spinach and tomato in measured oil. Serve with peeled hard-boiled eggs.', 25),
  recipe('quinoa-fruit', 'Quinoa banana seed bowl', 'breakfast', [['quinoa', 220], ['banana', 100], ['pumpkin-seeds', 25], ['cinnamon', 1]], 'Warm fully cooked quinoa, add banana, seeds and cinnamon.'),
  recipe('jowar-lentil', 'Jowar flatbread and dal breakfast', 'breakfast', [['jowar-flour', 60], ['lentils', 200], ['tomato', 80], ['sunflower-oil', 5]], 'Pat flour and water into small flatbreads and cook fully. Heat cooked lentils with tomato and measured oil until tomato is soft.', 30),
  recipe('rice-mung-breakfast', 'Rice and mung breakfast bowl', 'breakfast', [['rice', 150], ['mung', 200], ['peas', 80], ['sunflower-oil', 5], ['cumin', 1]], 'Heat fully cooked rice, mung and peas with measured oil, cumin and water until steaming. This is a quick bowl, not a dry-weight khichdi recipe.'),
  bowl('rice-dal', 'Rice, dal and spinach', 'rice', 'lentils', 'spinach'),
  bowl('brown-rajma', 'Brown rice and rajma bowl', 'brown-rice', 'kidney', 'tomato'),
  bowl('rice-chana', 'Chana rice and cauliflower', 'rice', 'chickpeas', 'cauliflower'),
  bowl('millet-mung', 'Millet, mung and carrots', 'millet', 'mung', 'carrot'),
  bowl('quinoa-dal', 'Quinoa dal and broccoli', 'quinoa', 'lentils', 'broccoli'),
  bowl('rice-toor', 'Toor dal, rice and okra', 'rice', 'toor', 'okra'),
  bowl('brown-mung', 'Brown rice, mung and pumpkin', 'brown-rice', 'mung', 'pumpkin'),
  bowl('millet-chana', 'Millet chana and cabbage', 'millet', 'chickpeas', 'cabbage'),
  bowl('rice-peas', 'Split-pea rice bowl', 'rice', 'split-peas', 'pepper'),
  bowl('quinoa-rajma', 'Quinoa rajma and cauliflower', 'quinoa', 'kidney', 'cauliflower'),
  bowl('rice-edamame', 'Soybean rice bowl', 'rice', 'edamame', 'broccoli'),
  bowl('barley-dal', 'Barley dal and carrot bowl', 'barley', 'lentils', 'carrot'),
  roti('roti-dal', 'Roti, dal and spinach', 'lentils', 'spinach'),
  roti('roti-rajma', 'Roti, rajma and tomato', 'kidney', 'tomato'),
  roti('roti-chana', 'Roti, chana and cauliflower', 'chickpeas', 'cauliflower'),
  roti('roti-mung', 'Roti, mung and cabbage', 'mung', 'cabbage'),
  roti('jowar-toor', 'Jowar roti, toor and okra', 'toor', 'okra', 'jowar-flour'),
  roti('millet-lentil', 'Millet roti, dal and pumpkin', 'lentils', 'pumpkin', 'millet-flour'),
  roti('jowar-chana', 'Jowar roti, chana and pepper', 'chickpeas', 'pepper', 'jowar-flour'),
  bowl('tofu-rice', 'Tofu rice and spinach', 'rice', 'tofu', 'spinach'),
  bowl('tofu-millet', 'Tofu millet and pepper bowl', 'millet', 'tofu', 'pepper'),
  recipe('curd-rice', 'Curd rice with chickpeas', 'main', [['rice', 180], ['curd', 200], ['chickpeas', 130], ['cucumber', 100], ['cumin', 1]], 'Cool cooked rice promptly, mix with yogurt and cucumber, and serve with fully cooked chickpeas. Keep chilled until serving.'),
  recipe('egg-rice', 'Egg, pea and rice plate', 'main', [['rice', 180], ['egg', 100], ['peas', 100], ['tomato', 100], ['sunflower-oil', 5]], 'Cook tomato in the measured oil, add cooked rice and peas and heat through. Serve with peeled hard-boiled eggs.'),
  recipe('egg-roti', 'Egg, dal and roti plate', 'main', [['atta', 60], ['egg', 100], ['lentils', 100], ['tomato', 100], ['sunflower-oil', 5]], 'Make and cook two small flatbreads. Heat cooked dal with tomato and oil, and serve with peeled hard-boiled eggs.', 30),
  recipe('chicken-rice', 'Chicken, rice and vegetable plate', 'main', [['rice', 180], ['chicken', 130], ['carrot', 100], ['peas', 100], ['sunflower-oil', 5]], 'Use thoroughly cooked chicken, weighed after cooking. Cook carrot in measured oil, add cooked peas and serve with hot cooked rice. Reheat leftovers thoroughly.'),
  recipe('chicken-roti', 'Chicken and roti plate', 'main', [['atta', 70], ['chicken', 130], ['spinach', 100], ['tomato', 100], ['sunflower-oil', 5]], 'Make and fully cook flatbreads. Cook spinach and tomato with measured oil and serve with thoroughly cooked chicken, weighed after cooking.', 30, 'standard'),
  recipe('fish-rice', 'Fish, rice and green beans', 'main', [['rice', 180], ['tilapia', 150], ['green-beans', 150], ['sunflower-oil', 5], ['lemon', 15]], 'Use thoroughly cooked fish, weighed after cooking. Heat cooked rice and beans; dress with measured oil and lemon. Check carefully for bones.', 15, 'standard'),
  recipe('sardine-rice', 'Sardine rice and tomato plate', 'main', [['rice', 180], ['sardines', 100], ['tomato', 100], ['cucumber', 100], ['chickpeas', 80]], 'Use drained ready-to-eat canned sardines. Serve with cooked rice, fully cooked chickpeas and washed chopped vegetables.', 10, 'standard'),
  snack('banana-peanuts', 'Banana and roasted peanuts', [['banana', 100], ['peanuts', 20]]),
  snack('apple-almonds', 'Apple and almonds', [['apple', 150], ['almonds', 20]]),
  snack('guava-seeds', 'Guava and pumpkin seeds', [['guava', 150], ['pumpkin-seeds', 20]]),
  snack('papaya-curd', 'Papaya and curd', [['papaya', 150], ['curd', 200]]),
  snack('orange-chickpeas', 'Orange and chickpeas', [['orange', 150], ['chickpeas', 100]]),
  snack('pear-walnuts', 'Pear and walnuts', [['pear', 150], ['walnuts', 20]]),
  snack('corn-mung', 'Corn and mung cup', [['corn', 100], ['mung', 120], ['lemon', 10]]),
  snack('egg-fruit', 'Boiled egg and banana', [['egg', 100], ['banana', 100]]),
  snack('milk-banana', 'Milk and banana', [['milk', 250], ['banana', 100]]),
  snack('tofu-cucumber', 'Tofu cucumber cup', [['tofu', 100], ['cucumber', 100], ['lemon', 10]], 'Heat tofu thoroughly, cool if preferred, and combine with washed cucumber and lemon.'),
  snack('dates-seeds', 'Dates and sunflower seeds', [['dates', 40], ['sunflower-seeds', 20]]),
  snack('chickpea-cucumber', 'Chickpea cucumber cup', [['chickpeas', 120], ['cucumber', 100], ['lemon', 10]]),
]
export const MEAL_INDEX = Object.fromEntries(MEALS.map(m => [m.id, m]))
export function nutrients(meal, scale = 1) {
  const n = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  for (const i of meal.ingredients) for (const k of Object.keys(n)) n[k] += F[i.foodId][k] * i.grams * scale / 100
  return Object.fromEntries(Object.entries(n).map(([k, v]) => [k, Math.round(v * 10) / 10]))
}
