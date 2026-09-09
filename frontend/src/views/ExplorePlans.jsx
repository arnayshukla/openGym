import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { useUI } from '../store/useUI.js'
import { TRAINING_TEMPLATES, templatePlan, generateTrainingPlan, saveTrainingPlan, EQUIPMENT, GOALS, MOVEMENTS, requirements, estimateMinutes, replaceTrainingExercise } from '../lib/training-plans.js'
import { EXIDX } from '../lib/exercises.js'
import { uid, DAYN } from '../lib/format.js'
import { t } from '../lib/i18n.js'
import { Thumb } from '../components/Media.jsx'
import { Select, Field, Check, Choices, ErrorNotice } from '../components/PlannerFields.jsx'

export default function ExplorePlans() {
  const nav = useNavigate(), update = useStore(s => s.update)
  const saved = useStore(s => s.S.plannerProfile)
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.has('personal') ? 'personal' : 'templates'), [preview, setPreview] = useState(null), [error, setError] = useState('')
  const showingPreview = !!preview
  useEffect(() => { window.scrollTo(0, 0) }, [mode, showingPreview])
  const [filter, setFilter] = useState({ days: '', level: '', location: '', equipment: '', goal: '' })
  const [p, setP] = useState(saved?.training || { goal: 'general fitness', level: 'beginner', days: '3', minutes: '45', style: 'gym', equipment: ['dumbbell', 'bench', 'cable', 'leverage machine', 'sled machine', 'stationary bike'], avoidIds: [], avoidPatterns: [], lowImpact: true, adult: false, healthConcern: false, activity: 'low' })
  const change = (k, v) => { setP(x => ({ ...x, [k]: v })); setError('') }
  const [query, setQuery] = useState('')
  const setF = (k, v) => setFilter(x => ({ ...x, [k]: v }))
  const act = fn => { try { fn(); setError('') } catch (e) { setError(e.message) } }
  const save = () => act(() => {
    const id = uid()
    update(s => { saveTrainingPlan(s, preview, id); if (mode === 'personal') s.plannerProfile = { ...s.plannerProfile, training: p } })
    useUI.getState().toast(t('Plan saved. Activate it when you are ready.')); nav('/plan')
  })
  const replace = (ri, ei, id) => setPreview(x => ({ ...x, routines: x.routines.map((r, i) => i !== ri ? r : { ...r, ex: r.ex.map((e, j) => j !== ei ? e : replaceTrainingExercise(e, id)) }) }))
  return <div className="planner-page">
    <div className="hdr"><div><h1>{t('Find your routine')}</h1><div className="sub">{t('A clear next step, whatever your starting point.')}</div></div><button className="btn ghost" onClick={() => preview ? setPreview(null) : nav('/plan')}>{t('Back')}</button></div>
    <ErrorNotice error={error} />
    {preview ? <>
      <div className="planner-hero"><span className="tag acc">{preview.daysPerWeek} {t('days / week')}</span><h2>{t(preview.name)}</h2>{preview.explanations.map((s, i) => <p key={i}>{t(s)}</p>)}<p className="small">{t('Start with a load you can control with a few repetitions left. Stop if an exercise causes pain. Session estimates include a five-minute warm-up; use easy practice sets of the listed movements.')}</p></div>
      <Field label="Plan name"><input className="input" maxLength={100} value={preview.name} onChange={e => setPreview(x => ({ ...x, name: e.target.value }))} /></Field>
      <div className="chips">{Object.entries(preview.week).map(([d, id]) => <span className="tag" key={d}>{t(DAYN[d])}: {t(preview.routines.find(r => r.id === id)?.name)}</span>)}</div>
      {preview.routines.map((r, ri) => <section className="card" key={r.id}><h2>{t(r.name)} · ~{estimateMinutes(r)} {t('min')}</h2>{r.ex.map((e, ei) => {
        const options = (MOVEMENTS[e.pattern] || [e.id]).filter(id => mode !== 'personal' || (!p.avoidIds.includes(id) && requirements(id).every(x => p.equipment.includes(x)) && !(p.lowImpact && id === '0685') && (p.style !== 'calisthenics' || EXIDX[id].eq === 'body weight' || id === '0970')))
        return <div className="planner-ex" key={ei}><Thumb ex={EXIDX[e.id]} /><div className="grow"><b className="capitalize">{EXIDX[e.id].n}</b><div className="small muted">{e.mode === 'cardio' ? `${e.min} min · comfortable pace` : `${e.sets} × ${e.reps}${e.side ? ' total, both sides' : ''} · ${e.restSec}s rest`}</div>{options.length > 1 && <select className="input" aria-label={`Swap ${r.name} exercise ${ei + 1}`} value={e.id} onChange={ev => replace(ri, ei, ev.target.value)}>{[...new Set([e.id, ...options])].map(id => <option key={id} value={id}>{EXIDX[id].n}</option>)}</select>}</div></div>
      })}</section>)}
      <button className="btn primary" disabled={!preview.name.trim()} onClick={save}>{t('Save as a new plan')}</button><p className="small muted">{t('Your active plan stays in place until you choose Activate on the Plan screen.')}</p>
    </> : <>
      <div className="planner-tabs"><button className={'btn ' + (mode === 'templates' ? 'primary' : 'ghost')} onClick={() => setMode('templates')}>{t('Explore plans')}</button><button className={'btn ' + (mode === 'personal' ? 'primary' : 'ghost')} onClick={() => setMode('personal')}>{t('Create my plan')}</button><button className="btn ghost" onClick={() => nav('/nutrition')}>{t('Meals & nutrition')}</button></div>
      {mode === 'templates' ? <>
        <div className="planner-grid filters"><Select label="Days per week" value={filter.days} onChange={v => setF('days', v)} options={['', '2', '3', '4']} /><Select label="Experience" value={filter.level} onChange={v => setF('level', v)} options={['', 'beginner', 'intermediate']} /><Select label="Location" value={filter.location} onChange={v => setF('location', v)} options={['', 'gym', 'home']} /><Select label="Equipment used" value={filter.equipment} onChange={v => setF('equipment', v)} options={['', ...EQUIPMENT]} /><Select label="Goal" value={filter.goal} onChange={v => setF('goal', v)} options={['', ...GOALS]} /></div>
        <div className="planner-grid">{TRAINING_TEMPLATES.filter(x => (!filter.days || +filter.days === x.daysPerWeek) && (!filter.level || filter.level === x.level) && (!filter.location || filter.location === x.location) && (!filter.equipment || x.equipment.includes(filter.equipment)) && (!filter.goal || x.goals.includes(filter.goal))).map(x => <article className="card template-card" key={x.id}><div className="row between"><span className="tag acc">{x.daysPerWeek} {t('days')}</span><span className="small muted">{t(x.level)} · ~{x.minutes} min</span></div><h2>{t(x.nameKey)}</h2><p>{t(x.descriptionKey)}</p><p className="small muted">{t('Equipment')}: {x.equipment.join(', ') || t('Bodyweight')}</p><button className="btn" onClick={() => setPreview(templatePlan(x))}>{t('Preview plan')}</button>{x.id === 'ppl' && <button className="btn ghost" onClick={() => setPreview(templatePlan(x, 6))}>{t('Preview 6-day variant')}</button>}</article>)}</div>
      </> : <form onSubmit={ev => { ev.preventDefault(); act(() => setPreview(generateTrainingPlan(p))) }}>
        <section className="card"><h2>{t('Your starting point')}</h2><Check label="I am 18 or older" checked={p.adult} onChange={v => change('adult', v)} /><Check label="I have pain, an injury or a condition requiring professional exercise guidance" checked={p.healthConcern} onChange={v => change('healthConcern', v)} /><div className="planner-grid"><Select label="Goal" value={p.goal} onChange={v => change('goal', v)} options={GOALS} /><Select label="Experience" value={p.level} onChange={v => change('level', v)} options={['beginner', 'intermediate']} /><Select label="Days per week" value={p.days} onChange={v => change('days', v)} options={['2', '3', '4', '6']} /><Select label="Minutes per session" value={p.minutes} onChange={v => change('minutes', v)} options={['25', '30', '45', '60', '90']} /><Select label="Training style" value={p.style} onChange={v => change('style', v)} options={['gym', 'home', 'mixed', 'calisthenics']} /><Select label="Current activity" value={p.activity} onChange={v => change('activity', v)} options={['low', 'moderate', 'high']} /></div></section>
        <section className="card"><h2>{t('What you can use')}</h2><Choices label="Available equipment — select every item you have" values={p.equipment} onChange={v => change('equipment', v)} options={EQUIPMENT} /><Check label="Low-impact conditioning only" checked={p.lowImpact} onChange={v => change('lowImpact', v)} /><Choices label="Movements to avoid" values={p.avoidPatterns} onChange={v => change('avoidPatterns', v)} options={['push', 'pull', 'verticalPull', 'knee', 'hinge', 'shoulder', 'core', 'cardio']} /><p className="small muted">{t('If a required movement has no compatible option, we will explain what prevented a balanced plan.')}</p><Field label="Search exercises to exclude"><input className="input" value={query} onChange={e => setQuery(e.target.value)} /></Field>{query && Object.values(EXIDX).filter(e => e.n.toLowerCase().includes(query.toLowerCase())).slice(0, 12).map(e => <Check key={e.id} label={e.n} checked={p.avoidIds.includes(e.id)} onChange={on => change('avoidIds', on ? [...p.avoidIds, e.id] : p.avoidIds.filter(id => id !== e.id))} />)}<div className="chips">{p.avoidIds.map(id => <button type="button" className="chip" key={id} onClick={() => change('avoidIds', p.avoidIds.filter(x => x !== id))}>{EXIDX[id]?.n} ×</button>)}</div></section>
        <ErrorNotice error={error} /><button className="btn primary" type="submit">{t('Build my preview')}</button>
      </form>}
    </>}
    <p className="small muted planner-source">{t('General wellness guidance for healthy adults. New content is available in English.')} <a href="https://www.acsm.org/wp-content/uploads/2026/03/Resistance-Training-Position-Stand-infographic.pdf" target="_blank" rel="noreferrer">ACSM guidance</a> · <a href="https://github.com/arnayshukla/openGym/issues/new" target="_blank" rel="noreferrer">{t('Report content')}</a></p>
  </div>
}
