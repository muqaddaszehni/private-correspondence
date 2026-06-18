import type { Composition } from '../lib/types'
import { LetterColumn } from './LetterColumn'

export function LetterBoard({ composition }: { composition: Composition }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <LetterColumn letter={composition.en} />
      <LetterColumn letter={composition['zh-Hant']} />
      <LetterColumn letter={composition['zh-Hans']} />
    </div>
  )
}
