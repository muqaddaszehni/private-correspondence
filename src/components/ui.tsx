import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react'

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="label-muted block mb-1.5">{children}</span>
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        'w-full bg-bone border border-hairline px-3 py-2 font-sans text-sm text-ink ' +
        'placeholder:text-ink/30 outline-none transition-colors focus:border-brass ' +
        (props.className ?? '')
      }
    />
  )
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={
          'w-full appearance-none bg-bone border border-hairline pl-3 pr-9 py-2 font-sans text-sm text-ink ' +
          'outline-none transition-colors focus:border-brass cursor-pointer ' +
          (props.className ?? '')
        }
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
      >
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  )
}
