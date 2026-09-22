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
import { useT } from '@/lib/i18n'

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
  const t = useT()

  const unread = messages.filter((m) => !m.read).length
  const pendingTestimonials = testimonials.filter((item) => item.status === 'pending').length

  const stats = [
    { label: t('dashboard.cases'), value: cases.length, to: '/admin/casos' },
    { label: t('dashboard.areas'), value: areas.length, to: '/admin/areas' },
    { label: t('dashboard.publications'), value: publications.length, to: '/admin/publicaciones' },
    { label: t('dashboard.pendingTestimonials'), value: pendingTestimonials, to: '/admin/testimonios' },
    { label: t('dashboard.unreadMessages'), value: unread, to: '/admin/mensajes' },
  ]

  async function resetDemo() {
    if (!window.confirm(t('dashboard.demoConfirm'))) {
      return
    }
    setBusy(true)
    try {
      await api.resetDemo()
      await qc.invalidateQueries()
      setToast(t('dashboard.demoRestored'))
      setTimeout(() => setToast(null), 2200)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">
        {t('dashboard.greeting')}
        {profile ? `, ${profile.fullName.split(' ')[0]}` : ''}
      </h1>
      <p className="mt-1 text-sm text-muted">{t('dashboard.subtitle')}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-2xl border border-line bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
          >
            <p className="font-display text-3xl font-semibold text-accent-ink">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{t('dashboard.recentMessages')}</h2>
            <Link to="/admin/mensajes" className="text-sm text-accent-ink underline">
              {t('dashboard.viewAll')}
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{t('dashboard.noMessages')}</p>
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
            <p className="text-sm font-medium">{t('dashboard.demoTitle')}</p>
            <p className="text-sm text-muted">{t('dashboard.demoBody')}</p>
          </div>
          <Button variant="outline" size="sm" onClick={resetDemo} disabled={busy}>
            {busy ? t('dashboard.demoRestoring') : t('dashboard.demoRestore')}
          </Button>
        </div>
      )}

      {toast && <Toast>{toast}</Toast>}
    </div>
  )
}
