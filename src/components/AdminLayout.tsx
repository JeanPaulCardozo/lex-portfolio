import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useAuth } from '@/lib/auth'
import { API_MODE } from '@/lib/api/client'
import { Icon } from './Icon'

const LINKS = [
  { to: '/admin', label: 'Resumen', end: true },
  { to: '/admin/perfil', label: 'Perfil' },
  { to: '/admin/casos', label: 'Casos' },
  { to: '/admin/areas', label: 'Áreas de práctica' },
  { to: '/admin/experiencia', label: 'Trayectoria' },
  { to: '/admin/publicaciones', label: 'Publicaciones' },
  { to: '/admin/testimonios', label: 'Testimonios' },
  { to: '/admin/mensajes', label: 'Mensajes' },
]

export function AdminLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold">Panel de edición</span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-muted">
              API: {API_MODE}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="hidden sm:inline text-muted hover:text-ink">
              Ver sitio ↗
            </a>
            <span className="hidden sm:inline text-muted">{user?.email}</span>
            <button
              onClick={() => {
                logout()
                navigate('/admin/login')
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 hover:border-ink"
            >
              <Icon name="logout" size={15} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-white',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
