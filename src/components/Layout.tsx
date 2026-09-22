import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useProfile } from '@/lib/queries'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'
import { ButtonLink } from './ui'

const NAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/areas', label: 'Áreas' },
  { to: '/casos', label: 'Casos' },
  { to: '/experiencia', label: 'Trayectoria' },
  { to: '/publicaciones', label: 'Publicaciones' },
]

function openSearch() {
  window.dispatchEvent(new Event('lex:open-search'))
}

export function Layout() {
  const { data: profile } = useProfile()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const name = profile?.fullName ?? 'Portafolio'
  const profession = profile?.title?.split(' · ')[0] ?? ''

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
              Buscar
              <kbd className="ml-1 rounded border border-white/20 bg-white/10 px-1.5 text-[11px] font-sans text-white/70">
                ⌘K
              </kbd>
            </button>
            <ButtonLink to="/contacto" size="sm" className="hidden sm:inline-flex">
              Contactar
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-white"
              aria-label="Abrir menú"
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
              <div className="mt-2 flex gap-2 px-1">
                <button
                  onClick={openSearch}
                  className="flex-1 rounded-lg border border-white/20 px-3 py-2.5 text-sm text-white/70"
                >
                  Buscar (⌘K)
                </button>
                <ButtonLink to="/contacto" size="sm" className="flex-1">
                  Contactar
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
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark name={name} profession={profession} />
        <div className="flex flex-col gap-2 text-sm text-muted sm:items-end">
          <div className="flex items-center gap-4">
            <Link to="/contacto" className="hover:text-ink">
              Contacto
            </Link>
            <Link to="/admin" className="hover:text-ink">
              Panel
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {name}. Portafolio profesional.
          </p>
        </div>
      </div>
    </footer>
  )
}
