import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import {
  useAllTestimonials,
  useAreas,
  useCases,
  useMessages,
  usePublications,
  useProfile,
} from '@/lib/queries'
import { Button, Toast } from '@/components/ui'

export default function Dashboard() {
  const { data: profile } = useProfile()
  const { data: cases = [] } = useCases()
  const { data: areas = [] } = useAreas()
  const { data: publications = [] } = usePublications()
  const { data: messages = [] } = useMessages()
  const { data: testimonials = [] } = useAllTestimonials()
  const qc = useQueryClient()
  const [toast, setToast] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const unread = messages.filter((m) => !m.read).length
  const pendingTestimonials = testimonials.filter((t) => t.status === 'pending').length

  const stats = [
    { label: 'Casos', value: cases.length, to: '/admin/casos' },
    { label: 'Áreas de práctica', value: areas.length, to: '/admin/areas' },
    { label: 'Publicaciones', value: publications.length, to: '/admin/publicaciones' },
    { label: 'Testimonios pendientes', value: pendingTestimonials, to: '/admin/testimonios' },
    { label: 'Mensajes sin leer', value: unread, to: '/admin/mensajes' },
  ]

  async function resetDemo() {
    if (!window.confirm('Esto restaura todos los datos de demostración y descarta tus cambios. ¿Continuar?')) {
      return
    }
    setBusy(true)
    try {
      await api.resetDemo()
      await qc.invalidateQueries()
      setToast('Datos de demostración restaurados')
      setTimeout(() => setToast(null), 2200)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">
        Hola{profile ? `, ${profile.fullName.split(' ')[0]}` : ''}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Desde aquí gestionas todo lo que se muestra en tu portafolio público.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-2xl border border-line bg-card p-5 transition-colors hover:border-ink"
          >
            <p className="font-display text-3xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <section className="rounded-2xl border border-line bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Últimos mensajes</h2>
            <Link to="/admin/mensajes" className="text-sm text-accent-ink underline">
              Ver todos
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Sin mensajes todavía.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {messages.slice(0, 4).map((m) => (
                <li key={m.id} className="flex items-center gap-2">
                  {!m.read && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  <span className="font-medium">{m.name}</span>
                  <span className="truncate text-muted">— {m.message}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {api.isMock && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-line-strong bg-card p-5">
          <div>
            <p className="text-sm font-medium">Datos de demostración</p>
            <p className="text-sm text-muted">
              Útil antes de una entrevista: deja el portafolio con el contenido de ejemplo original.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetDemo} disabled={busy}>
            {busy ? 'Restaurando…' : 'Restaurar datos de demo'}
          </Button>
        </div>
      )}

      {toast && <Toast>{toast}</Toast>}
    </div>
  )
}
