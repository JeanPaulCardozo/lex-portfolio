import { useExperience } from '@/lib/queries'
import { formatMonthYear } from '@/lib/format'
import { EmptyState, ErrorState, Section, Spinner } from '@/components/ui'

export default function Experience() {
  const { data: experience = [], isLoading, isError, error, refetch } = useExperience()

  return (
    <Section
      label="Recorrido profesional"
      title="Trayectoria"
      intro="Puestos y colaboraciones, de lo más reciente a lo más antiguo."
    >
      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && experience.length === 0 && (
        <EmptyState title="Todavía no hay experiencia publicada" />
      )}

      <ol className="relative border-l border-line pl-6">
        {experience.map((x) => (
          <li key={x.id} className="mb-10 last:mb-0">
            <span className="absolute -left-[6.5px] mt-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink" />
            <p className="text-sm text-muted">
              {formatMonthYear(x.startDate)} – {x.current ? 'Actualidad' : formatMonthYear(x.endDate)}
              {x.location ? ` · ${x.location}` : ''}
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              {x.role} <span className="font-normal text-ink-soft">· {x.org}</span>
            </h2>
            {x.description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{x.description}</p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
