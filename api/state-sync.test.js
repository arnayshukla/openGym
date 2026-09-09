import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import net from 'node:net'
import crypto from 'node:crypto'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { TRAINING_TEMPLATES, templatePlan, saveTrainingPlan, activateTrainingPlan } from '../frontend/src/lib/training-plans.js'
import { DEFAULT_NUTRITION_PROFILE, generateNutritionPlan, saveNutritionPreferences, activateNutritionPlan } from '../frontend/src/lib/nutrition-plans.js'

test('authenticated planner state round-trips to disk and survives an API restart', async () => {
  // This creates a completely isolated test account and signing secret. It never
  // reads repository data/, production credentials, or a real user session.
  const data = await fs.mkdtemp(path.join(os.tmpdir(), 'opengym-sync-test-'))
  const secret = crypto.randomBytes(32).toString('hex')
  await fs.writeFile(path.join(data, 'secret'), secret, { mode: 0o600 })
  await fs.writeFile(path.join(data, 'db.json'), JSON.stringify({ users: [{ id: 'planner-test', name: 'Planner test', sv: 0 }], creds: [], subs: [], invites: [] }))
  const probe = net.createServer().listen(0, '127.0.0.1')
  await once(probe, 'listening')
  const port = probe.address().port
  await new Promise(resolve => probe.close(resolve))
  let child
  const stop = async () => { if (child && child.exitCode === null) { const exit = once(child, 'exit'); child.kill('SIGTERM'); await exit } }
  const start = async () => {
    child = spawn(process.execPath, ['server.js'], { cwd: import.meta.dirname, env: { ...process.env, DATA_DIR: data, PORT: String(port), ORIGIN: `http://127.0.0.1:${port}`, RP_ID: 'localhost', VAPID_SUBJECT: 'mailto:test@example.invalid' }, stdio: ['ignore', 'pipe', 'pipe'] })
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Test API did not start')), 8000)
      child.once('error', e => { clearTimeout(timer); reject(e) })
      child.once('exit', code => { clearTimeout(timer); reject(new Error(`Test API exited: ${code}`)) })
      child.stdout.on('data', chunk => { if (String(chunk).includes('gym-api on')) { clearTimeout(timer); resolve() } })
    })
  }
  try {
    await start()
    const url = `http://127.0.0.1:${port}/api/data`
    assert.equal((await fetch(url)).status, 401)
    const payload = `planner-test:${Date.now() + 60000}:0`
    const token = payload + '.' + crypto.createHmac('sha256', secret).update(payload).digest('base64url')
    const headers = { 'Content-Type': 'application/json', Cookie: 'gymsid=' + token }
    const s = { routines: [], week: {}, dayPlan: {}, workouts: [{ id: 'history-test' }], active: null }
    saveTrainingPlan(s, templatePlan(TRAINING_TEMPLATES[0]), 'training-test')
    activateTrainingPlan(s, 'training-test')
    const p = { ...DEFAULT_NUTRITION_PROFILE, adult: true, exclusionsConfirmed: true, diet: 'vegan', allergens: ['peanut'] }
    saveNutritionPreferences(s, p)
    s.dietPlans.push({ ...generateNutritionPlan(p, s.week), id: 'diet-test' })
    activateNutritionPlan(s, 'diet-test')
    s.active = { id: 'device-only-workout' }
    s._ts = Date.now()
    assert.ok(Buffer.byteLength(JSON.stringify({ state: s })) < 5 * 1024 * 1024)
    assert.equal((await fetch(url, { method: 'PUT', headers, body: JSON.stringify({ state: s }) })).status, 200)
    const expected = structuredClone(s); delete expected.active
    assert.deepEqual((await (await fetch(url, { headers })).json()).state, expected)
    assert.deepEqual(JSON.parse(await fs.readFile(path.join(data, 'state-planner-test.json'), 'utf8')), expected)
    await stop(); await start()
    assert.deepEqual((await (await fetch(url, { headers })).json()).state, expected)
  } finally {
    await stop()
    // Exact mkdtemp-owned target only; no application/user directory is touched.
    await fs.rm(data, { recursive: true, force: true })
  }
})
