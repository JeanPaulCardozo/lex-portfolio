import { Icon } from '../Icon'

export interface RepeaterSubField {
  name: string
  label: string
  type?: 'text' | 'textarea'
}

type Row = Record<string, string>

export function Repeater({
  value,
  onChange,
  fields,
  addLabel = 'Añadir',
}: {
  value: Row[]
  onChange: (next: Row[]) => void
  fields: RepeaterSubField[]
  addLabel?: string
}) {
  const rows = value ?? []

  function update(index: number, key: string, val: string) {
    onChange(rows.map((row, i) => (i === index ? { ...row, [key]: val } : row)))
  }

  function add() {
    onChange([...rows, Object.fromEntries(fields.map((f) => [f.name, ''])) as Row])
  }

  function remove(index: number) {
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="rounded-lg border border-line bg-paper p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name} className="block text-sm">
                <span className="mb-1 block text-xs font-medium text-muted">{f.label}</span>
                {f.type === 'textarea' ? (
                  <textarea
                    value={row[f.name] ?? ''}
                    onChange={(e) => update(i, f.name, e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-line-strong bg-white px-2.5 py-1.5 text-sm outline-none focus:border-ink"
                  />
                ) : (
                  <input
                    value={row[f.name] ?? ''}
                    onChange={(e) => update(i, f.name, e.target.value)}
                    className="w-full rounded-md border border-line-strong bg-white px-2.5 py-1.5 text-sm outline-none focus:border-ink"
                  />
                )}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-2 inline-flex items-center gap-1 text-xs text-muted hover:text-red-600"
          >
            <Icon name="trash" size={13} /> Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1.5 text-sm text-muted hover:border-ink hover:text-ink"
      >
        <Icon name="plus" size={14} /> {addLabel}
      </button>
    </div>
  )
}
