import { useExperience, useProfile } from '@/lib/queries'
import { formatMonthYear } from '@/lib/format'
import { ButtonLink, Section, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { useT } from '@/lib/i18n'

export default function About() {
  const { data: profile, isLoading } = useProfile()
  const { data: experience = [] } = useExperience()
  const t = useT()

  if (isLoading || !profile) {
    return (
      <div className="container-x py-24">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <Section label={t('home.aboutLabel')} title={t('home.aboutTitle')}>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="prose-legal max-w-none text-[15px]">
            <p className="text-lg text-ink">{profile.headline}</p>
            <p>{profile.summary}</p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-sm sm:grid-cols-4">
              {profile.stats.map((s) => (
                <div key={s.label} className="bg-card p-4">
                  <p className="font-display text-xl font-semibold">{s.value}</p>
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-5 rounded-2xl border border-line bg-card p-6 text-sm shadow-sm">
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="aspect-square w-full rounded-xl object-cover"
              />
            )}
            <div>
              <p className="label text-[0.6rem]">{t('about.location')}</p>
              <p className="mt-1 text-ink-soft">{profile.location}</p>
            </div>
            <div>
              <p className="label text-[0.6rem]">{t('about.barAdmissions')}</p>
              <ul className="mt-1 space-y-1 text-ink-soft">
                {profile.barAdmissions.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-[0.6rem]">{t('about.languages')}</p>
              <ul className="mt-1 space-y-1 text-ink-soft">
                {profile.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            {profile.cvUrl && (
              <ButtonLink to={profile.cvUrl} external variant="outline" size="sm" className="w-full">
                <Icon name="external" size={15} /> {t('about.downloadCv')}
              </ButtonLink>
            )}
          </aside>
        </div>
      </Section>

      <Section label={t('about.educationLabel')} title={t('about.educationTitle')} className="border-t border-line bg-white">
        <ul className="divide-y divide-line rounded-2xl border border-line bg-card shadow-sm">
          {profile.education.map((e) => (
            <li key={`${e.degree}-${e.year}`} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium">{e.degree}</p>
                <p className="text-sm text-muted">{e.institution}</p>
              </div>
              <span className="shrink-0 text-sm text-muted">{e.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      {experience.length > 0 && (
        <Section label={t('about.experienceLabel')} title={t('about.experienceTitle')} className="border-t border-line">
          <ol className="space-y-6">
            {experience.slice(0, 3).map((x) => (
              <li key={x.id} className="grid gap-1 sm:grid-cols-[180px_1fr]">
                <p className="text-sm text-muted">
                  {formatMonthYear(x.startDate)} – {x.current ? t('common.current') : formatMonthYear(x.endDate)}
                </p>
                <div>
                  <p className="font-medium">
                    {x.role} · {x.org}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{x.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <ButtonLink to="/experiencia" variant="outline" size="sm">
              {t('about.viewFullExperience')}
            </ButtonLink>
          </div>
        </Section>
      )}
    </>
  )
}
