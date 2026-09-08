import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useArea, useCases } from '@/lib/queries'
import { CaseCard } from '@/components/CaseCard'
import { Icon } from '@/components/Icon'
import { ButtonLink, ErrorState, Section, Spinner } from '@/components/ui'

export default function AreaDetail() {
  const { slug = '' } = useParams()
  const { data: area, isLoading, isError, error, refetch } = useArea(slug)
  const { data: cases = [] } = useCases()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  if (isLoading) {
    return (
      <div className="container-x py-24">
        <Spinner />
      </div>
    )
  }
  if (isError || !area) {
    return (
      <div className="container-x py-16">
        <ErrorState error={error ?? new Error('Área no encontrada')} onRetry={() => refetch()} />
        <Link to="/areas" className="mt-4 inline-block text-sm text-accent-ink underline">
          Volver a áreas
        </Link>
      </div>
    )
  }

  const related = cases.filter((c) => c.area === area.name).slice(0, 3)

  return (
    <>
      <Section>
        <Link to="/areas" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <Icon name="arrowRight" size={14} className="rotate-180" /> Áreas de práctica
        </Link>
        <h1 className="text-3xl font-semibold sm:text-4xl">{area.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{area.summary}</p>

        <div className="prose-legal mt-8 max-w-2xl">
          <p>{area.description}</p>
        </div>

        {area.faqs.length > 0 && (
          <div className="mt-12 max-w-2xl">
            <h2 className="text-xl font-semibold">Preguntas frecuentes</h2>
            <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-card">
              {area.faqs.map((faq, i) => (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-medium">{faq.q}</span>
                    <Icon
                      name="chevronDown"
                      size={16}
                      className={openFaq === i ? 'rotate-180 text-ink' : 'text-muted'}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section label="Ejemplos" title={`Casos de ${area.name.toLowerCase()}`} className="border-t border-line bg-white">
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((c) => (
              <CaseCard key={c.id} item={c} />
            ))}
          </div>
        </Section>
      )}

      <section className="border-t border-line">
        <div className="container-x flex flex-col items-start gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-medium">¿Tu asunto encaja en esta área?</p>
          <ButtonLink to="/contacto" size="sm">
            Contactar <Icon name="arrowRight" size={15} />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
