import { Link } from 'react-router-dom'
import type { Case } from '@/lib/api/types'
import { usePrefetchCase } from '@/lib/queries'
import { Icon } from './Icon'
import { Badge } from './ui'

const RESULT_LABEL: Record<Case['resultType'], string> = {
  sentencia: 'Sentencia',
  acuerdo: 'Acuerdo',
  archivo: 'Archivo',
  dictamen: 'Resolución',
  otro: 'Otro',
}

export function CaseCard({ item }: { item: Case }) {
  const prefetch = usePrefetchCase()
  return (
    <Link
      to={`/casos/${item.slug}`}
      onMouseEnter={() => prefetch(item.slug)}
      onFocus={() => prefetch(item.slug)}
      className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-ink"
    >
      <div className="flex items-center gap-2 text-xs text-muted">
        <Badge tone="accent">{item.area}</Badge>
        <span>{item.year}</span>
        <span aria-hidden>·</span>
        <span>{RESULT_LABEL[item.resultType]}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug">{item.title}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft line-clamp-3">
        {item.situation}
      </p>

      <div className="mt-5 rounded-lg bg-paper px-3 py-2 text-sm">
        <span className="label text-[0.6rem]">Resultado</span>
        <p className="mt-0.5 font-medium text-ink">{item.outcome}</p>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
        Ver caso
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}

export { RESULT_LABEL }
