// Download the public-domain SR Legacy April 2018 JSON from the official USDA
// download page, unzip it, then pass its path. No network, credentials or writes.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { FOODS } from '../src/lib/foods-data.js'
if (!process.argv[2]) throw new Error('Usage: node scripts/verify-usda.mjs /path/to/FoodData_Central_sr_legacy_food_json_2018-04.json')
const records = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).SRLegacyFoods
const fields = { kcal: 1008, protein: 1003, carbs: 1005, fat: 1004, fiber: 1079 }
for (const food of FOODS) {
  const record = records.find(r => r.fdcId === food.source.fdcId)
  assert.ok(record, food.id)
  assert.equal(food.source.description, record.description, food.id)
  for (const [key, id] of Object.entries(fields)) assert.equal(food[key], record.foodNutrients.find(n => n.nutrient.id === id)?.amount || 0, `${food.id}: ${key}`)
}
console.log(`Verified ${FOODS.length} food records against the official source file.`)
