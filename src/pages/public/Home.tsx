import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useAreas,
  useCases,
  useProfile,
  useTestimonials,
} from '@/lib/queries'
import { CaseCard } from '@/components/CaseCard'
import { Icon } from '@/components/Icon'
import { Stars } from '@/components/Stars'
import { TestimonialForm } from '@/components/TestimonialForm'
import { Button, ButtonLink, Section, Spinner } from '@/components/ui'

export default function Home() {
  const { data: profile, isLoading } = useProfile()
  const { data: areas = [] } = useAreas()
  const { data: cases = [] } = useCases()
  const { data: testimonials = [] } = useTestimonials()
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)

  const featured = cases.filter((c) => c.featured).slice(0, 3)

  if (isLoading || !profile) {
    return (
      <div className="container-x py-24">
        <Spinner label="Cargando portafolio…" />
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="label mb-4">{profile.title}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              {profile.fullName}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {profile.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/casos">
                Ver casos y resultados <Icon name="arrowRight" size={16} />
              </ButtonLink>
              <ButtonLink to="/contacto" variant="outline">
                Agendar una consulta
              </ButtonLink>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {profile.stats.map((s) => (
              <div key={s.label} className="bg-card p-5">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Áreas */}
      <Section label="En qué puedo ayudarte" title="Áreas de práctica">
        <div className="grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <Link
              key={area.id}
              to={`/areas/${area.slug}`}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-ink"
            >
              <div>
                <h3 className="text-lg font-semibold">{area.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{area.summary}</p>
              </div>
              <Icon
                name="arrowUpRight"
                size={18}
                className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* Casos destacados */}
      {featured.length > 0 && (
        <Section
          label="Resultados"
          title="Casos destacados"
          intro="Una muestra de asuntos representativos. En la sección de casos puedes filtrarlos por área, año y tipo de resultado."
          className="border-t border-line bg-white"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((c) => (
              <CaseCard key={c.id} item={c} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/casos" variant="outline" size="sm">
              Ver todos los casos
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Sobre mí (teaser) */}
      <Section label="Perfil" title="Sobre mí" className="border-t border-line">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-legal max-w-none">
            <p>{profile.summary}</p>
            <ButtonLink to="/sobre-mi" variant="outline" size="sm">
              Trayectoria completa
            </ButtonLink>
          </div>
          <div className="space-y-4 rounded-2xl border border-line bg-card p-6 text-sm">
            <div>
              <p className="label text-[0.6rem]">Colegiación</p>
              <ul className="mt-1 space-y-1 text-ink-soft">
                {profile.barAdmissions.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-[0.6rem]">Idiomas</p>
              <p className="mt-1 text-ink-soft">{profile.languages.join(' · ')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonios */}
      <Section label="Opiniones" title="Lo que dicen" className="border-t border-line bg-white">
        {testimonials.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.id} className="rounded-2xl border border-line bg-paper p-6">
                <Stars value={t.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-muted">
                  {t.author}
                  {t.authorRole ? ` · ${t.authorRole}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            Aún no hay opiniones publicadas. ¿Trabajaste conmigo? Anímate a dejar la primera.
          </p>
        )}

        <div className="mt-8 border-t border-line pt-6">
          {showTestimonialForm ? (
            <TestimonialForm />
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowTestimonialForm(true)}>
              <Icon name="plus" size={15} /> Deja tu opinión
            </Button>
          )}
          <p className="mt-3 text-xs text-muted">
            Las opiniones se revisan antes de publicarse.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-line bg-ink text-white">
        <div className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">¿Hablamos de tu caso?</h2>
            <p className="mt-2 text-white/70">Primera valoración sin compromiso.</p>
          </div>
          <ButtonLink to="/contacto" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-ink">
            Ir a contacto <Icon name="arrowRight" size={16} />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
