import { Link, useParams } from 'react-router-dom'
import { useCase } from '@/lib/queries'
import { RESULT_LABEL } from '@/components/CaseCard'
import { Icon } from '@/components/Icon'
import { Badge, ButtonLink, ErrorState, Section, Spinner } from '@/components/ui'

export default function CaseDetail() {
  const { slug = '' } = useParams()
  const { data: c, isLoading, isError, error, refetch } = useCase(slug)

  if (isLoading) {
    return (
      <div className="container-x py-24">
        <Spinner />
      </div>
    )
  }
  if (isError || !c) {
    return (
      <div className="container-x py-16">
        <ErrorState error={error ?? new Error('Caso no encontrado')} onRetry={() => refetch()} />
        <Link to="/casos" className="mt-4 inline-block text-sm text-accent-ink underline">
          Volver a casos
        </Link>
      </div>
    )
  }

  const blocks = [
    { label: 'Situación', text: c.situation },
    { label: 'Actuación', text: c.action },
    { label: 'Resultado', text: c.result },
  ].filter((b) => b.text)

  return (
    <Section>
      <Link to="/casos" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <Icon name="arrowRight" size={14} className="rotate-180" /> Casos
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{c.area}</Badge>
        <Badge>{c.year}</Badge>
        <Badge tone="green">{RESULT_LABEL[c.resultType]}</Badge>
      </div>

      <h1 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{c.title}</h1>
      {c.role && <p className="mt-3 text-ink-soft">{c.role}</p>}

      <div className="mt-6 rounded-2xl border border-line bg-ink px-6 py-5 text-white">
        <p className="label text-[0.6rem] text-white/60">Resultado</p>
        <p className="mt-1 text-lg font-medium">{c.outcome}</p>
      </div>

      {c.imageUrl && (
        <img
          src={c.imageUrl}
          alt=""
          className="mt-8 w-full rounded-2xl border border-line object-cover"
        />
      )}

      <div className="mt-10 max-w-3xl space-y-8">
        {blocks.map((b) => (
          <div key={b.label}>
            <h2 className="label mb-2">{b.label}</h2>
            <p className="text-[15px] leading-relaxed text-ink-soft">{b.text}</p>
          </div>
        ))}
      </div>

      {c.skills.length > 0 && (
        <div className="mt-10">
          <h2 className="label mb-3">Competencias demostradas</h2>
          <div className="flex flex-wrap gap-2">
            {c.skills.map((s) => (
              <span key={s} className="rounded-full border border-line-strong px-3 py-1 text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {c.confidential && (
        <p className="mt-8 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Los datos identificativos de este caso se han anonimizado por respeto al secreto profesional.
        </p>
      )}

      <div className="mt-12 border-t border-line pt-8">
        <ButtonLink to="/contacto" size="sm">
          Consultar un caso similar <Icon name="arrowRight" size={15} />
        </ButtonLink>
      </div>
    </Section>
  )
}
