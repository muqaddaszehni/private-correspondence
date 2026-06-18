// ---------------------------------------------------------------------------
// Domain types for Private Correspondence.
// ---------------------------------------------------------------------------

export type Lang = 'en' | 'zh-Hant' | 'zh-Hans'

export type Occasion =
  | 'portfolio-update'
  | 'lunar-new-year'
  | 'meeting-follow-up'
  | 'condolence'

export type Relationship =
  | 'established-formal' // long-standing client, highest deference
  | 'new-formal' // newly onboarded, formal
  | 'cordial' // warm but still professional

export interface BriefInput {
  /** Display name in English, e.g. "Mr. Lawrence Cheung". */
  recipientName: string
  /** Honorific token used to build salutations for custom briefs. */
  title: 'Mr.' | 'Mrs.' | 'Ms.' | 'Madam' | 'Dr.' | 'Mr. & Mrs.'
  /** Family name only, e.g. "Cheung" — used for the English salutation. */
  surname: string
  /** Recipient's name in Traditional characters, e.g. "張立倫先生". */
  recipientNameZhHant: string
  /** Recipient's name in Simplified characters, e.g. "张立伦先生". */
  recipientNameZhHans: string
  relationship: Relationship
  occasion: Occasion
  keyPoints: string[]
}

/** One flagged cultural / formality convention, shown in the sidebar. */
export interface CulturalCheck {
  /** Small-caps category label, e.g. "Numbers & Symbolism". */
  category: string
  title: string
  detail: string
  /** applied = convention honoured; avoided = pitfall consciously sidestepped; note = advisory. */
  status: 'applied' | 'avoided' | 'note'
}

/** A fully composed letter in a single language. */
export interface Letter {
  lang: Lang
  /** Panel heading, e.g. "繁體中文 · 香港". */
  label: string
  /** English sub-label, e.g. "Traditional Chinese". */
  sublabel: string
  /** Tailwind / css class controlling the body typeface. */
  bodyClass: string
  dateLine: string
  /** English letters carry the date at the top; Chinese letters below the signature. */
  dateAtTop: boolean
  salutation: string
  paragraphs: string[]
  /** Valediction lines, e.g. ["順頌", "　　台祺"]. */
  closing: string[]
  /** Signature block lines, e.g. ["Maximilian Roth", "Senior Relationship Manager", …]. */
  signature: string[]
  /** When true the body is awaiting a live-translation API; rendered as a notice. */
  pending?: boolean
}

export interface Composition {
  en: Letter
  'zh-Hant': Letter
  'zh-Hans': Letter
  checks: CulturalCheck[]
}

export interface PerfPoint {
  month: string
  value: number
}

export interface Brief {
  id: string
  /** Short scenario title for the selector. */
  title: string
  /** One-line description for the selector card. */
  blurb: string
  input: BriefInput
  composition: Composition
  /** Optional illustrative data (e.g. a performance snapshot for the chart). */
  snapshot?: PerfPoint[]
}

export interface SenderProfile {
  name: string
  titleEn: string
  titleZhHant: string
  titleZhHans: string
  bankEn: string
  bankZhHant: string
  bankZhHans: string
  establishedLine: string
}
