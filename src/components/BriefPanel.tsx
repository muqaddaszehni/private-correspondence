import type { Brief, BriefInput } from '../lib/types'
import { OCCASIONS, RELATIONSHIPS, TITLES } from '../lib/honorifics'
import { FieldLabel, Select, TextInput } from './ui'

interface Props {
  briefs: Brief[]
  selectedId: string
  value: BriefInput
  dirty: boolean
  onSelect: (id: string) => void
  onChange: (next: BriefInput) => void
  onCompose: () => void
}

export function BriefPanel({ briefs, selectedId, value, dirty, onSelect, onChange, onCompose }: Props) {
  const set = (patch: Partial<BriefInput>) => onChange({ ...value, ...patch })
  const setPoint = (i: number, v: string) =>
    set({ keyPoints: value.keyPoints.map((p, idx) => (idx === i ? v : p)) })
  const addPoint = () => set({ keyPoints: [...value.keyPoints, ''] })
  const removePoint = (i: number) => set({ keyPoints: value.keyPoints.filter((_, idx) => idx !== i) })

  return (
    <section className="border border-hairline bg-bone/70 shadow-card">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="label">The Brief</span>
          <span className="text-ink/30">—</span>
          <span className="font-sans text-xs text-ink/50">Choose a scenario, then refine as you wish</span>
        </div>
        <div className="flex items-center gap-3">
          {dirty ? (
            <span className="label-muted text-brass-deep">Edited — recompose</span>
          ) : (
            <span className="label-muted">Composed</span>
          )}
          <button
            onClick={onCompose}
            className="group inline-flex items-center gap-2 bg-navy px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-label text-ivory transition-colors hover:bg-navy/90"
          >
            Compose Correspondence
            <span className="block h-1 w-1 rotate-45 bg-brass transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* scenario cards */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-5 sm:grid-cols-3">
        {briefs.map((b) => {
          const active = b.id === selectedId
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b.id)}
              className={
                'group relative overflow-hidden border px-4 py-4 text-left transition-all ' +
                (active
                  ? 'border-navy bg-ivory shadow-card'
                  : 'border-hairline bg-bone hover:border-brass/60')
              }
            >
              <span
                className={
                  'absolute left-0 top-0 h-full w-[3px] transition-colors ' +
                  (active ? 'bg-brass' : 'bg-transparent group-hover:bg-brass/40')
                }
              />
              <span className="label-muted">{occasionLabel(b)}</span>
              <span className="mt-1.5 block font-serif text-xl leading-tight text-navy">{b.title}</span>
              <span className="mt-1.5 block font-sans text-xs leading-relaxed text-ink/55">{b.blurb}</span>
            </button>
          )
        })}
      </div>

      {/* fields */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-6 pb-6 pt-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <FieldLabel>Recipient</FieldLabel>
          <TextInput value={value.recipientName} onChange={(e) => set({ recipientName: e.target.value })} />
        </div>
        <div className="lg:col-span-2">
          <FieldLabel>Honorific</FieldLabel>
          <Select
            value={value.title}
            onChange={(e) => set({ title: e.target.value as BriefInput['title'] })}
          >
            {TITLES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div className="lg:col-span-3">
          <FieldLabel>Family name (English)</FieldLabel>
          <TextInput value={value.surname} onChange={(e) => set({ surname: e.target.value })} />
        </div>
        <div className="lg:col-span-3" />

        <div className="lg:col-span-3">
          <FieldLabel>Recipient · 繁體</FieldLabel>
          <TextInput
            className="font-tc"
            value={value.recipientNameZhHant}
            onChange={(e) => set({ recipientNameZhHant: e.target.value })}
          />
        </div>
        <div className="lg:col-span-3">
          <FieldLabel>Recipient · 简体</FieldLabel>
          <TextInput
            className="font-sc"
            value={value.recipientNameZhHans}
            onChange={(e) => set({ recipientNameZhHans: e.target.value })}
          />
        </div>
        <div className="lg:col-span-3">
          <FieldLabel>Relationship & formality</FieldLabel>
          <Select
            value={value.relationship}
            onChange={(e) => set({ relationship: e.target.value as BriefInput['relationship'] })}
          >
            {RELATIONSHIPS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="lg:col-span-3">
          <FieldLabel>Occasion</FieldLabel>
          <Select
            value={value.occasion}
            onChange={(e) => set({ occasion: e.target.value as BriefInput['occasion'] })}
          >
            {OCCASIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>

        {/* key points */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between">
            <FieldLabel>Key points</FieldLabel>
            <button
              onClick={addPoint}
              className="font-sans text-[11px] uppercase tracking-label text-brass-deep hover:text-navy"
            >
              + Add point
            </button>
          </div>
          <div className="space-y-2">
            {value.keyPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-serif text-sm text-brass-deep w-5 text-right tabular-nums">{i + 1}</span>
                <TextInput value={p} onChange={(e) => setPoint(i, e.target.value)} />
                <button
                  onClick={() => removePoint(i)}
                  aria-label="Remove point"
                  className="shrink-0 border border-hairline px-2.5 py-2 font-sans text-xs text-ink/40 transition-colors hover:border-brass/60 hover:text-navy"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function occasionLabel(b: Brief): string {
  return OCCASIONS.find((o) => o.id === b.input.occasion)?.label ?? 'Letter'
}
