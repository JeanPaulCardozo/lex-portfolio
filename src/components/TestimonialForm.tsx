import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSubmitTestimonial } from '@/lib/queries'
import { Button } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { StarsInput } from '@/components/Stars'

const schema = z.object({
  author: z.string().min(2, 'Indica tu nombre'),
  authorRole: z.string().optional().or(z.literal('')),
  email: z.string().email('Correo no válido'),
  quote: z.string().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

const fieldCls =
  'w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-ink'

export function TestimonialForm() {
  const submit = useSubmitTestimonial()
  const [rating, setRating] = useState(5)
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
          <Icon name="check" size={18} /> ¡Gracias por tu opinión!
        </p>
        <p className="mt-1 text-sm text-emerald-700">
          La revisaré antes de publicarla en el sitio.
        </p>
        <button
          onClick={() => submit.reset()}
          className="mt-3 text-sm text-emerald-800 underline underline-offset-2"
        >
          Escribir otra
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
          <span className="mb-1.5 block text-sm font-medium">Nombre *</span>
          <input className={fieldCls} {...register('author')} />
          {errors.author && (
            <span className="mt-1 block text-xs text-red-600">{errors.author.message}</span>
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Rol o sector</span>
          <input className={fieldCls} placeholder="P. ej. Gerente de pyme" {...register('authorRole')} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Correo electrónico *</span>
        <input type="email" className={fieldCls} {...register('email')} />
        <span className="mt-1 block text-xs text-muted">
          No se publica. Solo sirve para verificar tu opinión.
        </span>
        {errors.email && (
          <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>
        )}
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium">Valoración</span>
        <StarsInput value={rating} onChange={setRating} />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Tu opinión *</span>
        <textarea rows={4} className={fieldCls} {...register('quote')} />
        {errors.quote && (
          <span className="mt-1 block text-xs text-red-600">{errors.quote.message}</span>
        )}
      </label>

      {submit.isError && (
        <p className="text-sm text-red-600">
          {submit.error instanceof Error
            ? submit.error.message
            : 'No se pudo enviar. Inténtalo de nuevo.'}
        </p>
      )}

      <Button type="submit" disabled={submit.isPending}>
        {submit.isPending ? 'Enviando…' : 'Enviar opinión'}
      </Button>
    </form>
  )
}
