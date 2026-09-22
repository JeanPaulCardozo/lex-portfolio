import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfile, useSubmitContact } from '@/lib/queries'
import { whatsappHref } from '@/lib/format'
import { useT, type TFn } from '@/lib/i18n'
import { Button, Section } from '@/components/ui'
import { Icon } from '@/components/Icon'

function makeSchema(t: TFn) {
  return z.object({
    name: z.string().min(2, t('contact.errorName')),
    email: z.string().email(t('contact.errorEmail')),
    phone: z.string().optional().or(z.literal('')),
    message: z.string().min(10, t('contact.errorMessage')),
  })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

const fieldCls =
  'w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/25'

export default function Contact() {
  const { data: profile } = useProfile()
  const submit = useSubmitContact()
  const t = useT()
  const schema = useMemo(() => makeSchema(t), [t])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    await submit.mutateAsync({
      name: data.name,
      email: data.email,
      phone: data.phone ?? '',
      message: data.message,
    })
    reset()
  }

  return (
    <Section label={t('contact.label')} title={t('contact.title')}>
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          {submit.isSuccess ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="flex items-center gap-2 font-medium text-emerald-800">
                <Icon name="check" size={18} /> {t('contact.sent')}
              </p>
              <p className="mt-1 text-sm text-emerald-700">{t('contact.sentBody')}</p>
              <button
                onClick={() => submit.reset()}
                className="mt-3 text-sm text-emerald-800 underline underline-offset-2"
              >
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">{t('contact.name')} *</span>
                  <input className={fieldCls} {...register('name')} />
                  {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name.message}</span>}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">{t('contact.email')} *</span>
                  <input type="email" className={fieldCls} {...register('email')} />
                  {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>}
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('contact.phone')}</span>
                <input className={fieldCls} {...register('phone')} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{t('contact.message')} *</span>
                <textarea rows={5} className={fieldCls} {...register('message')} />
                {errors.message && (
                  <span className="mt-1 block text-xs text-red-600">{errors.message.message}</span>
                )}
              </label>

              {submit.isError && (
                <p className="text-sm text-red-600">
                  {submit.error instanceof Error ? submit.error.message : t('contact.sendError')}
                </p>
              )}

              <Button type="submit" disabled={submit.isPending}>
                {submit.isPending ? t('common.sending') : t('contact.send')}
              </Button>
              <p className="text-xs text-muted">{t('contact.disclaimer')}</p>
            </form>
          )}
        </div>

        {profile && (
          <aside className="space-y-4 rounded-2xl border border-line bg-card p-6 text-sm shadow-sm">
            <ContactRow icon="mail" label={t('contact.email')} value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow icon="phone" label={t('contact.phone')} value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
            {whatsappHref(profile.whatsapp) && (
              <ContactRow
                icon="phone"
                label={t('contact.whatsapp')}
                value={t('contact.whatsappCta')}
                href={whatsappHref(profile.whatsapp) as string}
              />
            )}
            {profile.linkedin && (
              <ContactRow icon="external" label={t('contact.linkedin')} value={t('contact.viewProfile')} href={profile.linkedin} />
            )}
            <div>
              <p className="label text-[0.6rem]">{t('contact.location')}</p>
              <p className="mt-1 text-ink-soft">{profile.location}</p>
            </div>
          </aside>
        )}
      </div>
    </Section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: 'mail' | 'phone' | 'external'
  label: string
  value: string
  href: string
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-accent-ink">
      <Icon name={icon} size={16} className="mt-0.5 shrink-0 text-muted" />
      <span>
        <span className="label block text-[0.6rem]">{label}</span>
        <span className="text-ink-soft">{value}</span>
      </span>
    </a>
  )
}
