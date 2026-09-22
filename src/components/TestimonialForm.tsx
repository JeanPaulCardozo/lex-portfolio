import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSubmitTestimonial } from '@/lib/queries'
import { useT, type TFn } from '@/lib/i18n'
import { Button } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { StarsInput } from '@/components/Stars'

function makeSchema(t: TFn) {
  return z.object({
    author: z.string().min(2, t('testimonialForm.errorName')),
    authorRole: z.string().optional().or(z.literal('')),
    email: z.string().email(t('testimonialForm.errorEmail')),
    quote: z.string().min(10, t('testimonialForm.errorQuote')),
  })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

const fieldCls =
  'w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/25'

export function TestimonialForm() {
  const submit = useSubmitTestimonial()
  const [rating, setRating] = useState(5)
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
      author: data.author,
      authorRole: data.authorRole ?? '',
      email: data.email,
      quote: data.quote,
      rating,
    })
    reset()
    setRating(5)
  }

  if (submit.isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="flex items-center gap-2 font-medium text-emerald-800">
          <Icon name="check" size={18} /> {t('testimonialForm.thanks')}
        </p>
        <p className="mt-1 text-sm text-emerald-700">{t('testimonialForm.thanksBody')}</p>
        <button
          onClick={() => submit.reset()}
          className="mt-3 text-sm text-emerald-800 underline underline-offset-2"
        >
          {t('testimonialForm.writeAnother')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-line bg-paper p-6"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t('testimonialForm.name')} *</span>
          <input className={fieldCls} {...register('author')} />
          {errors.author && (
            <span className="mt-1 block text-xs text-red-600">{errors.author.message}</span>
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t('testimonialForm.role')}</span>
          <input className={fieldCls} placeholder={t('testimonialForm.rolePlaceholder')} {...register('authorRole')} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('testimonialForm.email')} *</span>
        <input type="email" className={fieldCls} {...register('email')} />
        <span className="mt-1 block text-xs text-muted">{t('testimonialForm.emailHelp')}</span>
        {errors.email && (
          <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>
        )}
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium">{t('testimonialForm.rating')}</span>
        <StarsInput value={rating} onChange={setRating} />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t('testimonialForm.quote')} *</span>
        <textarea rows={4} className={fieldCls} {...register('quote')} />
        {errors.quote && (
          <span className="mt-1 block text-xs text-red-600">{errors.quote.message}</span>
        )}
      </label>

      {submit.isError && (
        <p className="text-sm text-red-600">
          {submit.error instanceof Error ? submit.error.message : t('testimonialForm.sendError')}
        </p>
      )}

      <Button type="submit" disabled={submit.isPending}>
        {submit.isPending ? t('common.sending') : t('testimonialForm.send')}
      </Button>
    </form>
  )
}
