import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useAreas,
  useCases,
  useProfile,
  useTestimonials,
} from '@/lib/queries'
import heroBanner from '@/assets/brand/hero-banner.jpg'
import { CaseCard } from '@/components/CaseCard'
import { Icon } from '@/components/Icon'
import { Stars } from '@/components/Stars'
import { TestimonialForm } from '@/components/TestimonialForm'
import { useT } from '@/lib/i18n'
import { Button, ButtonLink, Section, Spinner } from '@/components/ui'

export default function Home() {
  const { data: profile, isLoading } = useProfile()
  const { data: areas = [] } = useAreas()
  const { data: cases = [] } = useCases()
  const { data: testimonials = [] } = useTestimonials()
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const t = useT()

  const featured = cases.filter((c) => c.featured).slice(0, 3)

  if (isLoading || !profile) {
    return (
      <div className="container-x py-24">
        <Spinner label={t('home.loading')} />
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* La foto es el fondo de toda la sección, sin ningún velo ni degradado encima. */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
          aria-hidden="true"
        />

        <div className="container-x relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-xl [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
            <p className="label mb-4 text-accent">{profile.title}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              {profile.tagline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{profile.headline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/casos">
                {t('home.viewCases')} <Icon name="arrowRight" size={16} />
              </ButtonLink>
              <ButtonLink
                to="/contacto"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-ink"
              >
                {t('home.scheduleConsult')}
              </ButtonLink>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-2xl font-semibold">{s.value}</dd>
                  <dt className="mt-1 text-xs text-white/60">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <Section label={t('home.areasLabel')} title={t('home.areasTitle')}>
        <div className="grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <Link
              key={area.id}
              to={`/areas/${area.slug}`}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold">{area.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{area.summary}</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent-ink">
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Casos destacados */}
      {featured.length > 0 && (
        <Section
          label={t('home.casesLabel')}
          title={t('home.casesTitle')}
          intro={t('home.casesIntro')}
          className="border-t border-line bg-white"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((c) => (
              <CaseCard key={c.id} item={c} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/casos" variant="outline" size="sm">
              {t('home.viewAllCases')}
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Sobre mí (teaser) */}
      <Section label={t('home.aboutLabel')} title={t('home.aboutTitle')} className="border-t border-line">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-legal max-w-none">
            <p>{profile.summary}</p>
            <ButtonLink to="/sobre-mi" variant="outline" size="sm">
              {t('home.fullBio')}
            </ButtonLink>
          </div>
          <div className="space-y-4 rounded-2xl border border-line bg-card p-6 text-sm shadow-sm">
            <div>
              <p className="label text-[0.6rem]">{t('home.barAdmissions')}</p>
              <ul className="mt-1 space-y-1 text-ink-soft">
                {profile.barAdmissions.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-[0.6rem]">{t('home.languages')}</p>
              <p className="mt-1 text-ink-soft">{profile.languages.join(' · ')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonios */}
      <Section label={t('home.testimonialsLabel')} title={t('home.testimonialsTitle')} className="border-t border-line bg-white">
        {testimonials.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <figure
                key={item.id}
                className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Stars value={item.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-muted">
                  {item.author}
                  {item.authorRole ? ` · ${item.authorRole}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">{t('home.noTestimonials')}</p>
        )}

        <div className="mt-8 border-t border-line pt-6">
          {showTestimonialForm ? (
            <TestimonialForm />
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowTestimonialForm(true)}>
              <Icon name="plus" size={15} /> {t('home.leaveReview')}
            </Button>
          )}
          <p className="mt-3 text-xs text-muted">{t('home.reviewsModerated')}</p>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t-2 border-accent bg-ink text-white">
        <div className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('home.ctaTitle')}</h2>
            <p className="mt-2 text-white/70">{t('home.ctaSubtitle')}</p>
          </div>
          <ButtonLink to="/contacto" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-ink">
            {t('home.goToContact')} <Icon name="arrowRight" size={16} />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
