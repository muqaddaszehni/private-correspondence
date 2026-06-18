// ---------------------------------------------------------------------------
// The cultural & formality rules engine.
//
// Everything here is rule-based and runs live for ANY brief — salutations,
// honorifics, valedictions, date formatting in three conventions, festival
// greetings, and the auspicious / inauspicious number checks. Only the free
// prose body of a letter requires translation (see compose.ts); the
// conventions below do not.
// ---------------------------------------------------------------------------

import type { BriefInput, CulturalCheck, Occasion, Relationship } from './types'

export const OCCASIONS: { id: Occasion; label: string; zh: string }[] = [
  { id: 'portfolio-update', label: 'Portfolio update', zh: '投資組合匯報' },
  { id: 'lunar-new-year', label: 'Lunar New Year greeting', zh: '農曆新年賀辭' },
  { id: 'meeting-follow-up', label: 'Meeting follow-up', zh: '會晤跟進' },
  { id: 'condolence', label: 'Condolence', zh: '慰唁' },
]

export const RELATIONSHIPS: { id: Relationship; label: string; note: string }[] = [
  { id: 'established-formal', label: 'Established client — high formality', note: 'Long-standing relationship; highest deference.' },
  { id: 'new-formal', label: 'Newly onboarded — formal', note: 'Recently onboarded; correct and reserved.' },
  { id: 'cordial', label: 'Cordial — warm, professional', note: 'Warm familiarity within professional bounds.' },
]

export const TITLES: BriefInput['title'][] = ['Mr.', 'Mrs.', 'Ms.', 'Madam', 'Dr.', 'Mr. & Mrs.']

// --- Date conventions -------------------------------------------------------

const CN_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function cnYear(year: number): string {
  return String(year)
    .split('')
    .map((d) => CN_DIGITS[Number(d)])
    .join('')
}

function cnUpTo99(n: number): string {
  if (n <= 10) return n === 10 ? '十' : CN_DIGITS[n]
  if (n < 20) return '十' + (n % 10 === 0 ? '' : CN_DIGITS[n % 10])
  const tens = Math.floor(n / 10)
  const ones = n % 10
  return CN_DIGITS[tens] + '十' + (ones === 0 ? '' : CN_DIGITS[ones])
}

/** "8 July 2026" — day-month-year, Hong Kong usage. */
export function toEnglishDate(d: Date): string {
  return `${d.getDate()} ${EN_MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

/** "二〇二六年七月八日" — the most formal Traditional rendering. */
export function toTraditionalDate(d: Date): string {
  return `${cnYear(d.getFullYear())}年${cnUpTo99(d.getMonth() + 1)}月${cnUpTo99(d.getDate())}日`
}

/** "2026年7月8日" — standard Simplified rendering. */
export function toSimplifiedDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// --- Salutations ------------------------------------------------------------

export function salutationEn(input: BriefInput): string {
  return `Dear ${input.title} ${input.surname},`
}

export function salutationHant(input: BriefInput): string {
  // Classical honorific salutation: name + 台鑒 ("for your esteemed attention").
  return `${input.recipientNameZhHant} 台鑒：`
}

export function salutationHans(input: BriefInput): string {
  // Modern standard formal: 尊敬的 + name.
  return `尊敬的${input.recipientNameZhHans}：`
}

// --- Valedictions -----------------------------------------------------------

export function closingEn(occasion: Occasion): string[] {
  if (occasion === 'lunar-new-year') return ['With my warmest wishes for the season,']
  if (occasion === 'condolence') return ['With my deepest sympathy,']
  return ['With my warmest regards,']
}

export function closingHant(occasion: Occasion): string[] {
  if (occasion === 'lunar-new-year') return ['順頌', '　　新春大吉']
  if (occasion === 'condolence') return ['肅此', '　　敬唁']
  return ['順頌', '　　台祺']
}

export function closingHans(occasion: Occasion): string[] {
  if (occasion === 'lunar-new-year') return ['顺颂', '　　新春大吉']
  if (occasion === 'condolence') return ['肃此', '　　敬唁']
  return ['顺颂', '　　商祺']
}

// --- Festival greetings -----------------------------------------------------

export function festivalGreeting(occasion: Occasion): { en: string; zh: string } | null {
  if (occasion !== 'lunar-new-year') return null
  return {
    en: '恭喜發財 · 萬事如意 · 馬到成功',
    zh: '恭喜發財，萬事如意，馬到成功',
  }
}

// --- Number symbolism -------------------------------------------------------

/** Scan free text for the auspicious 8 and the inauspicious 4. */
export function scanNumbers(text: string): { hasEight: boolean; hasFour: boolean } {
  return {
    hasEight: /8|八/.test(text),
    hasFour: /4|四/.test(text),
  }
}

// --- Cultural checks for an arbitrary (custom) brief ------------------------

export function buildChecks(input: BriefInput): CulturalCheck[] {
  const checks: CulturalCheck[] = []
  const allPoints = input.keyPoints.join(' · ')
  const { hasEight, hasFour } = scanNumbers(allPoints)

  checks.push({
    category: 'Salutation & Honorific',
    title: 'Salutations built to convention',
    detail: `English opens “${salutationEn(input)}”. Traditional uses the classical ${salutationHant(
      input,
    )} and the deferential 閣下; Simplified uses ${salutationHans(input)} with 您.`,
    status: 'applied',
  })

  const rel = RELATIONSHIPS.find((r) => r.id === input.relationship)
  checks.push({
    category: 'Register & Tone',
    title: 'Formality matched to the relationship',
    detail: `Register set for: ${rel?.label ?? 'formal'}. ${rel?.note ?? ''} The tone stays restrained — measured rather than effusive.`,
    status: 'applied',
  })

  if (input.occasion === 'lunar-new-year') {
    checks.push({
      category: 'Festival & Occasion',
      title: 'Festival idioms applied',
      detail:
        'Lunar New Year greetings draw on the canonical four-character blessings — 恭喜發財, 萬事如意, 馬到成功 — and extend the wishes to the whole household (闔家 / 阖府).',
      status: 'applied',
    })
  }

  if (hasEight) {
    checks.push({
      category: 'Numbers & Symbolism',
      title: 'An auspicious eight is present',
      detail:
        'A key point references 8 (八) — the most auspicious numeral, a near-homophone of 發 (“to prosper”). Worth foregrounding.',
      status: 'applied',
    })
  }

  if (hasFour) {
    checks.push({
      category: 'Numbers & Symbolism',
      title: 'Caution: the number four appears',
      detail:
        'A key point references 4 (四), a homophone of 死 (“death”). Consider rephrasing — e.g. “a quarter” instead of “four”, or rounding to an eight-bearing figure.',
      status: 'note',
    })
  } else {
    checks.push({
      category: 'Numbers & Symbolism',
      title: 'The number four is absent',
      detail: 'No reliance on 4 (四), the figure most carefully avoided in Chinese correspondence.',
      status: 'avoided',
    })
  }

  checks.push({
    category: 'Date & Format',
    title: 'Date placed by convention',
    detail:
      'English carries the date in the letterhead (day-month-year). Both Chinese letters place it beneath the signature; the Traditional edition uses full Chinese numerals.',
    status: 'applied',
  })

  return checks
}
