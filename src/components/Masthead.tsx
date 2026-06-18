import { sender } from '../data/profile'
import { toEnglishDate } from '../lib/honorifics'

export function Masthead({ today }: { today: Date }) {
  return (
    <header className="rise">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="label">{sender.bankEn} · Bureau Privé</div>
          <h1 className="font-serif text-[2.4rem] sm:text-[3rem] leading-[1.02] mt-2 text-navy">
            Private Correspondence
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink/55">
            Composing client letters in English, Traditional Chinese (Hong Kong) and Simplified Chinese —
            at private-banking formality, with the cultural conventions observed.
          </p>
        </div>
        <div className="hidden sm:block text-right shrink-0">
          <div className="label-muted">Genève · Hong Kong</div>
          <div className="font-serif text-2xl text-navy mt-1">Est. 1869</div>
          <div className="label-muted mt-3">{toEnglishDate(today)}</div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-hairline" />
        <span className="block h-1 w-1 rotate-45 bg-brass" />
        <span className="h-px flex-1 bg-hairline" />
      </div>
    </header>
  )
}
