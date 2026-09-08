import { useState, type FormEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '../ui'
import { ImageField } from './ImageField'
import { Repeater, type RepeaterSubField } from './Repeater'
import { TagsInput } from './TagsInput'

interface BaseField {
  name: string
  label: string
  help?: string
  required?: boolean
  full?: boolean
}

export type FieldSpec =
  | (BaseField & { type: 'text' | 'textarea' | 'url' | 'date' })
  | (BaseField & { type: 'number' })
  | (BaseField & { type: 'boolean' })
  | (BaseField & { type: 'select'; options: { value: string; label: string }[] })
  | (BaseField & { type: 'tags' })
  | (BaseField & { type: 'image' })
  | (BaseField & { type: 'repeater'; fields: RepeaterSubField[]; addLabel?: string })

export type FormValues = Record<string, unknown>

function Label({ field, children }: { field: FieldSpec; children: ReactNode }) {
  return (
    <label className={cn('block', field.full && 'sm:col-span-2')}>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {field.help && <span className="mt-1 block text-xs text-muted">{field.help}</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-ink'

export function AutoForm({
  fields,
  initial,
  onSubmit,
  onCancel,
  submitting,
  submitLabel = 'Guardar',
}: {
  fields: FieldSpec[]
  initial: FormValues
  onSubmit: (values: FormValues) => void
  onCancel?: () => void
  submitting?: boolean
  submitLabel?: string
}) {
  const [values, setValues] = useState<FormValues>(initial)
  const [error, setError] = useState<string | null>(null)

  const set = (name: string, value: unknown) =>
    setValues((v) => ({ ...v, [name]: value }))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    for (const f of fields) {
      if (f.required) {
        const val = values[f.name]
        const empty =
          val == null ||
          val === '' ||
          (Array.isArray(val) && val.length === 0)
        if (empty) {
          setError(`El campo "${f.label}" es obligatorio.`)
          return
        }
      }
    }
    setError(null)
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const value = values[field.name]
          switch (field.type) {
            case 'textarea':
              return (
                <Label key={field.name} field={field}>
                  <textarea
                    rows={4}
                    value={(value as string) ?? ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    className={inputCls}
                  />
                </Label>
              )
            case 'number':
              return (
                <Label key={field.name} field={field}>
                  <input
                    type="number"
                    value={value === undefined || value === null ? '' : String(value)}
                    onChange={(e) =>
                      set(field.name, e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className={inputCls}
                  />
                </Label>
              )
            case 'boolean':
              return (
                <label
                  key={field.name}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm',
                    field.full && 'sm:col-span-2',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(e) => set(field.name, e.target.checked)}
                    className="h-4 w-4 accent-[color:var(--color-ink)]"
                  />
                  <span className="font-medium">{field.label}</span>
                  {field.help && <span className="text-xs text-muted">— {field.help}</span>}
                </label>
              )
            case 'select':
              return (
                <Label key={field.name} field={field}>
                  <select
                    value={(value as string) ?? ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Selecciona…
                    </option>
                    {field.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Label>
              )
            case 'tags':
              return (
                <Label key={field.name} field={field}>
                  <TagsInput
                    value={(value as string[]) ?? []}
                    onChange={(next) => set(field.name, next)}
                  />
                </Label>
              )
            case 'image':
              return (
                <div key={field.name} className={cn(field.full && 'sm:col-span-2')}>
                  <span className="mb-1.5 block text-sm font-medium text-ink">{field.label}</span>
                  <ImageField
                    value={(value as string) ?? ''}
                    onChange={(url) => set(field.name, url)}
                  />
                </div>
              )
            case 'repeater':
              return (
                <div key={field.name} className={cn(field.full && 'sm:col-span-2')}>
                  <span className="mb-1.5 block text-sm font-medium text-ink">{field.label}</span>
                  <Repeater
                    value={(value as Record<string, string>[]) ?? []}
                    onChange={(next) => set(field.name, next)}
                    fields={field.fields}
                    addLabel={field.addLabel}
                  />
                </div>
              )
            default:
              return (
                <Label key={field.name} field={field}>
                  <input
                    type={field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : 'text'}
                    value={(value as string) ?? ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    className={inputCls}
                  />
                </Label>
              )
          }
        })}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
