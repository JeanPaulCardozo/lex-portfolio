import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useProfile } from '@/lib/queries'
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

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white text-sm">
              {name.trim().charAt(0) || 'A'}
            </span>
            <span className="hidden sm:block">{name}</span>
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
                    isActive ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink hover:bg-white',
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-sm text-muted hover:border-ink hover:text-ink"
            >
              <Icon name="search" size={15} />
              Buscar
              <kbd className="ml-1 rounded border border-line-strong bg-white px-1.5 text-[11px] font-sans text-muted">
                ⌘K
              </kbd>
            </button>
            <ButtonLink to="/contacto" size="sm" className="hidden sm:inline-flex">
              Contactar
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-line-strong"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-line bg-paper">
            <nav className="container-x flex flex-col py-3">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2.5 text-sm',
                      isActive ? 'bg-ink text-white' : 'text-ink-soft',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2 px-1">
                <button
                  onClick={openSearch}
                  className="flex-1 rounded-lg border border-line-strong px-3 py-2.5 text-sm text-muted"
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

      <SiteFooter name={name} />
    </div>
  )
}

function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {name}. Portafolio profesional.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/contacto" className="hover:text-ink">
            Contacto
          </Link>
          <Link to="/admin" className="hover:text-ink">
            Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}
