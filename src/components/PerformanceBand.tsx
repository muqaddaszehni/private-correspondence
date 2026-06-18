import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { PerfPoint } from '../lib/types'

const stats = [
  { label: 'H1 return', value: '+6.8%' },
  { label: 'Duration', value: '−0.4 yr' },
  { label: 'Asian IG credit', value: 'Increased' },
  { label: 'Quality equities', value: 'Maintained' },
]

export function PerformanceBand({ data }: { data: PerfPoint[] }) {
  const last = data[data.length - 1]?.value ?? 0
  return (
    <section className="border border-hairline bg-bone/70 shadow-card">
      <div className="flex flex-col gap-6 px-6 py-5 lg:flex-row lg:items-center">
        <div className="lg:w-64 shrink-0">
          <div className="label">Portfolio · First Half 2026</div>
          <div className="mt-2 font-serif text-4xl text-navy">
            +{last.toFixed(1)}<span className="text-2xl text-brass-deep">%</span>
          </div>
          <p className="mt-1 font-sans text-xs leading-relaxed text-ink/55">
            Cumulative return, illustrative. The figures referenced in the letter at a glance.
          </p>
        </div>

        <div className="h-28 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="brassFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B0904F" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#B0904F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#1C1C1C99', fontFamily: 'Inter' }}
                axisLine={{ stroke: '#D8D2C6' }}
                tickLine={false}
              />
              <YAxis
                width={40}
                tick={{ fontSize: 11, fill: '#1C1C1C66', fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                cursor={{ stroke: '#B0904F', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{
                  background: '#FBF9F4',
                  border: '1px solid #D8D2C6',
                  borderRadius: 0,
                  fontFamily: 'Inter',
                  fontSize: 12,
                  color: '#1C1C1C',
                }}
                labelStyle={{ color: '#8C7038', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 10 }}
                formatter={(v: number) => [`${v}%`, 'Cumulative']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8C7038"
                strokeWidth={1.6}
                fill="url(#brassFill)"
                dot={{ r: 2, fill: '#8C7038', strokeWidth: 0 }}
                activeDot={{ r: 3.5, fill: '#0E1B2E' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 lg:w-72 shrink-0">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="label-muted">{s.label}</div>
              <div className="mt-0.5 font-serif text-lg text-navy">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
