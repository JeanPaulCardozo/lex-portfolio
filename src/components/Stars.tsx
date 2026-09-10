import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const LABELS = ['', '1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas']

/** Valoración en estrellas, solo lectura. */
export function Stars({
  value,
  size = 16,
  className,
}: {
  value: number
  size?: number
  className?: string
}) {
  const v = Math.min(5, Math.max(0, Math.round(Number(value) || 0)))
  return (
    <span
      className={cn('inline-flex items-center gap-0.5 text-amber-500', className)}
      role="img"
      aria-label={`${v} de 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          fill={i <= v ? 'currentColor' : 'none'}
          className={i <= v ? undefined : 'text-line-strong'}
        />
      ))}
    </span>
  )
}

/** Valoración en estrellas como campo de formulario. */
export function StarsInput({
  value,
  onChange,
  size = 26,
}: {
  value: number
  onChange: (value: number) => void
  size?: number
}) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          aria-label={LABELS[i]}
          aria-pressed={i === value}
          className={cn(
            'rounded p-0.5 transition-colors hover:text-amber-600',
            i <= value ? 'text-amber-500' : 'text-line-strong',
          )}
        >
          <Icon name="star" size={size} fill={i <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </span>
  )
}
