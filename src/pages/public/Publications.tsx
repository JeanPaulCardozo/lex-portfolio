import { usePublications } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import { Badge, EmptyState, ErrorState, Section, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'
import type { PublicationKind } from '@/lib/api/types'

const KIND_LABEL: Record<PublicationKind, string> = {
  articulo: 'Artículo',
  ponencia: 'Ponencia',
  libro: 'Libro',
  podcast: 'Pódcast',
}

export default function Publications() {
  const { data: publications = [], isLoading, isError, error, refetch } = usePublications()

  return (
    <Section
      label="Divulgación"
      title="Publicaciones y ponencias"
      intro="Artículos, intervenciones en jornadas y otras aportaciones profesionales."
    >
      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && publications.length === 0 && (
        <EmptyState title="Todavía no hay publicaciones" />
      )}

      <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
        {publications.map((p) => {
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">{KIND_LABEL[p.kind]}</Badge>
                  {p.date && <span className="text-xs text-muted">{formatDate(p.date)}</span>}
                </div>
                <p className="mt-1.5 font-medium">{p.title}</p>
                {p.venue && <p className="text-sm text-muted">{p.venue}</p>}
                {p.summary && (
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.summary}</p>
                )}
              </div>
              {p.url && <Icon name="external" size={16} className="mt-1 shrink-0 text-muted" />}
            </>
          )
          const cls = 'flex items-start gap-4 px-5 py-4'
          return (
            <li key={p.id}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer" className={`${cls} hover:bg-paper`}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
