import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAreas, useCases, usePublications } from '@/lib/queries'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

interface Item {
  id: string
  title: string
  group: string
  to: string
  keywords: string
}

const STATIC: Item[] = [
  { id: 'nav-home', title: 'Inicio', group: 'Navegación', to: '/', keywords: 'inicio home' },
  { id: 'nav-about', title: 'Sobre mí', group: 'Navegación', to: '/sobre-mi', keywords: 'bio perfil trayectoria' },
  { id: 'nav-areas', title: 'Áreas de práctica', group: 'Navegación', to: '/areas', keywords: 'servicios materias' },
  { id: 'nav-cases', title: 'Casos y resultados', group: 'Navegación', to: '/casos', keywords: 'resultados expediente' },
  { id: 'nav-exp', title: 'Trayectoria', group: 'Navegación', to: '/experiencia', keywords: 'experiencia cv' },
  { id: 'nav-pub', title: 'Publicaciones', group: 'Navegación', to: '/publicaciones', keywords: 'articulos ponencias' },
  { id: 'nav-contact', title: 'Contacto', group: 'Navegación', to: '/contacto', keywords: 'email telefono cita' },
]

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[^ -~]/g, '')
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { data: areas = [] } = useAreas()
  const { data: cases = [] } = useCases()
  const { data: publications = [] } = usePublications()

  const items = useMemo<Item[]>(() => {
    const areaItems: Item[] = areas.map((a) => ({
      id: `area-${a.id}`,
      title: a.name,
      group: 'Áreas',
      to: `/areas/${a.slug}`,
      keywords: normalize(`${a.name} ${a.summary}`),
    }))
    const caseItems: Item[] = cases.map((c) => ({
      id: `case-${c.id}`,
      title: c.title,
      group: 'Casos',
      to: `/casos/${c.slug}`,
      keywords: normalize(`${c.title} ${c.area} ${c.outcome} ${c.skills.join(' ')} ${c.year}`),
    }))
    const pubItems: Item[] = publications.map((p) => ({
      id: `pub-${p.id}`,
      title: p.title,
      group: 'Publicaciones',
      to: '/publicaciones',
      keywords: normalize(`${p.title} ${p.venue} ${p.summary}`),
    }))
    return [...STATIC, ...areaItems, ...caseItems, ...pubItems]
  }, [areas, cases, publications])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return items.slice(0, 8)
    return items
      .filter((it) => normalize(it.title).includes(q) || it.keywords.includes(q))
      .slice(0, 12)
  }, [items, query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('lex:open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('lex:open-search', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  function go(to: string) {
    setOpen(false)
    navigate(to)
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active].to)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="search" size={18} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Busca casos, áreas, publicaciones…"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line-strong bg-paper px-1.5 text-[11px] text-muted">
            Esc
          </kbd>
        </div>

        <ul className="max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">Sin resultados</li>
          )}
          {results.map((it, i) => (
            <li key={it.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(it.to)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm',
                  i === active ? 'bg-accent-soft text-accent-ink' : 'hover:bg-paper',
                )}
              >
                <span className="truncate">{it.title}</span>
                <span className="shrink-0 text-xs text-muted">{it.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
