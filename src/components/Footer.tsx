import { sender } from '../data/profile'

export function Footer() {
  return (
    <footer className="mt-4">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-hairline" />
        <span className="block h-1 w-1 rotate-45 bg-brass" />
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <div className="flex flex-col items-center gap-1.5 pb-10 text-center">
        <div className="font-serif text-lg text-navy">{sender.bankEn}</div>
        <div className="label-muted">{sender.establishedLine}</div>
        <div className="mt-2 font-sans text-[11px] italic text-ink/45">
          Illustrative demo — fictional data. Not financial advice or genuine client correspondence.
        </div>
      </div>
    </footer>
  )
}
