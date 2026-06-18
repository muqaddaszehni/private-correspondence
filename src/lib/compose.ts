// ---------------------------------------------------------------------------
// composeCorrespondence — turns a brief into three letters + cultural checks.
//
// • If the brief matches one of the three worked examples, the hand-quality
//   letters shipped in src/data/briefs.ts are returned verbatim.
// • For any OTHER (edited / custom) brief, the rules engine runs live:
//   salutations, valedictions, dates, festival greetings and number checks
//   are all generated here, the English body is drafted from the key points,
//   and the Chinese bodies are marked as awaiting the live translation API.
//
//   The single place a real translation service plugs in is translateViaApi()
//   at the foot of this file. It is intentionally inert in the demo so the app
//   runs with no API key and no network.
// ---------------------------------------------------------------------------

import { briefs } from '../data/briefs'
import { sender } from '../data/profile'
import type { BriefInput, Composition, Letter } from './types'
import {
  buildChecks,
  closingEn,
  closingHans,
  closingHant,
  festivalGreeting,
  salutationEn,
  salutationHans,
  salutationHant,
  toEnglishDate,
  toSimplifiedDate,
  toTraditionalDate,
} from './honorifics'

const sigEn = [sender.name, sender.titleEn, `${sender.bankEn}, Genève · Hong Kong`]
const sigHant = [`${sender.name}　敬上`, sender.titleZhHant, sender.bankZhHant]
const sigHans = [`${sender.name}　敬上`, sender.titleZhHans, sender.bankZhHans]

export function sameInput(a: BriefInput, b: BriefInput): boolean {
  return (
    a.recipientName === b.recipientName &&
    a.recipientNameZhHant === b.recipientNameZhHant &&
    a.recipientNameZhHans === b.recipientNameZhHans &&
    a.title === b.title &&
    a.surname === b.surname &&
    a.relationship === b.relationship &&
    a.occasion === b.occasion &&
    a.keyPoints.length === b.keyPoints.length &&
    a.keyPoints.every((p, i) => p.trim() === b.keyPoints[i]?.trim())
  )
}

// --- Live English drafting from the structured brief -----------------------

function openingEn(input: BriefInput): string {
  switch (input.occasion) {
    case 'lunar-new-year':
      return 'As the new year approaches, I write to extend my warmest wishes to you and your family.'
    case 'meeting-follow-up':
      return 'Thank you for taking the time to meet with me. It was a pleasure to discuss your objectives in such depth.'
    case 'condolence':
      return 'Please accept my heartfelt condolences. My thoughts, and those of the bank, are with you and your family at this most difficult time.'
    case 'portfolio-update':
    default:
      return 'I hope this letter finds you and your family in good health.'
  }
}

function lowerFirst(s: string): string {
  const t = s.trim()
  return t ? t[0].toLowerCase() + t.slice(1) : t
}

function bodyEn(input: BriefInput): string[] {
  const paras: string[] = [openingEn(input)]
  const points = input.keyPoints.map((p) => p.trim()).filter(Boolean)
  if (points.length) {
    const joined = points.map(lowerFirst).join('; ')
    paras.push(`By way of summary, I should like to set out the following: ${joined}.`)
  }
  const fest = festivalGreeting(input.occasion)
  if (fest) {
    paras.push(
      `In keeping with the spirit of the season, may fortune reach you from all eight directions. Wishing you a prosperous and auspicious New Year — ${fest.en}.`,
    )
  } else {
    paras.push(
      'Please do not hesitate to contact me should you wish to discuss any of the above. Thank you, as always, for the confidence you place in our partnership.',
    )
  }
  return paras
}

// --- Builders --------------------------------------------------------------

function customComposition(input: BriefInput, today: Date): Composition {
  const en: Letter = {
    lang: 'en',
    label: 'English',
    sublabel: 'English · Hong Kong',
    bodyClass: 'letter-en',
    dateLine: toEnglishDate(today),
    dateAtTop: true,
    salutation: salutationEn(input),
    paragraphs: bodyEn(input),
    closing: closingEn(input.occasion),
    signature: sigEn,
  }

  // For a custom brief the Chinese conventions are built live; only the prose
  // body awaits translation, so the panel is flagged `pending`.
  const hant: Letter = {
    lang: 'zh-Hant',
    label: '繁體中文',
    sublabel: 'Traditional Chinese · 香港',
    bodyClass: 'letter-tc',
    dateLine: toTraditionalDate(today),
    dateAtTop: false,
    salutation: salutationHant(input),
    paragraphs: [],
    closing: closingHant(input.occasion),
    signature: sigHant,
    pending: true,
  }

  const hans: Letter = {
    lang: 'zh-Hans',
    label: '简体中文',
    sublabel: 'Simplified Chinese',
    bodyClass: 'letter-sc',
    dateLine: toSimplifiedDate(today),
    dateAtTop: false,
    salutation: salutationHans(input),
    paragraphs: [],
    closing: closingHans(input.occasion),
    signature: sigHans,
    pending: true,
  }

  return { en, 'zh-Hant': hant, 'zh-Hans': hans, checks: buildChecks(input) }
}

export interface ComposeResult {
  composition: Composition
  /** true when one of the three worked examples was returned verbatim. */
  worked: boolean
}

export function composeCorrespondence(input: BriefInput, today: Date = new Date()): ComposeResult {
  const match = briefs.find((b) => sameInput(b.input, input))
  if (match) return { composition: match.composition, worked: true }
  return { composition: customComposition(input, today), worked: false }
}

// ===========================================================================
// OPTIONAL — live translation hook.
//
// The demo ships with hand-written translations, so nothing below runs. To
// translate arbitrary briefs at runtime, implement this function against your
// provider of choice and call it from customComposition() to fill the Chinese
// `paragraphs` (dropping the `pending` flag). The cultural rules above would
// continue to supply salutations, valedictions, dates and number checks; the
// model only needs to render the body prose.
//
// Example wiring with the Anthropic Messages API (pseudo-code):
//
//   const text = await translateViaApi(englishBody, 'zh-Hant', {
//     register: input.relationship,
//     occasion: input.occasion,
//   })
//
// where the system prompt instructs the model to write at private-banking
// formality, preserve honorifics, prefer auspicious numbers and avoid the
// number four, and use Hong Kong Traditional conventions for 'zh-Hant'.
// ===========================================================================
export async function translateViaApi(
  _englishBody: string[],
  _target: 'zh-Hant' | 'zh-Hans',
  _context: { register: string; occasion: string },
): Promise<string[]> {
  // Intentionally not implemented in the demo — no network, no API key.
  //
  //   const res = await fetch('https://api.anthropic.com/v1/messages', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
  //       'anthropic-version': '2023-06-01',
  //     },
  //     body: JSON.stringify({
  //       model: 'claude-opus-4-8',
  //       max_tokens: 1500,
  //       system: buildTranslationSystemPrompt(_target, _context),
  //       messages: [{ role: 'user', content: _englishBody.join('\n\n') }],
  //     }),
  //   })
  //   const data = await res.json()
  //   return data.content[0].text.split('\n\n')
  throw new Error('translateViaApi is a stub. Implement it to enable live translation.')
}
