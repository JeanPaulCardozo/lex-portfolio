import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAreas, useCases, usePublications } from '@/lib/queries'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { Icon } from './Icon'

interface Item {
  id: string
  title: string
  group: string
  to: string
  keywords: string
}

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
  const t = useT()

  const items = useMemo<Item[]>(() => {
    const nav = t('palette.groupNav')
    const STATIC: Item[] = [
      { id: 'nav-home', title: t('palette.itemHome'), group: nav, to: '/', keywords: 'inicio home' },
      { id: 'nav-about', title: t('palette.itemAbout'), group: nav, to: '/sobre-mi', keywords: 'bio perfil trayectoria about' },
      { id: 'nav-areas', title: t('palette.itemAreas'), group: nav, to: '/areas', keywords: 'servicios materias areas' },
      { id: 'nav-cases', title: t('palette.itemCases'), group: nav, to: '/casos', keywords: 'resultados expediente cases' },
      { id: 'nav-exp', title: t('palette.itemExperience'), group: nav, to: '/experiencia', keywords: 'experiencia cv experience' },
      { id: 'nav-pub', title: t('palette.itemPublications'), group: nav, to: '/publicaciones', keywords: 'articulos ponencias publications' },
      { id: 'nav-contact', title: t('palette.itemContact'), group: nav, to: '/contacto', keywords: 'email telefono cita contact' },
    ]
    const areaItems: Item[] = areas.map((a) => ({
      id: `area-${a.id}`,
      title: a.name,
      group: t('palette.groupAreas'),
      to: `/areas/${a.slug}`,
      keywords: normalize(`${a.name} ${a.summary}`),
    }))
    const caseItems: Item[] = cases.map((c) => ({
      id: `case-${c.id}`,
      title: c.title,
      group: t('palette.groupCases'),
      to: `/casos/${c.slug}`,
      keywords: normalize(`${c.title} ${c.area} ${c.outcome} ${c.skills.join(' ')} ${c.year}`),
    }))
    const pubItems: Item[] = publications.map((p) => ({
      id: `pub-${p.id}`,
      title: p.title,
      group: t('palette.groupPublications'),
      to: '/publicaciones',
      keywords: normalize(`${p.title} ${p.venue} ${p.summary}`),
    }))
    return [...STATIC, ...areaItems, ...caseItems, ...pubItems]
  }, [areas, cases, publications, t])

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
            placeholder={t('palette.placeholder')}
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line-strong bg-paper px-1.5 text-[11px] text-muted">
            Esc
          </kbd>
        </div>

        <ul className="max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">{t('palette.noResults')}</li>
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
