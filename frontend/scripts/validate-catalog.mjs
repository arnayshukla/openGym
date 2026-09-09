import { validateTemplates, TRAINING_TEMPLATES } from '../src/lib/training-plans.js'
import { validateNutritionCatalog } from '../src/lib/nutrition-plans.js'
import { FOODS } from '../src/lib/foods-data.js'
import { MEALS } from '../src/lib/meals-data.js'
validateTemplates()
validateNutritionCatalog()
console.log(`Catalog valid: ${TRAINING_TEMPLATES.length} workout families, ${FOODS.length} foods, ${MEALS.filter(m => m.slot !== 'snack').length} meals, ${MEALS.filter(m => m.slot === 'snack').length} snacks.`)
