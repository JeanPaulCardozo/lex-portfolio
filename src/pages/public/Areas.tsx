import { Link } from 'react-router-dom'
import { useAreas } from '@/lib/queries'
import { EmptyState, ErrorState, Section, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'

export default function Areas() {
  const { data: areas = [], isLoading, isError, error, refetch } = useAreas()

  return (
    <Section
      label="Servicios"
      title="Áreas de práctica"
      intro="Materias en las que asesoro y litigo. Cada área incluye una explicación del tipo de asuntos que gestiono y preguntas frecuentes."
    >
      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && areas.length === 0 && (
        <EmptyState title="Todavía no hay áreas publicadas" />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <Link
            key={area.id}
            to={`/areas/${area.slug}`}
            className="group rounded-2xl border border-line bg-card p-6 transition-colors hover:border-ink"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{area.name}</h2>
              <Icon name="arrowUpRight" size={18} className="text-muted group-hover:text-ink" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.summary}</p>
            {area.faqs.length > 0 && (
              <p className="mt-4 text-xs text-muted">
                {area.faqs.length} pregunta{area.faqs.length > 1 ? 's' : ''} frecuente
                {area.faqs.length > 1 ? 's' : ''}
              </p>
            )}
          </Link>
        ))}
      </div>
    </Section>
  )
}
