import { usePublications } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import { Badge, EmptyState, ErrorState, Section, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { useT, type TKey } from '@/lib/i18n'
import type { PublicationKind } from '@/lib/api/types'

const KIND_KEY: Record<PublicationKind, TKey> = {
  articulo: 'pub.articulo',
  ponencia: 'pub.ponencia',
  libro: 'pub.libro',
  podcast: 'pub.podcast',
}

export default function Publications() {
  const { data: publications = [], isLoading, isError, error, refetch } = usePublications()
  const t = useT()

  return (
    <Section
      label={t('publicationsPage.label')}
      title={t('publicationsPage.title')}
      intro={t('publicationsPage.intro')}
    >
      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && publications.length === 0 && (
        <EmptyState title={t('publicationsPage.empty')} />
      )}

      <ul className="divide-y divide-line rounded-2xl border border-line bg-card shadow-sm">
        {publications.map((p) => {
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">{t(KIND_KEY[p.kind])}</Badge>
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
          const cls = 'flex items-start gap-4 px-5 py-4 transition-colors'
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
