import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/* ------------------------------ Button ------------------------------ */
type Variant = 'primary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'
const BTN_VARIANT: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border border-line-strong text-ink hover:bg-white hover:border-ink',
  ghost: 'text-ink-soft hover:bg-white hover:text-ink',
  danger: 'border border-red-200 text-red-700 hover:bg-red-50',
}
const BTN_SIZE: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-5 py-2.5',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={cn(BTN_BASE, BTN_VARIANT[variant], BTN_SIZE[size], className)} {...props} />
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  external,
  children,
}: {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  children: ReactNode
}) {
  const cls = cn(BTN_BASE, BTN_VARIANT[variant], BTN_SIZE[size], className)
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}

/* ------------------------------ Badge ------------------------------ */
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'green' | 'amber'
}) {
  const tones = {
    neutral: 'bg-stone-100 text-stone-700',
    accent: 'bg-accent-soft text-accent-ink',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

/* ------------------------------ Section ------------------------------ */
export function Section({
  label,
  title,
  intro,
  children,
  className,
  id,
}: {
  label?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-20', className)}>
      <div className="container-x">
        {(label || title || intro) && (
          <div className="mb-10 max-w-2xl">
            {label && <p className="label mb-3">{label}</p>}
            {title && <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>}
            {intro && <p className="mt-3 text-ink-soft leading-relaxed">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/* --------------------- Estados de carga / error --------------------- */
export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted py-10">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line-strong border-t-ink" />
      {label ?? 'Cargando…'}
    </div>
  )
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message = error instanceof Error ? error.message : 'Se produjo un error.'
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
      <p className="font-medium">No se pudieron cargar los datos</p>
      <p className="mt-1 text-red-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 underline underline-offset-2">
          Reintentar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-white p-10 text-center">
      <p className="font-medium text-ink">{title}</p>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  )
}

/* --------------------------- Toast simple --------------------------- */
export function Toast({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg">
      <span className="inline-flex items-center gap-2">
        <Icon name="check" size={16} />
        {children}
      </span>
    </div>
  )
}
