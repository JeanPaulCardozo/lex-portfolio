import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/** Selector ES/EN. Pensado para cabeceras oscuras (público y admin). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/20 p-0.5 text-xs font-medium',
        className,
      )}
      role="group"
      aria-label="Idioma / Language"
    >
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors',
            lang === l ? 'bg-accent text-ink' : 'text-white/70 hover:text-white',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
