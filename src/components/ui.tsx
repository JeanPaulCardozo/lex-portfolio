import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { Icon } from './Icon'

/* ------------------------------ Button ------------------------------ */
type Variant = 'primary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'
const BTN_VARIANT: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[#fdedc2] from-5% via-[#d9ac4c] via-45% to-[#8a611c] to-100% text-ink shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),inset_0_-6px_10px_-4px_rgba(90,60,10,0.55),0_4px_10px_rgba(20,14,8,0.4)] hover:-translate-y-px hover:brightness-110 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-6px_10px_-4px_rgba(90,60,10,0.6),0_6px_16px_rgba(20,14,8,0.5)]',
  outline:
    'border border-line-strong text-ink shadow-sm hover:-translate-y-px hover:border-ink hover:bg-white hover:shadow-md',
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
            {label && (
              <p className="label mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                {label}
              </p>
            )}
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
  const t = useT()
  return (
    <div className="flex items-center gap-3 text-sm text-muted py-10">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line-strong border-t-ink" />
      {label ?? t('common.loading')}
    </div>
  )
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const t = useT()
  const message = error instanceof Error ? error.message : t('common.genericError')
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
      <p className="font-medium">{t('common.errorTitle')}</p>
      <p className="mt-1 text-red-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 underline underline-offset-2">
          {t('common.retry')}
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
