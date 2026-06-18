import { useMemo, useState } from 'react'
import { Masthead } from './components/Masthead'
import { BriefPanel } from './components/BriefPanel'
import { PerformanceBand } from './components/PerformanceBand'
import { LetterBoard } from './components/LetterBoard'
import { CulturalChecks } from './components/CulturalChecks'
import { MethodDiagram } from './components/MethodDiagram'
import { Footer } from './components/Footer'
import { briefs, getBrief } from './data/briefs'
import { composeCorrespondence, sameInput, type ComposeResult } from './lib/compose'
import type { BriefInput } from './lib/types'

const cloneInput = (i: BriefInput): BriefInput => ({ ...i, keyPoints: [...i.keyPoints] })

export default function App() {
  const today = useMemo(() => new Date(), [])

  const first = briefs[0]
  const [selectedId, setSelectedId] = useState(first.id)
  const [form, setForm] = useState<BriefInput>(() => cloneInput(first.input))
  const [composedInput, setComposedInput] = useState<BriefInput>(() => cloneInput(first.input))
  const [result, setResult] = useState<ComposeResult>(() => composeCorrespondence(first.input, today))

  const dirty = !sameInput(form, composedInput)

  const selectScenario = (id: string) => {
    const brief = getBrief(id)
    if (!brief) return
    const input = cloneInput(brief.input)
    setSelectedId(id)
    setForm(input)
    setComposedInput(input)
    setResult(composeCorrespondence(input, today))
  }

  const compose = () => {
    const input = cloneInput(form)
    setComposedInput(input)
    setResult(composeCorrespondence(input, today))
  }

  // The performance band belongs only to the worked portfolio scenario.
  const snapshot =
    result.worked && composedInput.occasion === 'portfolio-update'
      ? getBrief(selectedId)?.snapshot
      : undefined

  return (
    <div className="min-h-full">
      <span className="block h-[3px] w-full bg-brass" />
      <main className="mx-auto max-w-page px-5 py-9 sm:px-8 sm:py-12">
        <Masthead today={today} />

        <div className="mt-9 space-y-6">
          <div className="rise" style={{ animationDelay: '80ms' }}>
            <BriefPanel
              briefs={briefs}
              selectedId={selectedId}
              value={form}
              dirty={dirty}
              onSelect={selectScenario}
              onChange={setForm}
              onCompose={compose}
            />
          </div>

          {snapshot && (
            <div className="rise">
              <PerformanceBand data={snapshot} />
            </div>
          )}

          <div className="rise flex flex-col gap-6 xl:flex-row" style={{ animationDelay: '140ms' }}>
            <div className="min-w-0 flex-1">
              <LetterBoard composition={result.composition} />
            </div>
            <div className="shrink-0 xl:w-[360px]">
              <CulturalChecks checks={result.composition.checks} />
            </div>
          </div>

          <div className="rise" style={{ animationDelay: '200ms' }}>
            <MethodDiagram />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
