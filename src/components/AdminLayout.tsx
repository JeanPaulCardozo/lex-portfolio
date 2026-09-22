import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/queries'
import { useT } from '@/lib/i18n'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'

export function AdminLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { data: profile } = useProfile()
  const profession = profile?.title?.split(' · ')[0] ?? ''
  const t = useT()

  const LINKS = [
    { to: '/admin', label: t('admin.nav.summary'), end: true },
    { to: '/admin/perfil', label: t('admin.nav.profile') },
    { to: '/admin/casos', label: t('admin.nav.cases') },
    { to: '/admin/areas', label: t('admin.nav.areas') },
    { to: '/admin/experiencia', label: t('admin.nav.experience') },
    { to: '/admin/publicaciones', label: t('admin.nav.publications') },
    { to: '/admin/testimonios', label: t('admin.nav.testimonials') },
    { to: '/admin/mensajes', label: t('admin.nav.messages') },
  ]

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-black/20 bg-ink/95 text-white shadow-sm backdrop-blur">
        <div className="container-x flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark name={profile?.fullName ?? 'Panel'} profession={profession} size="sm" onDark />
            <span className="h-5 w-px bg-white/20" />
            <span className="font-display font-semibold">{t('admin.title')}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a
              href={import.meta.env.BASE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline text-white/70 hover:text-white"
            >
              {t('admin.viewSite')}
            </a>
            <span className="hidden sm:inline text-white/70">{user?.email}</span>
            <LanguageSwitcher />
            <button
              onClick={() => {
                logout()
                navigate('/admin/login')
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-white hover:border-white/50"
            >
              <Icon name="logout" size={15} />
              {t('admin.logout')}
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
                    'whitespace-nowrap rounded-lg border-l-2 px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'border-accent bg-ink text-white'
                      : 'border-transparent text-ink-soft hover:bg-white hover:shadow-sm',
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
