import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useProfile } from '@/lib/queries'
import { useT } from '@/lib/i18n'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ButtonLink } from './ui'

function openSearch() {
  window.dispatchEvent(new Event('lex:open-search'))
}

export function Layout() {
  const { data: profile } = useProfile()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const t = useT()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const name = profile?.fullName ?? 'Portafolio'
  const profession = profile?.title?.split(' · ')[0] ?? ''

  const NAV = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/sobre-mi', label: t('nav.about') },
    { to: '/areas', label: t('nav.areas') },
    { to: '/casos', label: t('nav.cases') },
    { to: '/experiencia', label: t('nav.experience') },
    { to: '/publicaciones', label: t('nav.publications') },
  ]

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b border-black/20 bg-ink/95 text-white backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/">
            <BrandMark name={name} profession={profession} onDark />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    isActive ? 'bg-accent text-ink' : 'text-white/75 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/70 hover:border-white/50 hover:text-white"
            >
              <Icon name="search" size={15} />
              {t('nav.search')}
              <kbd className="ml-1 rounded border border-white/20 bg-white/10 px-1.5 text-[11px] font-sans text-white/70">
                ⌘K
              </kbd>
            </button>
            <span className="hidden sm:inline-flex">
              <LanguageSwitcher />
            </span>
            <ButtonLink to="/contacto" size="sm" className="hidden sm:inline-flex">
              {t('nav.contact')}
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-white"
              aria-label={t('nav.openMenu')}
              aria-expanded={open}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 bg-ink">
            <nav className="container-x flex flex-col py-3">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2.5 text-sm',
                      isActive ? 'bg-accent text-ink' : 'text-white/75',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-2 px-1">
                <button
                  onClick={openSearch}
                  className="flex-1 rounded-lg border border-white/20 px-3 py-2.5 text-sm text-white/70"
                >
                  {t('nav.search')} (⌘K)
                </button>
                <LanguageSwitcher />
              </div>
              <div className="mt-2 px-1">
                <ButtonLink to="/contacto" size="sm" className="w-full">
                  {t('nav.contact')}
                </ButtonLink>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter name={name} profession={profession} />
    </div>
  )
}

function SiteFooter({ name, profession }: { name: string; profession: string }) {
  const t = useT()
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark name={name} profession={profession} />
        <div className="flex flex-col gap-2 text-sm text-muted sm:items-end">
          <div className="flex items-center gap-4">
            <Link to="/contacto" className="hover:text-ink">
              {t('footer.contact')}
            </Link>
            <Link to="/admin" className="hover:text-ink">
              {t('footer.panel')}
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {name}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
