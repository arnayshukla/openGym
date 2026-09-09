# Workout and nutrition planners

## Using the features

Open **Plan → Explore workout plans** to preview six workout families: two- and three-day full body, three-day calisthenics, general fitness, four-day upper/lower, and the original push/pull/legs split with three- or six-day scheduling. All exercises come from the existing catalog. Equipment lists include fixtures such as benches, pull-up bars and squat racks.

Use **Create my plan** for a deterministic questionnaire-based routine. Preview substitutions, name the plan, save it, then activate it under **Saved workout plans**. Saving alone never replaces the active routine. Activate a saved plan to edit its routines with the existing editor. Switching during a live workout is blocked. Inactive plans can be renamed, duplicated or deleted without deleting logged workouts.

Open **Meals & nutrition** from Home or Plan. Review adult eligibility, dietary pattern, allergies, intolerances, cultural ingredient restrictions and specific dislikes. Choose meal frequency, preparation time, relative budget and portions. Measurements are optional: leave energy targets off for a portion-based sample menu. With targets on, supply the inputs needed by the energy equation. Preview seven days, swap eligible meals, inspect ingredients/preparation and the grocery list, then save and activate.

When changing exclusions, use **Save preferences & check saved menus**. An incompatible active menu is deactivated but retained. Activation and swaps recheck the current exclusions. Unknown or uncertain allergies fail closed. The app does not certify cross-contact safety, product preparation standards, or therapeutic suitability.

Eight-week check-ins appear in the active workout/menu management screens. These are in-app reminders, not newly scheduled push notifications. Menus store the weekly workout schedule used at generation; changing the workout schedule prompts regeneration instead of silently modifying meals. Date-specific workout overrides do not automatically rewrite a saved weekly menu.

## Architecture

- `frontend/src/lib/training-plans.js`: versioned workout templates, fixture requirements, movement-compatible substitutions, deterministic generation, migration and active-plan projection.
- `frontend/src/lib/foods-data.js`: 96 curated USDA SR Legacy records, stable IDs, per-100-g nutrients, dietary/allergen metadata and individual source IDs.
- `frontend/src/lib/meals-data.js`: 40 authored meal combinations and 12 snacks. Ingredients reference food IDs and gram quantities in the explicitly named raw/cooked state.
- `frontend/src/lib/nutrition-plans.js`: hard exclusions, menu generation, bounded portion fitting, nutrition totals, swaps, groceries and activation checks.
- `frontend/src/views/ExplorePlans.jsx`, `Nutrition.jsx`: lazy-loaded screens; questionnaire state is separate from persisted profiles until saving.
- `frontend/src/components/SavedPlans.jsx`: saved-workout management and review prompt.
- `frontend/src/store/useStore.js`: schema-v2 migration and persistence through the existing localStorage, native-file and account-sync paths.

No new backend service, database, LLM, API key or paid provider is required. Generation is synchronous and offline. First-time web page/media loading still requires connectivity; mobile keeps the existing native persistence behavior. New strings use the existing `t()` fallback mechanism and start in English.

## Persistence and compatibility

The existing state document now includes `schemaVersion: 2`, `trainingPlans`, `activeTrainingPlanId`, `dietPlans`, `activeDietPlanId` and `plannerProfile`. Existing top-level `routines`, `week` and `dayPlan` remain the **active projection**, so the workout player, progression engine and backend reminders retain their original contracts.

Legacy routines migrate to **My current plan** with their original IDs and date overrides intact. Every store persistence captures edits to the active projection in the matching saved plan. New copies receive fresh routine IDs. Workout history, custom exercise definitions and per-exercise working weights remain unchanged; working weights intentionally remain shared across plans, as before.

The API continues storing the opaque document via authenticated `PUT /api/data` and returning it via `GET /api/data`. In-progress `active` workouts remain device-local. No server migration is necessary. Existing sync is whole-document, last-write-wins; this feature does not introduce multi-device conflict merging. Each diet plan snapshots recipes, ingredient values, source records and generation preferences. The API's existing 5 MB state limit still applies.

Workout sharing writes format v2 and still reads v1. Rest intervals travel with exercise configuration. Sharing exports only the active workout routines/schedule and referenced custom exercises—never meals, health answers, saved-plan archives or history. Full account backups retain the full state.

## Generation and safety boundaries

Training selection depends on days, experience, goal, available time/equipment, activity, movement/exercise exclusions and low-impact preference. Required movements with no compatible existing exercise cause an explicit error. Templates and generated plans are starting points for healthy adults, not rehabilitation prescriptions. Session estimates include five minutes of warm-up; they are estimates, not measured durations. Six-day training is unavailable for beginners.

Nutrition filters ingredients before selecting recipes. Vegan excludes all animal foods; vegetarian permits dairy; eggetarian also permits eggs; non-vegetarian also permits the catalog's chicken/fish. Gluten exclusion conservatively removes generic oats, wheat and barley. Lactose exclusion conservatively removes all milk-tagged foods. Cultural filters are ingredient exclusions, not religious certification.

The portion menu does not claim to meet an individual's energy or micronutrient requirements. Optional energy sizing uses Mifflin–St Jeor with approximate activity multipliers, a modest goal adjustment and an estimated range. Supported numerical bounds are product scope, not universal safe-intake thresholds. Unsupported estimates produce an error rather than being clamped. Enumerating 0.75×, 1×, 1.25× and 1.5× portions keeps fitting deterministic; incompatible targets or swaps fail without changing the original preview. Protein/fiber values describe the selected meals, not a personalized medical target. Displayed ±10% ranges are illustrative preparation variability, not statistical confidence intervals.

Recipes use already-cooked grains/pulses when the ingredient says cooked; batch-cooking time is additional. Groceries are edible weights in the named state, not automatically converted purchase weights. No raw/cooked conversions or paneer-to-cottage-cheese equivalences are invented. Budget labels are relative preferences, not current local prices. Menus are general wellness guidance, not dietitian-approved or nutritionally complete prescriptions.

## Sources and maintenance

- [USDA FoodData Central downloads](https://fdc.nal.usda.gov/download-datasets/): SR Legacy April 2018, public domain/CC0. Each ingredient links to its actual FDC record.
- [ICMR–NIN Dietary Guidelines for Indians 2024](https://www.nin.res.in/dietaryguidelines/pdfjs/locale/DGI07052024P.pdf): dietary context, not a claim that these recipes or numeric values were extracted from IFCT.
- [Mifflin–St Jeor original publication](https://pubmed.ncbi.nlm.nih.gov/2305711/): energy equation.
- [ACSM resistance-training guidance](https://www.acsm.org/wp-content/uploads/2026/03/Resistance-Training-Position-Stand-infographic.pdf): general adult training principles.
- [FoodSafety.gov cooking temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): linked preparation-safety reference.

Do not reuse a stable food/exercise ID for a different item. Review ingredient state, allergens, fixture requirements and amounts when editing catalog data; increment relevant content versions. Existing saved menus retain their numerical/source snapshots. Unknown removed ingredients are not treated as safe. Content-report links go to the repository issue tracker; avoid posting private health information.

## Verification

From `frontend/`, run `npm test`, `npm run validate:catalog` and `npm run build`. Normal and mobile build scripts validate catalogs before bundling. For source verification, download/unzip the official SR Legacy April 2018 JSON and run:

```sh
node scripts/verify-usda.mjs /path/to/FoodData_Central_sr_legacy_food_json_2018-04.json
```

From `api/`, run `npm test`. The integration test starts the real API with a temporary test account/data directory, checks unauthenticated rejection, saves planner state, verifies disk/GET equality and restarts the API to verify durability. It never reads production credentials or repository runtime data.

Browser checks should cover legacy migration, template preview/save/activate/reload, personalized generation failures, a menu swap, allergen-change deactivation, saved-menu reactivation blocking, and a 390 px viewport. Native packaging/signing and a production Railway rollout are separate release steps.
