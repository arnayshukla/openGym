// USDA FoodData Central SR Legacy, April 2018. Public domain / CC0.
// Values are per 100 g edible portion in the state named by each record (raw/cooked).
// Indian names are labels, not claims of variety-specific laboratory measurements.
export const FOOD_DATA_VERSION = 'usda-sr-2018-opengym-1'
export const FOOD_SOURCE = 'https://fdc.nal.usda.gov/download-datasets/'
export const FOODS = [
  {
    "id": "rice-raw",
    "name": "White rice, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 365,
    "protein": 7.13,
    "carbs": 80,
    "fat": 0.66,
    "fiber": 1.3,
    "source": {
      "fdcId": 168877,
      "description": "Rice, white, long-grain, regular, raw, enriched"
    }
  },
  {
    "id": "rice",
    "name": "White rice, cooked",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 130,
    "protein": 2.69,
    "carbs": 28.2,
    "fat": 0.28,
    "fiber": 0.4,
    "source": {
      "fdcId": 168878,
      "description": "Rice, white, long-grain, regular, enriched, cooked"
    }
  },
  {
    "id": "brown-rice-raw",
    "name": "Brown rice, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 367,
    "protein": 7.54,
    "carbs": 76.2,
    "fat": 3.2,
    "fiber": 3.6,
    "source": {
      "fdcId": 169703,
      "description": "Rice, brown, long-grain, raw (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "brown-rice",
    "name": "Brown rice, cooked",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 123,
    "protein": 2.74,
    "carbs": 25.6,
    "fat": 0.97,
    "fiber": 1.6,
    "source": {
      "fdcId": 169704,
      "description": "Rice, brown, long-grain, cooked (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "atta",
    "name": "Whole-wheat flour",
    "group": "grain",
    "allergens": [
      "wheat"
    ],
    "diet": "vegan",
    "kcal": 340,
    "protein": 13.2,
    "carbs": 72,
    "fat": 2.5,
    "fiber": 10.7,
    "source": {
      "fdcId": 168893,
      "description": "Wheat flour, whole-grain (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "oats",
    "name": "Oats, dry",
    "group": "grain",
    "allergens": [
      "oats"
    ],
    "diet": "vegan",
    "kcal": 389,
    "protein": 16.9,
    "carbs": 66.3,
    "fat": 6.9,
    "fiber": 10.6,
    "source": {
      "fdcId": 169705,
      "description": "Oats (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "millet",
    "name": "Millet, cooked",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 119,
    "protein": 3.51,
    "carbs": 23.7,
    "fat": 1,
    "fiber": 1.3,
    "source": {
      "fdcId": 168871,
      "description": "Millet, cooked"
    }
  },
  {
    "id": "millet-raw",
    "name": "Millet, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 378,
    "protein": 11,
    "carbs": 72.8,
    "fat": 4.22,
    "fiber": 8.5,
    "source": {
      "fdcId": 169702,
      "description": "Millet, raw"
    }
  },
  {
    "id": "millet-flour",
    "name": "Millet flour",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 382,
    "protein": 10.8,
    "carbs": 75.1,
    "fat": 4.25,
    "fiber": 3.5,
    "source": {
      "fdcId": 172023,
      "description": "Millet flour"
    }
  },
  {
    "id": "jowar-flour",
    "name": "Sorghum (jowar) flour",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 359,
    "protein": 8.43,
    "carbs": 76.6,
    "fat": 3.34,
    "fiber": 6.6,
    "source": {
      "fdcId": 168943,
      "description": "Sorghum flour, whole-grain"
    }
  },
  {
    "id": "jowar",
    "name": "Sorghum grain, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 329,
    "protein": 10.6,
    "carbs": 72.1,
    "fat": 3.46,
    "fiber": 6.7,
    "source": {
      "fdcId": 169716,
      "description": "Sorghum grain"
    }
  },
  {
    "id": "semolina",
    "name": "Semolina, dry",
    "group": "grain",
    "allergens": [
      "wheat"
    ],
    "diet": "vegan",
    "kcal": 360,
    "protein": 12.7,
    "carbs": 72.8,
    "fat": 1.05,
    "fiber": 3.9,
    "source": {
      "fdcId": 168933,
      "description": "Semolina, unenriched"
    }
  },
  {
    "id": "quinoa-raw",
    "name": "Quinoa, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 368,
    "protein": 14.1,
    "carbs": 64.2,
    "fat": 6.07,
    "fiber": 7,
    "source": {
      "fdcId": 168874,
      "description": "Quinoa, uncooked"
    }
  },
  {
    "id": "quinoa",
    "name": "Quinoa, cooked",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 120,
    "protein": 4.4,
    "carbs": 21.3,
    "fat": 1.92,
    "fiber": 2.8,
    "source": {
      "fdcId": 168917,
      "description": "Quinoa, cooked"
    }
  },
  {
    "id": "buckwheat",
    "name": "Buckwheat, dry",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 343,
    "protein": 13.2,
    "carbs": 71.5,
    "fat": 3.4,
    "fiber": 10,
    "source": {
      "fdcId": 170286,
      "description": "Buckwheat"
    }
  },
  {
    "id": "buckwheat-flour",
    "name": "Buckwheat flour",
    "group": "grain",
    "allergens": [],
    "diet": "vegan",
    "kcal": 335,
    "protein": 12.6,
    "carbs": 70.6,
    "fat": 3.1,
    "fiber": 10,
    "source": {
      "fdcId": 170687,
      "description": "Buckwheat flour, whole-groat"
    }
  },
  {
    "id": "barley",
    "name": "Pearled barley, cooked",
    "group": "grain",
    "allergens": [
      "barley"
    ],
    "diet": "vegan",
    "kcal": 123,
    "protein": 2.26,
    "carbs": 28.2,
    "fat": 0.44,
    "fiber": 3.8,
    "source": {
      "fdcId": 170285,
      "description": "Barley, pearled, cooked"
    }
  },
  {
    "id": "lentils",
    "name": "Lentils, cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 116,
    "protein": 9.02,
    "carbs": 20.1,
    "fat": 0.38,
    "fiber": 7.9,
    "source": {
      "fdcId": 172421,
      "description": "Lentils, mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "lentils-raw",
    "name": "Lentils, dry",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 352,
    "protein": 24.6,
    "carbs": 63.4,
    "fat": 1.06,
    "fiber": 10.7,
    "source": {
      "fdcId": 172420,
      "description": "Lentils, raw"
    }
  },
  {
    "id": "red-lentils",
    "name": "Red lentils, dry",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 358,
    "protein": 23.9,
    "carbs": 63.1,
    "fat": 2.17,
    "fiber": 10.8,
    "source": {
      "fdcId": 174284,
      "description": "Lentils, pink or red, raw"
    }
  },
  {
    "id": "chickpeas",
    "name": "Chickpeas, cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 164,
    "protein": 8.86,
    "carbs": 27.4,
    "fat": 2.59,
    "fiber": 7.6,
    "source": {
      "fdcId": 173757,
      "description": "Chickpeas (garbanzo beans, bengal gram), mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "chickpeas-raw",
    "name": "Chickpeas, dry",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 378,
    "protein": 20.5,
    "carbs": 63,
    "fat": 6.04,
    "fiber": 12.2,
    "source": {
      "fdcId": 173756,
      "description": "Chickpeas (garbanzo beans, bengal gram), mature seeds, raw"
    }
  },
  {
    "id": "mung",
    "name": "Mung beans, cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 105,
    "protein": 7.02,
    "carbs": 19.2,
    "fat": 0.38,
    "fiber": 7.6,
    "source": {
      "fdcId": 174257,
      "description": "Mung beans, mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "mung-raw",
    "name": "Mung beans, dry",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 347,
    "protein": 23.9,
    "carbs": 62.6,
    "fat": 1.15,
    "fiber": 16.3,
    "source": {
      "fdcId": 174256,
      "description": "Mung beans, mature seeds, raw"
    }
  },
  {
    "id": "kidney",
    "name": "Kidney beans, cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 127,
    "protein": 8.67,
    "carbs": 22.8,
    "fat": 0.5,
    "fiber": 6.4,
    "source": {
      "fdcId": 173740,
      "description": "Beans, kidney, all types, mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "split-peas",
    "name": "Split peas, cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 118,
    "protein": 8.34,
    "carbs": 21.1,
    "fat": 0.39,
    "fiber": 8.3,
    "source": {
      "fdcId": 172429,
      "description": "Peas, split, mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "toor",
    "name": "Pigeon peas (toor), cooked",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 121,
    "protein": 6.76,
    "carbs": 23.2,
    "fat": 0.38,
    "fiber": 6.7,
    "source": {
      "fdcId": 172437,
      "description": "Pigeon peas (red gram), mature seeds, cooked, boiled, without salt"
    }
  },
  {
    "id": "toor-raw",
    "name": "Pigeon peas, dry",
    "group": "pulse",
    "allergens": [],
    "diet": "vegan",
    "kcal": 343,
    "protein": 21.7,
    "carbs": 62.8,
    "fat": 1.49,
    "fiber": 15,
    "source": {
      "fdcId": 172436,
      "description": "Pigeon peas (red gram), mature seeds, raw"
    }
  },
  {
    "id": "edamame",
    "name": "Green soybeans, cooked",
    "group": "pulse",
    "allergens": [
      "soy"
    ],
    "diet": "vegan",
    "kcal": 141,
    "protein": 12.4,
    "carbs": 11,
    "fat": 6.4,
    "fiber": 4.2,
    "source": {
      "fdcId": 169283,
      "description": "Soybeans, green, cooked, boiled, drained, without salt"
    }
  },
  {
    "id": "tofu",
    "name": "Firm tofu",
    "group": "pulse",
    "allergens": [
      "soy"
    ],
    "diet": "vegan",
    "kcal": 144,
    "protein": 17.3,
    "carbs": 2.78,
    "fat": 8.72,
    "fiber": 2.3,
    "source": {
      "fdcId": 172475,
      "description": "Tofu, raw, firm, prepared with calcium sulfate"
    }
  },
  {
    "id": "curd",
    "name": "Plain whole-milk yogurt",
    "group": "dairy",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 61,
    "protein": 3.47,
    "carbs": 4.66,
    "fat": 3.25,
    "fiber": 0,
    "source": {
      "fdcId": 171284,
      "description": "Yogurt, plain, whole milk"
    }
  },
  {
    "id": "curd-lowfat",
    "name": "Plain low-fat yogurt",
    "group": "dairy",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 63,
    "protein": 5.25,
    "carbs": 7.04,
    "fat": 1.55,
    "fiber": 0,
    "source": {
      "fdcId": 170886,
      "description": "Yogurt, plain, low fat"
    }
  },
  {
    "id": "curd-skim",
    "name": "Plain skim yogurt",
    "group": "dairy",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 56,
    "protein": 5.73,
    "carbs": 7.68,
    "fat": 0.18,
    "fiber": 0,
    "source": {
      "fdcId": 170887,
      "description": "Yogurt, plain, skim milk"
    }
  },
  {
    "id": "milk",
    "name": "Whole milk",
    "group": "dairy",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 61,
    "protein": 3.15,
    "carbs": 4.78,
    "fat": 3.27,
    "fiber": 0,
    "source": {
      "fdcId": 172217,
      "description": "Milk, whole, 3.25% milkfat, without added vitamin A and vitamin D"
    }
  },
  {
    "id": "milk-lowfat",
    "name": "Low-fat milk",
    "group": "dairy",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 42,
    "protein": 3.37,
    "carbs": 4.99,
    "fat": 0.97,
    "fiber": 0,
    "source": {
      "fdcId": 170872,
      "description": "Milk, lowfat, fluid, 1% milkfat, with added vitamin A and vitamin D"
    }
  },
  {
    "id": "egg",
    "name": "Hard-boiled egg",
    "group": "egg",
    "allergens": [
      "egg"
    ],
    "diet": "eggetarian",
    "kcal": 155,
    "protein": 12.6,
    "carbs": 1.12,
    "fat": 10.6,
    "fiber": 0,
    "source": {
      "fdcId": 173424,
      "description": "Egg, whole, cooked, hard-boiled"
    }
  },
  {
    "id": "egg-raw",
    "name": "Whole egg, raw",
    "group": "egg",
    "allergens": [
      "egg"
    ],
    "diet": "eggetarian",
    "kcal": 143,
    "protein": 12.6,
    "carbs": 0.72,
    "fat": 9.51,
    "fiber": 0,
    "source": {
      "fdcId": 171287,
      "description": "Egg, whole, raw, fresh"
    }
  },
  {
    "id": "chicken",
    "name": "Chicken breast, cooked roasted",
    "group": "meat",
    "allergens": [],
    "diet": "non-veg",
    "kcal": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.57,
    "fiber": 0,
    "source": {
      "fdcId": 171477,
      "description": "Chicken, broilers or fryers, breast, meat only, cooked, roasted"
    }
  },
  {
    "id": "tilapia",
    "name": "Tilapia, cooked",
    "group": "fish",
    "allergens": [
      "fish"
    ],
    "diet": "non-veg",
    "kcal": 128,
    "protein": 26.2,
    "carbs": 0,
    "fat": 2.65,
    "fiber": 0,
    "source": {
      "fdcId": 175177,
      "description": "Fish, tilapia, cooked, dry heat"
    }
  },
  {
    "id": "sardines",
    "name": "Sardines, canned drained",
    "group": "fish",
    "allergens": [
      "fish"
    ],
    "diet": "non-veg",
    "kcal": 208,
    "protein": 24.6,
    "carbs": 0,
    "fat": 11.4,
    "fiber": 0,
    "source": {
      "fdcId": 175139,
      "description": "Fish, sardine, Atlantic, canned in oil, drained solids with bone"
    }
  },
  {
    "id": "peanuts",
    "name": "Peanuts, dry roasted unsalted",
    "group": "nut",
    "allergens": [
      "peanut"
    ],
    "diet": "vegan",
    "kcal": 587,
    "protein": 24.4,
    "carbs": 21.3,
    "fat": 49.7,
    "fiber": 8.4,
    "source": {
      "fdcId": 173806,
      "description": "Peanuts, all types, dry-roasted, without salt"
    }
  },
  {
    "id": "almonds",
    "name": "Almonds",
    "group": "nut",
    "allergens": [
      "tree nuts"
    ],
    "diet": "vegan",
    "kcal": 579,
    "protein": 21.2,
    "carbs": 21.6,
    "fat": 49.9,
    "fiber": 12.5,
    "source": {
      "fdcId": 170567,
      "description": "Nuts, almonds"
    }
  },
  {
    "id": "walnuts",
    "name": "Walnuts",
    "group": "nut",
    "allergens": [
      "tree nuts"
    ],
    "diet": "vegan",
    "kcal": 654,
    "protein": 15.2,
    "carbs": 13.7,
    "fat": 65.2,
    "fiber": 6.7,
    "source": {
      "fdcId": 170187,
      "description": "Nuts, walnuts, english"
    }
  },
  {
    "id": "cashews",
    "name": "Cashews",
    "group": "nut",
    "allergens": [
      "tree nuts"
    ],
    "diet": "vegan",
    "kcal": 553,
    "protein": 18.2,
    "carbs": 30.2,
    "fat": 43.8,
    "fiber": 3.3,
    "source": {
      "fdcId": 170162,
      "description": "Nuts, cashew nuts, raw"
    }
  },
  {
    "id": "sesame",
    "name": "Sesame seeds",
    "group": "seed",
    "allergens": [
      "sesame"
    ],
    "diet": "vegan",
    "kcal": 631,
    "protein": 20.4,
    "carbs": 11.7,
    "fat": 61.2,
    "fiber": 11.6,
    "source": {
      "fdcId": 169412,
      "description": "Seeds, sesame seed kernels, dried (decorticated)"
    }
  },
  {
    "id": "flax",
    "name": "Flaxseed",
    "group": "seed",
    "allergens": [],
    "diet": "vegan",
    "kcal": 534,
    "protein": 18.3,
    "carbs": 28.9,
    "fat": 42.2,
    "fiber": 27.3,
    "source": {
      "fdcId": 169414,
      "description": "Seeds, flaxseed"
    }
  },
  {
    "id": "chia",
    "name": "Chia seeds",
    "group": "seed",
    "allergens": [],
    "diet": "vegan",
    "kcal": 486,
    "protein": 16.5,
    "carbs": 42.1,
    "fat": 30.7,
    "fiber": 34.4,
    "source": {
      "fdcId": 170554,
      "description": "Seeds, chia seeds, dried"
    }
  },
  {
    "id": "pumpkin-seeds",
    "name": "Pumpkin seed kernels",
    "group": "seed",
    "allergens": [],
    "diet": "vegan",
    "kcal": 559,
    "protein": 30.2,
    "carbs": 10.7,
    "fat": 49,
    "fiber": 6,
    "source": {
      "fdcId": 170556,
      "description": "Seeds, pumpkin and squash seed kernels, dried"
    }
  },
  {
    "id": "sunflower-seeds",
    "name": "Sunflower kernels, toasted",
    "group": "seed",
    "allergens": [],
    "diet": "vegan",
    "kcal": 619,
    "protein": 17.2,
    "carbs": 20.6,
    "fat": 56.8,
    "fiber": 11.5,
    "source": {
      "fdcId": 170154,
      "description": "Seeds, sunflower seed kernels, toasted, without salt"
    }
  },
  {
    "id": "banana",
    "name": "Banana, raw edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 89,
    "protein": 1.09,
    "carbs": 22.8,
    "fat": 0.33,
    "fiber": 2.6,
    "source": {
      "fdcId": 173944,
      "description": "Bananas, raw"
    }
  },
  {
    "id": "apple",
    "name": "Apple with skin",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 52,
    "protein": 0.26,
    "carbs": 13.8,
    "fat": 0.17,
    "fiber": 2.4,
    "source": {
      "fdcId": 171688,
      "description": "Apples, raw, with skin (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "orange",
    "name": "Orange, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 47,
    "protein": 0.94,
    "carbs": 11.8,
    "fat": 0.12,
    "fiber": 2.4,
    "source": {
      "fdcId": 169097,
      "description": "Oranges, raw, all commercial varieties"
    }
  },
  {
    "id": "papaya",
    "name": "Papaya, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 43,
    "protein": 0.47,
    "carbs": 10.8,
    "fat": 0.26,
    "fiber": 1.7,
    "source": {
      "fdcId": 169926,
      "description": "Papayas, raw"
    }
  },
  {
    "id": "guava",
    "name": "Guava",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 68,
    "protein": 2.55,
    "carbs": 14.3,
    "fat": 0.95,
    "fiber": 5.4,
    "source": {
      "fdcId": 173044,
      "description": "Guavas, common, raw"
    }
  },
  {
    "id": "mango",
    "name": "Mango, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 60,
    "protein": 0.82,
    "carbs": 15,
    "fat": 0.38,
    "fiber": 1.6,
    "source": {
      "fdcId": 169910,
      "description": "Mangos, raw"
    }
  },
  {
    "id": "pineapple",
    "name": "Pineapple, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 50,
    "protein": 0.54,
    "carbs": 13.1,
    "fat": 0.12,
    "fiber": 1.4,
    "source": {
      "fdcId": 169124,
      "description": "Pineapple, raw, all varieties"
    }
  },
  {
    "id": "watermelon",
    "name": "Watermelon, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 30,
    "protein": 0.61,
    "carbs": 7.55,
    "fat": 0.15,
    "fiber": 0.4,
    "source": {
      "fdcId": 167765,
      "description": "Watermelon, raw"
    }
  },
  {
    "id": "grapes",
    "name": "Grapes",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 69,
    "protein": 0.72,
    "carbs": 18.1,
    "fat": 0.16,
    "fiber": 0.9,
    "source": {
      "fdcId": 174683,
      "description": "Grapes, red or green (European type, such as Thompson seedless), raw"
    }
  },
  {
    "id": "pear",
    "name": "Pear",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 57,
    "protein": 0.36,
    "carbs": 15.2,
    "fat": 0.14,
    "fiber": 3.1,
    "source": {
      "fdcId": 169118,
      "description": "Pears, raw"
    }
  },
  {
    "id": "dates",
    "name": "Medjool dates, pitted",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 277,
    "protein": 1.81,
    "carbs": 75,
    "fat": 0.15,
    "fiber": 6.7,
    "source": {
      "fdcId": 168191,
      "description": "Dates, medjool"
    }
  },
  {
    "id": "raisins",
    "name": "Raisins",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 299,
    "protein": 3.3,
    "carbs": 79.3,
    "fat": 0.25,
    "fiber": 4.5,
    "source": {
      "fdcId": 168165,
      "description": "Raisins, dark, seedless (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "lemon",
    "name": "Lemon, without peel",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 29,
    "protein": 1.1,
    "carbs": 9.32,
    "fat": 0.3,
    "fiber": 2.8,
    "source": {
      "fdcId": 167746,
      "description": "Lemons, raw, without peel"
    }
  },
  {
    "id": "lime",
    "name": "Lime, edible portion",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 30,
    "protein": 0.7,
    "carbs": 10.5,
    "fat": 0.2,
    "fiber": 2.8,
    "source": {
      "fdcId": 168155,
      "description": "Limes, raw"
    }
  },
  {
    "id": "pomegranate",
    "name": "Pomegranate arils",
    "group": "fruit",
    "allergens": [],
    "diet": "vegan",
    "kcal": 83,
    "protein": 1.67,
    "carbs": 18.7,
    "fat": 1.17,
    "fiber": 4,
    "source": {
      "fdcId": 169134,
      "description": "Pomegranates, raw"
    }
  },
  {
    "id": "spinach",
    "name": "Spinach, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 23,
    "protein": 2.86,
    "carbs": 3.63,
    "fat": 0.39,
    "fiber": 2.2,
    "source": {
      "fdcId": 168462,
      "description": "Spinach, raw"
    }
  },
  {
    "id": "carrot",
    "name": "Carrot, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 41,
    "protein": 0.93,
    "carbs": 9.58,
    "fat": 0.24,
    "fiber": 2.8,
    "source": {
      "fdcId": 170393,
      "description": "Carrots, raw"
    }
  },
  {
    "id": "tomato",
    "name": "Tomato",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 18,
    "protein": 0.88,
    "carbs": 3.89,
    "fat": 0.2,
    "fiber": 1.2,
    "source": {
      "fdcId": 170457,
      "description": "Tomatoes, red, ripe, raw, year round average"
    }
  },
  {
    "id": "onion",
    "name": "Onion, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 40,
    "protein": 1.1,
    "carbs": 9.34,
    "fat": 0.1,
    "fiber": 1.7,
    "source": {
      "fdcId": 170000,
      "description": "Onions, raw"
    }
  },
  {
    "id": "garlic",
    "name": "Garlic",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 149,
    "protein": 6.36,
    "carbs": 33.1,
    "fat": 0.5,
    "fiber": 2.1,
    "source": {
      "fdcId": 169230,
      "description": "Garlic, raw"
    }
  },
  {
    "id": "ginger",
    "name": "Ginger",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 80,
    "protein": 1.82,
    "carbs": 17.8,
    "fat": 0.75,
    "fiber": 2,
    "source": {
      "fdcId": 169231,
      "description": "Ginger root, raw"
    }
  },
  {
    "id": "cucumber",
    "name": "Cucumber with peel",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 15,
    "protein": 0.65,
    "carbs": 3.63,
    "fat": 0.11,
    "fiber": 0.5,
    "source": {
      "fdcId": 168409,
      "description": "Cucumber, with peel, raw"
    }
  },
  {
    "id": "cabbage",
    "name": "Cabbage, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 25,
    "protein": 1.28,
    "carbs": 5.8,
    "fat": 0.1,
    "fiber": 2.5,
    "source": {
      "fdcId": 169975,
      "description": "Cabbage, raw"
    }
  },
  {
    "id": "cauliflower",
    "name": "Cauliflower, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 25,
    "protein": 1.92,
    "carbs": 4.97,
    "fat": 0.28,
    "fiber": 2,
    "source": {
      "fdcId": 169986,
      "description": "Cauliflower, raw"
    }
  },
  {
    "id": "broccoli",
    "name": "Broccoli, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 34,
    "protein": 2.82,
    "carbs": 6.64,
    "fat": 0.37,
    "fiber": 2.6,
    "source": {
      "fdcId": 170379,
      "description": "Broccoli, raw"
    }
  },
  {
    "id": "okra",
    "name": "Okra, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 33,
    "protein": 1.93,
    "carbs": 7.45,
    "fat": 0.19,
    "fiber": 3.2,
    "source": {
      "fdcId": 169260,
      "description": "Okra, raw"
    }
  },
  {
    "id": "aubergine",
    "name": "Aubergine, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 25,
    "protein": 0.98,
    "carbs": 5.88,
    "fat": 0.18,
    "fiber": 3,
    "source": {
      "fdcId": 169228,
      "description": "Eggplant, raw"
    }
  },
  {
    "id": "potato",
    "name": "Potato, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 77,
    "protein": 2.05,
    "carbs": 17.5,
    "fat": 0.09,
    "fiber": 2.1,
    "source": {
      "fdcId": 170026,
      "description": "Potatoes, flesh and skin, raw"
    }
  },
  {
    "id": "sweet-potato",
    "name": "Sweet potato, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 86,
    "protein": 1.57,
    "carbs": 20.1,
    "fat": 0.05,
    "fiber": 3,
    "source": {
      "fdcId": 168482,
      "description": "Sweet potato, raw, unprepared (Includes foods for USDA's Food Distribution Program)"
    }
  },
  {
    "id": "peas",
    "name": "Green peas, cooked",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 78,
    "protein": 5.15,
    "carbs": 14.3,
    "fat": 0.27,
    "fiber": 4.5,
    "source": {
      "fdcId": 170017,
      "description": "Peas, green, frozen, cooked, boiled, drained, without salt"
    }
  },
  {
    "id": "green-beans",
    "name": "Green beans, cooked",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 35,
    "protein": 1.89,
    "carbs": 7.88,
    "fat": 0.28,
    "fiber": 3.2,
    "source": {
      "fdcId": 169141,
      "description": "Beans, snap, green, cooked, boiled, drained, without salt"
    }
  },
  {
    "id": "pumpkin",
    "name": "Pumpkin, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 26,
    "protein": 1,
    "carbs": 6.5,
    "fat": 0.1,
    "fiber": 0.5,
    "source": {
      "fdcId": 168448,
      "description": "Pumpkin, raw"
    }
  },
  {
    "id": "mushrooms",
    "name": "Mushrooms, cooked",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 28,
    "protein": 2.17,
    "carbs": 5.29,
    "fat": 0.47,
    "fiber": 2.2,
    "source": {
      "fdcId": 169252,
      "description": "Mushrooms, white, cooked, boiled, drained, without salt"
    }
  },
  {
    "id": "pepper",
    "name": "Green sweet pepper",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 20,
    "protein": 0.86,
    "carbs": 4.64,
    "fat": 0.17,
    "fiber": 1.7,
    "source": {
      "fdcId": 170427,
      "description": "Peppers, sweet, green, raw"
    }
  },
  {
    "id": "beet",
    "name": "Beetroot, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 43,
    "protein": 1.61,
    "carbs": 9.56,
    "fat": 0.17,
    "fiber": 2.8,
    "source": {
      "fdcId": 169145,
      "description": "Beets, raw"
    }
  },
  {
    "id": "radish",
    "name": "Radish",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 16,
    "protein": 0.68,
    "carbs": 3.4,
    "fat": 0.1,
    "fiber": 1.6,
    "source": {
      "fdcId": 169276,
      "description": "Radishes, raw"
    }
  },
  {
    "id": "turnip",
    "name": "Turnip, raw weight",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 28,
    "protein": 0.9,
    "carbs": 6.43,
    "fat": 0.1,
    "fiber": 1.8,
    "source": {
      "fdcId": 170465,
      "description": "Turnips, raw"
    }
  },
  {
    "id": "corn",
    "name": "Sweet corn, cooked",
    "group": "vegetable",
    "allergens": [],
    "diet": "vegan",
    "kcal": 81,
    "protein": 2.55,
    "carbs": 19.3,
    "fat": 0.67,
    "fiber": 2.4,
    "source": {
      "fdcId": 168399,
      "description": "Corn, sweet, yellow, frozen, kernels cut off cob, boiled, drained, without salt"
    }
  },
  {
    "id": "olive-oil",
    "name": "Olive oil",
    "group": "fat",
    "allergens": [],
    "diet": "vegan",
    "kcal": 884,
    "protein": 0,
    "carbs": 0,
    "fat": 100,
    "fiber": 0,
    "source": {
      "fdcId": 171413,
      "description": "Oil, olive, salad or cooking"
    }
  },
  {
    "id": "sunflower-oil",
    "name": "Sunflower oil",
    "group": "fat",
    "allergens": [],
    "diet": "vegan",
    "kcal": 884,
    "protein": 0,
    "carbs": 0,
    "fat": 100,
    "fiber": 0,
    "source": {
      "fdcId": 171025,
      "description": "Oil, sunflower, linoleic, (approx. 65%)"
    }
  },
  {
    "id": "ghee",
    "name": "Butter oil (ghee)",
    "group": "fat",
    "allergens": [
      "milk"
    ],
    "diet": "vegetarian",
    "kcal": 876,
    "protein": 0.28,
    "carbs": 0,
    "fat": 99.5,
    "fiber": 0,
    "source": {
      "fdcId": 173412,
      "description": "Butter oil, anhydrous"
    }
  },
  {
    "id": "cumin",
    "name": "Cumin seeds",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 375,
    "protein": 17.8,
    "carbs": 44.2,
    "fat": 22.3,
    "fiber": 10.5,
    "source": {
      "fdcId": 170923,
      "description": "Spices, cumin seed"
    }
  },
  {
    "id": "turmeric",
    "name": "Turmeric",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 312,
    "protein": 9.68,
    "carbs": 67.1,
    "fat": 3.25,
    "fiber": 22.7,
    "source": {
      "fdcId": 172231,
      "description": "Spices, turmeric, ground"
    }
  },
  {
    "id": "coriander-seed",
    "name": "Coriander seeds",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 298,
    "protein": 12.4,
    "carbs": 55,
    "fat": 17.8,
    "fiber": 41.9,
    "source": {
      "fdcId": 170922,
      "description": "Spices, coriander seed"
    }
  },
  {
    "id": "black-pepper",
    "name": "Black pepper",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 251,
    "protein": 10.4,
    "carbs": 64,
    "fat": 3.26,
    "fiber": 25.3,
    "source": {
      "fdcId": 170931,
      "description": "Spices, pepper, black"
    }
  },
  {
    "id": "cinnamon",
    "name": "Cinnamon",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 247,
    "protein": 3.99,
    "carbs": 80.6,
    "fat": 1.24,
    "fiber": 53.1,
    "source": {
      "fdcId": 171320,
      "description": "Spices, cinnamon, ground"
    }
  },
  {
    "id": "coriander",
    "name": "Coriander leaves",
    "group": "spice",
    "allergens": [],
    "diet": "vegan",
    "kcal": 23,
    "protein": 2.13,
    "carbs": 3.67,
    "fat": 0.52,
    "fiber": 2.8,
    "source": {
      "fdcId": 169997,
      "description": "Coriander (cilantro) leaves, raw"
    }
  }
]
export const FOOD_INDEX = Object.fromEntries(FOODS.map(f => [f.id, f]))
