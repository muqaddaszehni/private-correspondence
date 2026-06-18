import type { CulturalCheck } from '../lib/types'

const STATUS: Record<CulturalCheck['status'], { tick: string; ring: string; word: string }> = {
  applied: { tick: 'bg-brass', ring: 'border-brass', word: 'Applied' },
  avoided: { tick: 'bg-navy', ring: 'border-navy', word: 'Avoided' },
  note: { tick: 'bg-transparent', ring: 'border-ink/40', word: 'Note' },
}

function Mark({ status }: { status: CulturalCheck['status'] }) {
  const s = STATUS[status]
  return (
    <span className={'mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ' + s.ring}>
      <span className={'h-1.5 w-1.5 rounded-full ' + s.tick} />
    </span>
  )
}

export function CulturalChecks({ checks }: { checks: CulturalCheck[] }) {
  return (
    <aside className="border border-hairline bg-bone/70 shadow-card">
      <div className="border-b border-hairline px-5 py-4">
        <div className="label">Cultural Checks</div>
        <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink/55">
          The conventions observed in this correspondence, and the pitfalls consciously avoided.
        </p>
      </div>
      <ul className="divide-y divide-hairline">
        {checks.map((c, i) => (
          <li key={i} className="px-5 py-4">
            <div className="flex items-start gap-3">
              <Mark status={c.status} />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="label-muted">{c.category}</span>
                  <span
                    className={
                      'font-sans text-[9.5px] uppercase tracking-label ' +
                      (c.status === 'note' ? 'text-ink/35' : 'text-brass-deep')
                    }
                  >
                    · {STATUS[c.status].word}
                  </span>
                </div>
                <div className="mt-1 font-serif text-[17px] leading-snug text-navy">{c.title}</div>
                <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-ink/65">{c.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
