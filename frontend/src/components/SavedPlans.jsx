import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { activateTrainingPlan, saveTrainingPlan } from '../lib/training-plans.js'
import { uid } from '../lib/format.js'
import { t } from '../lib/i18n.js'
import { Field, ErrorNotice } from './PlannerFields.jsx'

export default function SavedPlans() {
  const S = useStore(s => s.S), update = useStore(s => s.update), nav = useNavigate()
  const [error, setError] = useState('')
  const activate = id => { try { update(s => activateTrainingPlan(s, id)); setError('') } catch (e) { setError(e.message) } }
  const active = S.trainingPlans?.find(p => p.id === S.activeTrainingPlanId)
  const reviewDue = active?.activatedAt && Date.now() - (active.reviewedAt || active.activatedAt) >= 56 * 86400000
  return <section className="planner-page saved-plans">
    <div className="planner-tabs"><button className="btn primary" onClick={() => nav('/plan/explore')}>{t('Explore workout plans')}</button><button className="btn" onClick={() => nav('/plan/explore?personal=1')}>{t('Create my plan')}</button><button className="btn ghost" onClick={() => nav('/nutrition')}>{t('Meals & nutrition')}</button></div>
    {reviewDue && <div className="planner-notice"><p>{t('Eight-week check-in: how are recovery, enjoyment and progress? Review your plan before adding more work.')}</p><button className="btn" onClick={() => update(s => { s.trainingPlans.find(p => p.id === active.id).reviewedAt = Date.now() })}>{t('Mark reviewed')}</button></div>}
    <ErrorNotice error={error} />
    {!!S.trainingPlans?.length && <details className="card"><summary>{t('Saved workout plans')} ({S.trainingPlans.length}) · {active?.name || t('None active')}</summary><div className="planner-grid">{S.trainingPlans.map(p => <article className="card" key={p.id}><Field label="Workout plan name"><input className="input" maxLength={100} value={p.name} onChange={e => update(s => { s.trainingPlans.find(x => x.id === p.id).name = e.target.value })} /></Field><p className="small muted">{p.routines.length} {t('routines')} · {Object.values(p.week).filter(Boolean).length} {t('days / week')}</p>{p.id === S.activeTrainingPlanId && <span className="tag acc">{t('Active — edit routines below')}</span>}<div className="planner-tabs"><button className="btn" disabled={p.id === S.activeTrainingPlanId || !!S.active} onClick={() => activate(p.id)}>{t('Activate')}</button><button className="btn ghost" onClick={() => update(s => saveTrainingPlan(s, { ...p, name: p.name + ' (copy)' }, uid()))}>{t('Duplicate')}</button><button className="btn ghost danger" disabled={p.id === S.activeTrainingPlanId} onClick={() => { if (window.confirm(t('Delete this saved plan? Workout history will be kept. This cannot be undone.'))) update(s => { s.trainingPlans = s.trainingPlans.filter(x => x.id !== p.id) }) }}>{t('Delete')}</button></div></article>)}</div><p className="small muted">{t('Activate a saved plan to edit its routines or share it. The previous plan stays saved; logged workouts are never removed. Finish an active workout before switching.')}</p></details>}
  </section>
}
