import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCases } from '@/lib/queries'
import { CaseCard, RESULT_LABEL } from '@/components/CaseCard'
import { Icon } from '@/components/Icon'
import { EmptyState, ErrorState, Section, Spinner } from '@/components/ui'
import { cn } from '@/lib/cn'

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[^ -~]/g, '')
}

export default function Cases() {
  const { data: cases = [], isLoading, isError, error, refetch } = useCases()
  const [params, setParams] = useSearchParams()

  const q = params.get('q') ?? ''
  const area = params.get('area') ?? ''
  const year = params.get('year') ?? ''
  const type = params.get('type') ?? ''

  function patch(next: Record<string, string>) {
    const merged = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      if (v) merged.set(k, v)
      else merged.delete(k)
    }
    setParams(merged, { replace: true })
  }

  const areaOptions = useMemo(
    () => [...new Set(cases.map((c) => c.area))].sort(),
    [cases],
  )
  const yearOptions = useMemo(
    () => [...new Set(cases.map((c) => c.year))].sort((a, b) => b - a),
    [cases],
  )

  const filtered = useMemo(() => {
    const needle = normalize(q.trim())
    return cases.filter((c) => {
      if (area && c.area !== area) return false
      if (year && String(c.year) !== year) return false
      if (type && c.resultType !== type) return false
      if (needle) {
        const hay = normalize(
          [c.title, c.area, c.role, c.outcome, c.situation, c.action, c.result, c.skills.join(' ')].join(' '),
        )
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [cases, q, area, year, type])

  const hasFilters = Boolean(q || area || year || type)

  return (
    <Section
      label="Resultados"
      title="Casos"
      intro="Búsqueda instantánea. Filtra por área, año y tipo de resultado; la URL guarda el filtro para compartirlo."
    >
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-line-strong bg-white px-3">
          <Icon name="search" size={16} className="text-muted" />
          <input
            value={q}
            onChange={(e) => patch({ q: e.target.value })}
            placeholder="Buscar por palabra clave…"
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </div>

        <select
          value={area}
          onChange={(e) => patch({ area: e.target.value })}
          className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Todas las áreas</option>
          {areaOptions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => patch({ year: e.target.value })}
          className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Cualquier año</option>
          {yearOptions.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => patch({ type: e.target.value })}
          className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Cualquier resultado</option>
          {Object.entries(RESULT_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setParams(new URLSearchParams(), { replace: true })}
          className={cn(
            'rounded-lg px-3 py-2 text-sm text-muted transition-opacity hover:text-ink',
            !hasFilters && 'pointer-events-none opacity-0',
          )}
        >
          Limpiar
        </button>
      </div>

      <p className="mb-4 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? 'caso' : 'casos'}
        {hasFilters && ` de ${cases.length}`}
      </p>

      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState title="Ningún caso coincide con el filtro" hint="Prueba a quitar algún criterio." />
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CaseCard key={c.id} item={c} />
        ))}
      </div>
    </Section>
  )
}
