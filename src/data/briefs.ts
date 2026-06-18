import type { Brief, Letter } from '../lib/types'
import { sender } from './profile'

// ---------------------------------------------------------------------------
// Three fully worked briefs with hand-quality translations.
//
// Each letter is genuine private-banking correspondence. The Traditional and
// Simplified editions are NOT character-for-character conversions of one
// another: they differ in register as a Hong Kong banker's correspondence
// actually would. The Traditional letters use classical epistolary
// conventions (台鑒 salutation, the deferential 閣下, 順頌台祺 valediction,
// dates in Chinese numerals); the Simplified letters use modern standard
// formal Mandarin (尊敬的…, 您, 顺颂商祺).
// ---------------------------------------------------------------------------

const sigEn = [sender.name, sender.titleEn, `${sender.bankEn}, Genève · Hong Kong`]
const sigHant = [`${sender.name}　敬上`, sender.titleZhHant, sender.bankZhHant]
const sigHans = [`${sender.name}　敬上`, sender.titleZhHans, sender.bankZhHans]

const labels = {
  en: { label: 'English', sublabel: 'English · Hong Kong', bodyClass: 'letter-en' },
  hant: { label: '繁體中文', sublabel: 'Traditional Chinese · 香港', bodyClass: 'letter-tc' },
  hans: { label: '简体中文', sublabel: 'Simplified Chinese', bodyClass: 'letter-sc' },
}

// Small constructors keep the data below readable.
function en(p: Partial<Letter> & Pick<Letter, 'salutation' | 'paragraphs' | 'closing' | 'dateLine'>): Letter {
  return {
    lang: 'en',
    ...labels.en,
    dateAtTop: true,
    signature: sigEn,
    ...p,
  }
}
function hant(p: Partial<Letter> & Pick<Letter, 'salutation' | 'paragraphs' | 'closing' | 'dateLine'>): Letter {
  return {
    lang: 'zh-Hant',
    ...labels.hant,
    dateAtTop: false,
    signature: sigHant,
    ...p,
  }
}
function hans(p: Partial<Letter> & Pick<Letter, 'salutation' | 'paragraphs' | 'closing' | 'dateLine'>): Letter {
  return {
    lang: 'zh-Hans',
    ...labels.hans,
    dateAtTop: false,
    signature: sigHans,
    ...p,
  }
}

// ===========================================================================
// 1 — Portfolio update (established client, highest formality)
// ===========================================================================
const portfolioUpdate: Brief = {
  id: 'portfolio-update',
  title: 'Half-Year Portfolio Review',
  blurb: 'A measured H1 performance note to a long-standing client, proposing a review meeting.',
  input: {
    recipientName: 'Mr. Lawrence Cheung',
    title: 'Mr.',
    surname: 'Cheung',
    recipientNameZhHant: '張立倫先生',
    recipientNameZhHans: '张立伦先生',
    relationship: 'established-formal',
    occasion: 'portfolio-update',
    keyPoints: [
      'Portfolio returned 6.8% over the first half of the year',
      'Increased allocation to Asian investment-grade credit',
      'Modestly reduced portfolio duration to limit rate sensitivity',
      'Maintained exposure to global quality equities',
      'Propose a review meeting for second-half objectives',
    ],
  },
  snapshot: [
    { month: 'Jan', value: 1.2 },
    { month: 'Feb', value: 2.1 },
    { month: 'Mar', value: 1.6 },
    { month: 'Apr', value: 3.4 },
    { month: 'May', value: 5.0 },
    { month: 'Jun', value: 6.8 },
  ],
  composition: {
    en: en({
      dateLine: '8 July 2026',
      salutation: 'Dear Mr. Cheung,',
      paragraphs: [
        'I hope this letter finds you and your family in good health.',
        'I am writing to share a brief review of your portfolio for the first half of the year. Against a backdrop of shifting interest-rate expectations, your holdings have performed with composure, returning 6.8 per cent over the period.',
        'During the second quarter we made two measured adjustments on your behalf. We increased your allocation to Asian investment-grade credit, where yields remain attractive relative to risk, and we modestly reduced portfolio duration to limit sensitivity to further movements in rates. Your exposure to global quality equities was maintained, consistent with our long-held conviction in well-capitalised, dividend-paying enterprises.',
        'We continue to favour a patient and disciplined approach. Should it be convenient, I would welcome the opportunity to meet at your office to discuss your objectives for the second half of the year in greater detail.',
        'Thank you, as always, for the confidence you place in our partnership. Please do not hesitate to contact me should any questions arise in the meantime.',
      ],
      closing: ['With my warmest regards,'],
    }),
    'zh-Hant': hant({
      dateLine: '二〇二六年七月八日',
      salutation: '張立倫先生 台鑒：',
      paragraphs: [
        '展信問候，敬祝 台安。',
        '謹此向 閣下簡要匯報上半年度之投資組合表現。於利率預期反覆之市況下，閣下的投資組合表現穩健，期內錄得百分之六點八的回報。',
        '第二季度內，本人謹代表 閣下作出兩項審慎之調整：增持亞洲投資級別信貸，蓋因其收益相對風險仍具吸引力；並適度縮短組合之存續期，以降低對利率進一步波動的敏感度。同時維持環球優質股票之配置，秉持本行對資本充裕、穩定派息企業之長期信念。',
        '本行一貫主張審慎而有紀律之投資態度。倘蒙俯允，本人懇切期盼能親赴 貴公司與 閣下會晤，就下半年之投資目標作更深入之商討。',
        '一如既往，感謝 閣下對本行夥伴關係之信賴。其間如蒙垂詢，敬請隨時與本人聯絡。',
      ],
      closing: ['順頌', '　　台祺'],
    }),
    'zh-Hans': hans({
      dateLine: '2026年7月8日',
      salutation: '尊敬的张立伦先生：',
      paragraphs: [
        '谨致问候，并祝您安康。',
        '兹向您简要汇报上半年度的投资组合表现。在利率预期反复的市况下，您的投资组合表现稳健，期内录得百分之六点八的回报。',
        '第二季度内，我们谨代表您作出两项审慎调整：增持亚洲投资级别信贷，因其收益相对风险仍具吸引力；并适度缩短组合久期，以降低对利率进一步波动的敏感度。同时维持环球优质股票的配置，秉持本行对资本充裕、稳定派息企业的长期信念。',
        '本行一贯主张审慎而有纪律的投资理念。如蒙应允，本人诚挚期盼能亲赴贵公司与您会面，就下半年的投资目标作更深入的商讨。',
        '一如既往，感谢您对本行伙伴关系的信赖。其间如有任何垂询，敬请随时与本人联系。',
      ],
      closing: ['顺颂', '　　商祺'],
    }),
    checks: [
      {
        category: 'Salutation & Honorific',
        title: 'Classical vs. modern deference',
        detail:
          'The Traditional letter opens with the classical honorific salutation 台鑒 and addresses the client throughout as 閣下, the most deferential form. The Simplified letter uses the modern standard 尊敬的…先生 with 您.',
        status: 'applied',
      },
      {
        category: 'Register & Tone',
        title: 'Composure, not salesmanship',
        detail:
          'An elevated, restrained register suited to a long-standing relationship. Performance is framed with measured composure (穩健 / 稳健) rather than triumph — discretion is the house style.',
        status: 'applied',
      },
      {
        category: 'Numbers & Symbolism',
        title: 'A figure ending in eight',
        detail:
          'The half-year return, 6.8%, ends in 8 (八) — an auspicious figure connoting prosperity, a near-homophone of 發 (“to flourish”).',
        status: 'applied',
      },
      {
        category: 'Numbers & Symbolism',
        title: 'The number four is absent',
        detail:
          'Nowhere does the letter rest on the number 4 (四), a homophone of 死 (“death”) and the figure most carefully avoided in Chinese correspondence.',
        status: 'avoided',
      },
      {
        category: 'Date & Format',
        title: 'Date placed by convention',
        detail:
          'English carries the date in the letterhead, day-month-year per Hong Kong usage. Both Chinese letters set the date beneath the signature, as convention dictates; the Traditional edition renders it in full Chinese numerals — 二〇二六年七月八日.',
        status: 'applied',
      },
      {
        category: 'Valediction',
        title: '順頌 台祺 / 顺颂 商祺',
        detail:
          'Closes with 順頌 台祺 (Traditional) and 顺颂 商祺 (Simplified) — 商祺, “prosperity in your affairs”, being the apt register for a financial relationship — signed 敬上, “respectfully submitted”.',
        status: 'applied',
      },
    ],
  },
}

// ===========================================================================
// 2 — Lunar New Year greeting (Year of the Horse, 2026)
// ===========================================================================
const lunarNewYear: Brief = {
  id: 'lunar-new-year',
  title: 'Lunar New Year Greeting',
  blurb: 'A festival message for the Year of the Horse, extending wishes to the client and his household.',
  input: {
    recipientName: 'Mr. Andrew Chan',
    title: 'Mr.',
    surname: 'Chan',
    recipientNameZhHant: '陳柏豪先生',
    recipientNameZhHans: '陈柏豪先生',
    relationship: 'cordial',
    occasion: 'lunar-new-year',
    keyPoints: [
      'Extend Lunar New Year wishes for the Year of the Horse',
      'Express gratitude for the past year of partnership',
      'Wish the client and his household health, happiness and prosperity',
      'Reaffirm the bank’s long-term stewardship of the family’s interests',
    ],
  },
  composition: {
    en: en({
      dateLine: '8 February 2026',
      salutation: 'Dear Mr. Chan,',
      paragraphs: [
        'As the Year of the Horse approaches, I write to extend my warmest wishes to you and your family for the Lunar New Year.',
        'It has been a privilege to accompany you on your financial journey this past year, and I am deeply grateful for the trust you have placed in our partnership. May the year ahead gallop forward with vigour, bringing you and your household abundant health, happiness and prosperity in equal measure.',
        'In keeping with the spirit of the season, may fortune reach you from all eight directions, and may every endeavour you undertake be met with success. We remain, as ever, devoted to the careful stewardship of your family’s interests for the generations to come.',
        'Wishing you a prosperous and auspicious New Year — 恭喜發財，萬事如意，馬到成功.',
      ],
      closing: ['With my warmest wishes for the season,'],
    }),
    'zh-Hant': hant({
      dateLine: '二〇二六年二月八日',
      salutation: '陳柏豪先生 台鑒：',
      paragraphs: [
        '值此丙午馬年來臨之際，謹向 閣下及府上闔家致以最誠摯之新春祝福。',
        '過去一年承蒙 閣下信賴，本人得以同行於財富管理之路，深感榮幸。願新歲一如駿馬奔騰，氣象萬千，為 閣下闔府帶來豐盛之健康、喜樂與福澤。',
        '值此佳節，敬祝 閣下八方來財，諸事順遂，凡有所謀，皆得善果。本行必當一如既往，竭誠守護 貴府世代相承之福祉。',
        '恭賀新禧，萬事勝意——恭喜發財，身體健康，馬到成功。',
      ],
      closing: ['順頌', '　　新春大吉'],
    }),
    'zh-Hans': hans({
      dateLine: '2026年2月8日',
      salutation: '尊敬的陈柏豪先生：',
      paragraphs: [
        '值此丙午马年来临之际，谨向您及家人致以最诚挚的新春祝福。',
        '过去一年承蒙您的信赖，本人得以同行于财富管理之路，深感荣幸。愿新岁如骏马奔腾，气象万千，为您阖府带来丰盛的健康、喜乐与福气。',
        '值此佳节，敬祝您八方来财，诸事顺遂，凡有所谋，皆得善果。本行必将一如既往，竭诚守护贵府世代相传的福祉。',
        '恭贺新禧，万事胜意——恭喜发财，身体健康，马到成功。',
      ],
      closing: ['顺颂', '　　新春大吉'],
    }),
    checks: [
      {
        category: 'Festival & Occasion',
        title: 'The right idioms for the zodiac year',
        detail:
          'Addressed to the 丙午馬年 — the Year of the Horse (2026) — and signed off with the canonical blessings 恭喜發財 (wishing you prosperity), 萬事如意 / 萬事勝意 (may all go as you wish) and 馬到成功 (success upon arrival), the horse idiom chosen deliberately for the zodiac year.',
        status: 'applied',
      },
      {
        category: 'Numbers & Symbolism',
        title: 'Wealth from all eight directions',
        detail:
          'Invokes 八方來財 — “wealth from all eight directions”. Eight (八) is the most auspicious numeral, echoing 發 (“to prosper”).',
        status: 'applied',
      },
      {
        category: 'Numbers & Symbolism',
        title: 'No four, no endings',
        detail:
          'The greeting avoids the number 4 (四) and any reference to closing, ending or loss — themes held to be inauspicious at the New Year.',
        status: 'avoided',
      },
      {
        category: 'Salutation & Honorific',
        title: 'A blessing for the whole household',
        detail:
          'The wishes extend to 府上闔家 / 阖府 — the entire household — and address the client respectfully as 閣下, befitting a festival message to a valued family.',
        status: 'applied',
      },
      {
        category: 'Colour & Gift',
        title: 'Red and gold, never white',
        detail:
          'A physical card would be presented on red stock with gold foil; white and black are avoided for their funereal associations. Any accompanying red packet (利是) would carry an even, eight-bearing sum — never four.',
        status: 'note',
      },
      {
        category: 'Date & Format',
        title: 'Dated before the festival',
        detail:
          'Dated shortly ahead of the New Year; the Traditional edition sets the date in full Chinese numerals beneath the signature.',
        status: 'applied',
      },
    ],
  },
}

// ===========================================================================
// 3 — Meeting follow-up (estate & succession; academic honorific)
// ===========================================================================
const meetingFollowUp: Brief = {
  id: 'meeting-follow-up',
  title: 'Meeting Follow-Up',
  blurb: 'A follow-up after an estate-planning discussion, confirming agreed actions and next steps.',
  input: {
    recipientName: 'Dr. Eleanor Ng',
    title: 'Dr.',
    surname: 'Ng',
    recipientNameZhHant: '吳嘉敏博士',
    recipientNameZhHans: '吴嘉敏博士',
    relationship: 'established-formal',
    occasion: 'meeting-follow-up',
    keyPoints: [
      'Thank Dr. Ng for the meeting on Tuesday',
      'Agreed to begin preparations for a family trust',
      'Agreed to increase allocation to high-quality fixed income',
      'Reconvene in eight weeks to review progress',
      'Detailed trust proposal to follow by end of next week',
    ],
  },
  composition: {
    en: en({
      dateLine: '18 June 2026',
      salutation: 'Dear Dr. Ng,',
      paragraphs: [
        'Thank you for taking the time to meet with me on Tuesday. It was a pleasure to discuss your objectives in such depth, and I am grateful for your candour regarding your family’s long-term priorities.',
        'To summarise the principal points of our conversation: we agreed to begin preparations for a family trust, so that the orderly continuity of your assets may be assured for those who follow; to increase the allocation to high-quality fixed income within your portfolio; and to reconvene in eight weeks’ time to review our progress together.',
        'I will forward a detailed proposal for the trust arrangement to you by the end of next week, for your consideration. Should any questions arise beforehand, please do not hesitate to contact me directly.',
        'Once again, thank you for your time, and for the continued confidence you place in our partnership.',
      ],
      closing: ['With my warmest regards,'],
    }),
    'zh-Hant': hant({
      dateLine: '二〇二六年六月十八日',
      salutation: '吳嘉敏博士 台鑒：',
      paragraphs: [
        '承蒙 閣下於本週二撥冗會晤，本人深表謝意。得以就 閣下之目標作深入商討，實感榮幸；對於您坦誠分享府上長遠之優先考量，尤為感激。',
        '謹將是次會談之要點略陳如下：雙方議定著手籌備家族信託，俾使 閣下之資產得以有序傳承、澤被後人；於投資組合中增持優質固定收益資產；並訂於八週之後再度會晤，共同檢視進度。',
        '本人謹定於下週末前，將信託安排之詳細建議書呈送 閣下參酌。其間倘有任何疑問，敬請隨時與本人直接聯絡。',
        '再次感謝 閣下撥冗賜見，以及對本行夥伴關係始終如一之信任。',
      ],
      closing: ['順頌', '　　台祺'],
    }),
    'zh-Hans': hans({
      dateLine: '2026年6月18日',
      salutation: '尊敬的吴嘉敏博士：',
      paragraphs: [
        '承蒙您于本周二拨冗会晤，本人深表谢意。得以就您的目标作深入商讨，实感荣幸；对于您坦诚分享家族长远的优先考量，尤为感激。',
        '谨将此次会谈的要点略陈如下：双方议定着手筹备家族信托，俾使您的资产得以有序传承、泽被后人；于投资组合中增持优质固定收益资产；并定于八周之后再度会晤，共同检视进度。',
        '本人谨定于下周末前，将信托安排的详细建议书呈送您参酌。其间如有任何疑问，敬请随时与本人直接联系。',
        '再次感谢您拨冗赐见，以及对本行伙伴关系始终如一的信任。',
      ],
      closing: ['顺颂', '　　商祺'],
    }),
    checks: [
      {
        category: 'Salutation & Honorific',
        title: 'The academic title is preserved',
        detail:
          'The academic honorific 博士 (“Dr.”) is carried in all three languages — an important courtesy. The Traditional letter retains 台鑒 and the deferential 閣下.',
        status: 'applied',
      },
      {
        category: 'Register & Tone',
        title: 'Succession handled with delicacy',
        detail:
          'Estate and succession are phrased with care: the passing-on of wealth is rendered as 有序傳承 (“orderly continuity”) and 澤被後人 (“benefiting those who follow”) — continuity-oriented language that never alludes directly to death (死).',
        status: 'applied',
      },
      {
        category: 'Numbers & Symbolism',
        title: 'Reconvene in eight weeks',
        detail:
          'The follow-up is set for eight weeks (八週 / 八周) — favouring the auspicious 8 — rather than, say, four.',
        status: 'applied',
      },
      {
        category: 'Action & Clarity',
        title: 'Agreed actions enumerated',
        detail:
          'The agreed steps are set out plainly so nothing is lost across the three languages: establish the trust, increase the fixed-income allocation, reconvene in eight weeks, and a proposal to follow within the week.',
        status: 'applied',
      },
      {
        category: 'Date & Format',
        title: 'Meeting day and dating',
        detail:
          'The meeting is referenced as 本週二 / 本周二 (“this Tuesday”); the letter date sits beneath the signature, in Chinese numerals for the Traditional edition.',
        status: 'applied',
      },
    ],
  },
}

export const briefs: Brief[] = [portfolioUpdate, lunarNewYear, meetingFollowUp]

export function getBrief(id: string): Brief | undefined {
  return briefs.find((b) => b.id === id)
}
