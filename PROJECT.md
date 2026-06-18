# Private Correspondence — Project Documentation & Handoff

Complete record of what this is, how it's built, how it's deployed, and how to
change it. The short run-me guide lives in [`README.md`](./README.md); this file
is the full reference.

---

## 1. Summary

A **private-banking correspondence studio**. It turns a banker's brief
(recipient, relationship/formality, occasion, key points) into a polished client
letter in three editions — **English**, **Traditional Chinese (Hong Kong)** and
**Simplified Chinese** — at private-banking formality, with a **Cultural Checks**
panel that flags and explains the conventions applied.

- **Audience:** built as a demo MVP for a non-technical, skeptical senior private
  banker at a Swiss private bank in Hong Kong. The brief was "make it look
  genuinely premium and run with zero setup."
- **Status:** complete and deployed. Every screen and all sample data are fully
  implemented. No backend, no auth, no database, no API key — all data is local
  mock data in the repo.
- **Fictional throughout:** the bank ("Banque Saint-Gervais"), the banker
  ("Maximilian Roth") and all clients are invented. The footer says so.

## 2. Links

| | |
|---|---|
| **Live demo** | https://muqaddaszehni.github.io/private-correspondence/ |
| **Source repo** (public) | https://github.com/muqaddaszehni/private-correspondence |
| **GitHub account** | `muqaddaszehni` |
| **Local path** | `/Users/kijon/Documents/Claude/Projects/Private Correspondence` |

## 3. Run, build, preview

```bash
npm install      # once
npm run dev      # dev server, usually http://localhost:5173
npm run build    # type-check (tsc -b) + production build into dist/
npm run preview  # serve the built dist/ locally
```

Requires Node 18+ (built and CI-tested on Node 20). No environment variables.

## 4. Stack

Vite 5 · React 18 · TypeScript 5 (strict) · Tailwind CSS 3 · Recharts 2
(performance band) · React Flow / `@xyflow/react` 12 (method diagram).

Fonts (Google Fonts, loaded in `index.html`): **Cormorant Garamond** (display +
English letter body), **Inter** (UI), **Noto Serif TC** / **Noto Serif SC** (the
Chinese letters, for a proper printed Ming/Song typeface).

## 5. Architecture & file map

```
index.html              Google Fonts, <title>, root div
vite.config.ts          base: './'  (relative asset paths — see §11)
tailwind.config.js      palette, font families, shadows (the design tokens)
src/
  main.tsx              React entry
  App.tsx               state + layout. Holds the brief form, runs compose(),
                        decides when to show the performance band.
  index.css             base styles, paper-grain overlay, letter typography,
                        the `.label` small-caps helpers, entrance animation
  data/
    profile.ts          the (fictional) banker + bank — change names here
    briefs.ts           ★ the three fully worked briefs: inputs + hand-written
                        EN/TC/SC letters + per-brief cultural checks
  lib/
    types.ts            domain types (Brief, Letter, CulturalCheck, …)
    honorifics.ts       ★ the cultural & formality RULES ENGINE (runs live):
                        salutations, valedictions, 3 date formats, festival
                        greetings, number-symbolism scan, buildChecks()
    compose.ts          ★ brief → 3 letters + checks. Returns the hand-written
                        letters for a worked brief; otherwise builds live via the
                        rules engine. Holds translateViaApi() — the API stub.
  components/
    Masthead.tsx        annual-report masthead
    BriefPanel.tsx      scenario selector + editable form + key-points editor
    LetterBoard.tsx     lays out the three LetterColumns
    LetterColumn.tsx    one stationery letter + Copy button + pending state
    CulturalChecks.tsx  the right-hand checks rail
    PerformanceBand.tsx Recharts area chart (portfolio scenario only)
    MethodDiagram.tsx   React Flow "how it works" diagram
    Footer.tsx          bank line + "Illustrative demo — fictional data"
    ui.tsx              shared FieldLabel / TextInput / Select
```

★ = the three files that carry the substance.

## 6. The three worked briefs (`src/data/briefs.ts`)

| Scenario | Recipient | Occasion | Cultural points demonstrated |
|---|---|---|---|
| **Half-Year Portfolio Review** | Mr. Lawrence Cheung 張立倫先生 | Portfolio update | Classical vs. modern register; return figure ends in **8**; the number **4** absent; composed (not boastful) tone; date placement |
| **Lunar New Year Greeting** | Mr. Andrew Chan 陳柏豪先生 | Lunar New Year | Year of the Horse 丙午馬年 idioms (恭喜發財, 萬事如意, 馬到成功); **八方來財** (wealth from all eight directions); red-and-gold / 利是 note; whole-household blessing |
| **Meeting Follow-Up** | Dr. Eleanor Ng 吳嘉敏博士 | Meeting follow-up | Academic honorific **博士** preserved in all three; succession phrased as 有序傳承 / 澤被後人, never alluding to death (死); reconvene in **eight** weeks |

The Traditional and Simplified editions are **not** character conversions of one
another — they differ in register, as a Hong Kong banker's correspondence
actually would. Traditional uses classical epistolary form (台鑒 salutation,
deferential 閣下, 順頌台祺 valediction, dates in Chinese numerals, date below the
signature). Simplified uses modern standard formal Mandarin (尊敬的…, 您,
顺颂商祺).

## 7. Cultural conventions implemented (`src/lib/honorifics.ts`)

All of these are **rule-based and run live for any brief** — they do not need a
translation API:

- **Salutations:** `Dear {title} {surname},` / `{name} 台鑒：` / `尊敬的{name}：`
- **Valedictions** by occasion (regards / season / condolence), with the right
  Chinese formula per script.
- **Three date formats:** `8 July 2026` (EN, day-month-year HK usage) /
  `二〇二六年七月八日` (Traditional, full Chinese numerals) / `2026年7月8日`
  (Simplified). English dates sit in the letterhead; Chinese dates below the
  signature.
- **Festival greetings:** the four-character Lunar New Year blessings.
- **Number symbolism:** `scanNumbers()` flags the auspicious **8 (八)** and the
  inauspicious **4 (四, homophone of 死)**; `buildChecks()` turns this into
  sidebar entries (favour 8, caution/avoid 4).

## 8. Translation approach & the live-API hook

- The three worked scenarios ship with **hand-written** translations (the demo
  works instantly, offline).
- Editing a brief away from a worked example runs the rules engine **live**:
  salutations, valedictions, dates, festival greetings and number checks are all
  generated; the **English body** is drafted from the key points; the **Chinese
  body** is the one part that needs a translation service, so it's shown as a
  tasteful "pending" panel.
- **The single integration point is `src/lib/compose.ts → translateViaApi()`.**
  It is intentionally inert (no network, no key). To enable live translation:
  1. Implement `translateViaApi(englishBody, target, context)` against your
     provider (the file contains commented pseudo-code for the Anthropic
     Messages API, model `claude-opus-4-8`).
  2. Call it from `customComposition()` to fill the Chinese `paragraphs` and drop
     the `pending` flag.
  The system prompt should instruct: private-banking formality, preserve
  honorifics, favour auspicious numbers / avoid four, Hong Kong Traditional
  conventions for `zh-Hant`.

## 9. Design system

"Restrained luxury" — a printed annual report, not a fintech startup. Tokens in
`tailwind.config.js`:

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0E1B2E` | headings, primary button, emphasis node |
| `ink` | `#1C1C1C` | body text |
| `ivory` | `#F7F4EE` | page background |
| `bone` | `#FBF9F4` | cards / stationery |
| `brass` / `brass-deep` | `#B0904F` / `#8C7038` | accents, small-caps labels, chart |
| `hairline` | `#D8D2C6` | 1px borders, rules |

Details: 1px hairline borders, subtle `shadow-card`, letter-spaced small-caps
labels (`.label` / `.label-muted`), a ~4% paper-grain overlay (SVG turbulence in
`index.css`), a 3px brass bar across the top, a brass diamond divider, and a
staggered `rise` entrance animation. No emoji, no bright gradients.

## 10. Responsive behaviour

- **MacBook / desktop (xl ≥ 1280px):** three letters in a row with the Cultural
  Checks rail to their right.
- **Tablet (lg):** three letters in a row, checks below.
- **iPhone / mobile:** everything stacks to one column; scenario cards stack; the
  right-hand masthead block (Est. 1869 etc.) hides below `sm`.

## 11. Deployment (how the live demo works)

- **Host:** GitHub Pages, **source = GitHub Actions**.
- **Workflow:** `.github/workflows/deploy.yml` — on every push to `main` it runs
  `npm ci`, `npm run build`, uploads `dist/`, and deploys via
  `actions/deploy-pages`.
- **To redeploy:** just commit and push to `main`. (Or re-run the workflow:
  `gh workflow run "Deploy to GitHub Pages"`.)
- **One-time setup already done:** Pages was enabled with
  `gh api -X POST repos/muqaddaszehni/private-correspondence/pages -f build_type=workflow`.
  (The very first run failed because Pages wasn't enabled yet — enabling it and
  re-running fixed it. It won't recur.)
- **Why `base: './'` in `vite.config.ts`:** a Pages *project* site serves at
  `/<repo>/`, so assets must be referenced relatively. `base: './'` makes the
  same build work at the root (local) and under the subpath (Pages).

## 12. Quick customisation

- **Rename the bank / banker:** `src/data/profile.ts` (English + both Chinese
  names and titles).
- **Edit a worked letter or add a scenario:** `src/data/briefs.ts` — copy an
  existing `Brief` object, change inputs, letters and `checks`, then add it to the
  exported `briefs` array. A new scenario card appears automatically.
- **Add an occasion type:** extend `Occasion` in `src/lib/types.ts`, add it to
  `OCCASIONS` and the closing/greeting rules in `src/lib/honorifics.ts`.
- **Adjust colours / fonts:** `tailwind.config.js` (tokens) and `index.html`
  (font links) + `index.css` (letter type).

## 13. Known notes / caveats

- **Bundle size** (~730 kB / ~221 kB gzipped) — Recharts + React Flow dominate.
  Acceptable for a demo; could be code-split if it ever matters.
- **Web fonts need network** on first load. Offline, the page falls back to
  Georgia/serif and still looks correct.
- **CI warnings are cosmetic:** "Node 20 deprecated" (GitHub runner notice) and
  "recharts 2.x no longer active" (a v3 exists). Neither affects the build.
- **Clipboard copy** uses `navigator.clipboard`; wrapped in try/catch.

## 14. Verification performed

- `npm run build` — type-checks clean, 972 modules bundled.
- Dev server boots; entry modules transform; correct `<title>`.
- Rendered headless at **1440px (desktop)** and **390px (iPhone)** — all three
  letters, the Recharts band, the React Flow diagram, the checks rail and
  responsive stacking confirmed.
- **Live** Pages URL verified: HTTP 200, correct title, assets resolve, and
  rendered in a real browser identical to local.

---

*Built with Claude Code (Opus 4.8). Illustrative demo — fictional data.*
