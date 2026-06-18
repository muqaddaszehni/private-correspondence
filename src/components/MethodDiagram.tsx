import { useMemo } from 'react'
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

type CardData = { kicker?: string; title: string; sub?: string; tone: 'plain' | 'navy' | 'outline' }

function CardNode({ data }: NodeProps) {
  const d = data as CardData
  const base = 'w-[164px] px-4 py-3 border shadow-card text-left'
  const tone =
    d.tone === 'navy'
      ? 'bg-navy border-brass text-ivory'
      : d.tone === 'outline'
        ? 'bg-bone border-navy text-navy'
        : 'bg-bone border-hairline text-navy'
  return (
    <div className={base + ' ' + tone}>
      {d.kicker && (
        <div className={'label-muted ' + (d.tone === 'navy' ? '!text-ivory/55' : '')}>{d.kicker}</div>
      )}
      <div className={'font-serif text-lg leading-tight ' + (d.tone === 'navy' ? 'text-ivory' : 'text-navy')}>
        {d.title}
      </div>
      {d.sub && (
        <div className={'mt-1 font-sans text-[11px] leading-snug ' + (d.tone === 'navy' ? 'text-ivory/65' : 'text-ink/55')}>
          {d.sub}
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!h-1 !w-1 !min-w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Right} className="!h-1 !w-1 !min-w-0 !border-0 !bg-transparent" />
    </div>
  )
}

const nodeTypes = { card: CardNode }

const nodes: Node[] = [
  { id: 'brief', type: 'card', position: { x: 0, y: 150 }, data: { kicker: 'Input', title: 'The Brief', sub: 'Recipient · occasion · key points', tone: 'plain' } },
  { id: 'rules', type: 'card', position: { x: 232, y: 150 }, data: { kicker: 'Engine', title: 'Cultural Rules', sub: 'Honorifics · numerology · dates · festivals', tone: 'navy' } },
  { id: 'en', type: 'card', position: { x: 470, y: 40 }, data: { title: 'English', sub: 'Hong Kong usage', tone: 'plain' } },
  { id: 'hant', type: 'card', position: { x: 470, y: 150 }, data: { title: '繁體中文', sub: 'Traditional · classical register', tone: 'plain' } },
  { id: 'hans', type: 'card', position: { x: 470, y: 260 }, data: { title: '简体中文', sub: 'Simplified · modern formal', tone: 'plain' } },
  { id: 'review', type: 'card', position: { x: 720, y: 150 }, data: { kicker: 'Output', title: 'Cultural Review', sub: 'Conventions flagged & explained', tone: 'outline' } },
]

const edges: Edge[] = [
  { id: 'e1', source: 'brief', target: 'rules' },
  { id: 'e2', source: 'rules', target: 'en' },
  { id: 'e3', source: 'rules', target: 'hant' },
  { id: 'e4', source: 'rules', target: 'hans' },
  { id: 'e5', source: 'en', target: 'review' },
  { id: 'e6', source: 'hant', target: 'review' },
  { id: 'e7', source: 'hans', target: 'review' },
]

export function MethodDiagram() {
  const defaultEdgeOptions = useMemo(
    () => ({ type: 'smoothstep', style: { stroke: '#C2B690', strokeWidth: 1.2 }, animated: false }),
    [],
  )
  return (
    <section className="border border-hairline bg-bone/60 shadow-card">
      <div className="border-b border-hairline px-6 py-4">
        <div className="label">The Method</div>
        <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink/55">
          How each brief becomes correspondence — the cultural rules are applied before a single word is written.
        </p>
      </div>
      <div className="h-[360px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          preventScrolling={false}
          minZoom={0.2}
          maxZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#D8D2C6" />
        </ReactFlow>
      </div>
    </section>
  )
}
