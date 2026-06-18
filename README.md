# Private Correspondence

A correspondence studio for a private bank. It turns a banker's brief into a polished
client letter in three editions — **English**, **Traditional Chinese (Hong Kong)** and
**Simplified Chinese** — at private-banking formality, with the cultural conventions
observed and explained.

> Illustrative demo — fictional data throughout. Not financial advice or genuine client correspondence.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>). No backend, no API key,
no database — everything runs locally.

## What you'll see

- **The Brief** — choose one of three worked scenarios (a half-year portfolio review, a
  Lunar New Year greeting, a meeting follow-up), then refine recipient, honorific,
  relationship, occasion and key points as you wish.
- **Three letters, side by side** — each a complete, appropriately formal letter with the
  correct salutation, honorifics, valediction, signature and date. A **Copy** button on
  each panel copies that letter as plain text.
- **Cultural Checks** — a sidebar that flags and explains the conventions applied:
  auspicious vs. inauspicious numbers (favour 8, avoid 4), the correct honorific and
  salutation, the appropriate date format, and festival-appropriate greetings.
- **The Method** — a short diagram of how a brief becomes correspondence.

## How the translation works

The three worked scenarios ship with **hand-written** translations. The Traditional and
Simplified editions are not character-for-character conversions of each other — they
differ in register, as a Hong Kong banker's correspondence actually would:

- **Traditional** uses classical epistolary convention — the `台鑒` salutation, the
  deferential `閣下`, the `順頌 台祺` valediction, and dates in full Chinese numerals.
- **Simplified** uses modern standard formal Mandarin — `尊敬的…`, `您`, `顺颂 商祺`.

The cultural rules themselves (salutations, valedictions, the three date formats, festival
greetings, the auspicious/inauspicious number checks) are **rule-based and run live** for
any brief — see `src/lib/honorifics.ts`. If you edit a brief away from a worked example,
those rules still run live and the English body is drafted from your key points; the
Chinese body is the one step that needs a translation service, so it is shown as pending.

### Plugging in a live translation API

There is a single, clearly-commented integration point:

```
src/lib/compose.ts → translateViaApi()
```

It is intentionally inert in the demo (no network, no key). Implement it against your
provider of choice and call it from `customComposition()` to fill the Chinese body; the
cultural rules continue to supply everything else.

## Stack

Vite · React · TypeScript · Tailwind CSS · Recharts (performance band) · React Flow
(`@xyflow/react`, the method diagram). Headings are set in Cormorant Garamond, body UI in
Inter, and the Chinese letters in Noto Serif TC / SC for a proper printed Ming typeface.

## Project layout

```
src/
  data/
    briefs.ts      three fully worked briefs + hand-written letters + cultural checks
    profile.ts     the (fictional) banker and bank
  lib/
    types.ts       domain types
    honorifics.ts  the cultural & formality rules engine (runs live)
    compose.ts     brief → three letters + checks; holds the translateViaApi() stub
  components/      Masthead, BriefPanel, LetterBoard/LetterColumn, CulturalChecks,
                   PerformanceBand, MethodDiagram, Footer
```
