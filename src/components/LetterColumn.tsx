import { useState } from 'react'
import type { Letter } from '../lib/types'

function toPlainText(letter: Letter): string {
  const lines: string[] = []
  if (letter.dateAtTop) lines.push(letter.dateLine, '')
  lines.push(letter.salutation, '')
  if (letter.pending) {
    lines.push('〔正文待翻譯服務生成〕', '')
  } else {
    letter.paragraphs.forEach((p) => lines.push(p, ''))
  }
  lines.push(...letter.closing, '')
  lines.push(...letter.signature)
  if (!letter.dateAtTop) lines.push('', letter.dateLine)
  return lines.join('\n')
}

function CopyButton({ letter }: { letter: Letter }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(letter))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button
      onClick={copy}
      className={
        'inline-flex items-center gap-1.5 border px-3 py-1.5 font-sans text-[10.5px] font-medium uppercase tracking-label transition-colors ' +
        (copied
          ? 'border-brass bg-brass text-ivory'
          : 'border-hairline text-ink/55 hover:border-navy hover:text-navy')
      }
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function LetterColumn({ letter }: { letter: Letter }) {
  const indent = letter.lang === 'en' ? undefined : { textIndent: '2em' }
  return (
    <article className="flex flex-col border border-hairline bg-bone shadow-card">
      {/* letterhead accent */}
      <span className="block h-[2px] w-full bg-brass/70" />

      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-6 py-4">
        <div>
          <div className={(letter.lang === 'en' ? 'font-serif' : letter.bodyClass) + ' text-xl leading-none text-navy'}>
            {letter.label}
          </div>
          <div className="label-muted mt-1.5">{letter.sublabel}</div>
        </div>
        <CopyButton letter={letter} />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col px-6 py-6">
        {letter.dateAtTop && <div className="label-muted mb-5 text-right">{letter.dateLine}</div>}

        <p className={letter.bodyClass + ' text-ink'}>{letter.salutation}</p>

        {letter.pending ? (
          <PendingBody />
        ) : (
          <div className="mt-4 space-y-4">
            {letter.paragraphs.map((p, i) => (
              <p key={i} className={letter.bodyClass + ' text-ink'} style={indent}>
                {p}
              </p>
            ))}
          </div>
        )}

        {/* valediction */}
        <div className={'mt-6 ' + (letter.pending ? 'opacity-55' : '')}>
          {letter.closing.map((c, i) => (
            <p key={i} className={letter.bodyClass + ' text-ink whitespace-pre'}>
              {c}
            </p>
          ))}
        </div>

        {/* signature */}
        <div className={'mt-3 ' + (letter.pending ? 'opacity-55' : '')}>
          <p className={letter.bodyClass + ' text-navy'}>{letter.signature[0]}</p>
          {letter.signature.slice(1).map((s, i) => (
            <p key={i} className="font-sans text-xs leading-relaxed text-ink/55">
              {s}
            </p>
          ))}
        </div>

        <div className="flex-1" />

        {!letter.dateAtTop && (
          <div className={(letter.bodyClass || '') + ' mt-6 text-right text-sm text-ink/55 ' + (letter.pending ? 'opacity-55' : '')}>
            {letter.dateLine}
          </div>
        )}
      </div>
    </article>
  )
}

function PendingBody() {
  return (
    <div className="mt-4 border border-dashed border-hairline bg-ivory/70 px-5 py-5">
      <div className="label text-brass-deep">Live translation</div>
      <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink/65">
        The salutation, valediction, signature and date have been built live by the cultural-rules engine.
        Rendering the body prose for a custom brief is the one step that calls a translation service — wired
        in <span className="font-medium text-navy">compose.ts → translateViaApi()</span> and intentionally
        inert in this demo (no API key, no network).
      </p>
      <p className="mt-3 font-sans text-xs text-ink/45">
        Select one of the three worked scenarios above to see complete, hand-written letters.
      </p>
    </div>
  )
}
