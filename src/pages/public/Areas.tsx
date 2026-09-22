import { Link } from 'react-router-dom'
import { useAreas } from '@/lib/queries'
import { EmptyState, ErrorState, Section, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { useT } from '@/lib/i18n'

export default function Areas() {
  const { data: areas = [], isLoading, isError, error, refetch } = useAreas()
  const t = useT()

  return (
    <Section label={t('areasPage.label')} title={t('areasPage.title')} intro={t('areasPage.intro')}>
      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && areas.length === 0 && <EmptyState title={t('areasPage.empty')} />}

      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <Link
            key={area.id}
            to={`/areas/${area.slug}`}
            className="group rounded-2xl border border-line bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{area.name}</h2>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent-ink">
                <Icon name="arrowUpRight" size={16} />
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.summary}</p>
            {area.faqs.length > 0 && (
              <p className="mt-4 text-xs text-muted">
                {area.faqs.length} {t(area.faqs.length > 1 ? 'areasPage.faqs' : 'areasPage.faq')}
              </p>
            )}
          </Link>
        ))}
      </div>
    </Section>
  )
}
