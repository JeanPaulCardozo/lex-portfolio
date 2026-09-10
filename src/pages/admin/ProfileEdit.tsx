import { useState } from 'react'
import type { Profile } from '@/lib/api/types'
import { useProfile, useUpdateProfile } from '@/lib/queries'
import { AutoForm, type FieldSpec, type FormValues } from '@/components/form/AutoForm'
import { ErrorState, Spinner, Toast } from '@/components/ui'

const fields: FieldSpec[] = [
  { name: 'fullName', label: 'Nombre completo', type: 'text', required: true, full: true },
  {
    name: 'title',
    label: 'Titular profesional',
    type: 'text',
    required: true,
    full: true,
    help: 'P. ej. Abogada laboralista y de extranjería.',
  },
  {
    name: 'headline',
    label: 'Frase de presentación',
    type: 'textarea',
    required: true,
    full: true,
    help: 'Una o dos frases que resuman a quién ayudas y cómo.',
  },
  { name: 'summary', label: 'Biografía', type: 'textarea', full: true },
  { name: 'location', label: 'Ubicación', type: 'text' },
  { name: 'email', label: 'Correo de contacto', type: 'text', required: true },
  {
    name: 'notifyEmail',
    label: 'Correo para avisos',
    type: 'text',
    help: 'Dónde recibes el aviso de nuevas consultas y testimonios. Si lo dejas vacío se usa tu correo de contacto. No se muestra en el sitio.',
  },
  { name: 'phone', label: 'Teléfono', type: 'text' },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    type: 'text',
    help: 'Número con prefijo internacional (573001234567) o tu usuario de WhatsApp (@usuario).',
  },
  { name: 'linkedin', label: 'LinkedIn (URL)', type: 'url', full: true },
  { name: 'avatarUrl', label: 'Fotografía', type: 'image', full: true },
  {
    name: 'cvUrl',
    label: 'CV (URL a PDF)',
    type: 'url',
    full: true,
    help: 'Enlace público a tu currículum en PDF.',
  },
  { name: 'languages', label: 'Idiomas', type: 'tags', full: true },
  { name: 'barAdmissions', label: 'Colegiación y habilitaciones', type: 'tags', full: true },
  {
    name: 'education',
    label: 'Formación',
    type: 'repeater',
    full: true,
    addLabel: 'Añadir estudio',
    fields: [
      { name: 'degree', label: 'Título' },
      { name: 'institution', label: 'Institución' },
      { name: 'year', label: 'Año' },
    ],
  },
  {
    name: 'stats',
    label: 'Indicadores (portada)',
    type: 'repeater',
    full: true,
    addLabel: 'Añadir indicador',
    fields: [
      { name: 'label', label: 'Etiqueta' },
      { name: 'value', label: 'Valor' },
    ],
  },
]

export default function ProfileEdit() {
  const { data: profile, isLoading, isError, error, refetch } = useProfile()
  const update = useUpdateProfile()
  const [toast, setToast] = useState(false)

  if (isLoading) return <Spinner />
  if (isError || !profile) return <ErrorState error={error} onRetry={() => refetch()} />

  async function onSubmit(values: FormValues) {
    await update.mutateAsync(values as unknown as Profile)
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Perfil</h1>
        <p className="mt-1 text-sm text-muted">
          Estos datos aparecen en la portada, en «Sobre mí» y en la página de contacto.
        </p>
      </header>

      <div className="rounded-2xl border border-line bg-card p-6">
        <AutoForm
          fields={fields}
          initial={profile as unknown as FormValues}
          onSubmit={onSubmit}
          submitting={update.isPending}
          submitLabel="Guardar perfil"
        />
      </div>

      {toast && <Toast>Perfil guardado</Toast>}
    </div>
  )
}
