import { cn } from '@/lib/cn'

/**
 * Isotipo de marca: «MB» dorado + nombre + oficio, como en el logo de
 * cabecera de banner_app/reference_app. Se usa igual en toda la app
 * (header público, footer, header y login del panel).
 */
export function BrandMark({
  name,
  profession,
  size = 'md',
  onDark = false,
  className,
}: {
  name: string
  profession?: string
  size?: 'sm' | 'md' | 'lg'
  onDark?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'font-display font-bold leading-none text-accent',
          size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-lg',
        )}
      >
        MB
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'font-display font-semibold tracking-tight',
            size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-xs',
            onDark ? 'text-white' : 'text-ink',
          )}
        >
          {name}
        </span>
        {profession && (
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {profession}
          </span>
        )}
      </span>
    </span>
  )
}
