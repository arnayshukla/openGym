import { t } from '../lib/i18n.js'
export function Field({ label, children }) { return <label className="planner-field"><span>{t(label)}</span>{children}</label> }
export function Select({ label, value, onChange, options }) { return <Field label={label}><select className="input" value={value} onChange={e => onChange(e.target.value)}>{options.map(o => { const [v, text] = Array.isArray(o) ? o : [o, o || 'All']; return <option key={v} value={v}>{t(text)}</option> })}</select></Field> }
export function Check({ label, checked, onChange }) { return <label className="planner-check"><input type="checkbox" checked={!!checked} onChange={e => onChange(e.target.checked)} />{t(label)}</label> }
export function Choices({ label, values = [], options, onChange }) { return <fieldset className="planner-choices"><legend>{t(label)}</legend>{options.map(o => <Check key={o} label={o} checked={values.includes(o)} onChange={on => onChange(on ? [...values, o] : values.filter(v => v !== o))} />)}</fieldset> }
export function ErrorNotice({ error }) { return error ? <p className="planner-error" role="alert">{error}</p> : null }
