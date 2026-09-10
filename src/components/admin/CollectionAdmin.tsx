import { useState, type ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Collection } from '@/lib/api/types'
import { useCreate, useRemove, useUpdate } from '@/lib/queries'
import { AutoForm, type FieldSpec, type FormValues } from '../form/AutoForm'
import { Button, EmptyState, ErrorState, Spinner, Toast } from '../ui'
import { Icon } from '../Icon'
import { Drawer } from './Drawer'

type BadgeTone = 'accent' | 'muted' | 'warn'

const BADGE_CLS: Record<BadgeTone, string> = {
  accent: 'bg-accent-soft text-accent-ink',
  muted: 'bg-stone-100 text-muted',
  warn: 'bg-amber-100 text-amber-800',
}

export interface CollectionConfig<T extends { id: string }> {
  resource: Collection
  title: string
  singular: string
  description?: string
  useList: () => UseQueryResult<T[]>
  fields: FieldSpec[]
  /** Celdas de resumen que se muestran en la lista. */
  primary: (row: T) => ReactNode
  secondary?: (row: T) => ReactNode
  /** Píldora opcional junto al título (p. ej. «Destacado», «Pendiente»). */
  badge?: (row: T) => { label: string; tone?: BadgeTone } | null
  /** Valores por defecto de un registro nuevo. */
  blank: FormValues
  /** row -> valores del formulario (por defecto, el propio row). */
  toForm?: (row: T) => FormValues
}

export function CollectionAdmin<T extends { id: string }>({
  config,
}: {
  config: CollectionConfig<T>
}) {
  const {
    resource,
    title,
    singular,
    description,
    useList,
    fields,
    primary,
    secondary,
    badge,
    blank,
  } = config
  const list = useList()
  const create = useCreate(resource)
  const update = useUpdate(resource)
  const remove = useRemove(resource)

  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const submitting = create.isPending || update.isPending

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  async function handleSubmit(values: FormValues) {
    if (editing === 'new') {
      await create.mutateAsync(values)
      flash(`${singular} creado`)
    } else if (editing) {
      await update.mutateAsync({ id: editing.id, data: values })
      flash(`${singular} actualizado`)
    }
    setEditing(null)
  }

  async function handleDelete(row: T) {
    if (!window.confirm(`¿Eliminar este ${singular.toLowerCase()}? Esta acción no se puede deshacer.`)) {
      return
    }
    await remove.mutateAsync(row.id)
    flash(`${singular} eliminado`)
  }

  const rows = list.data ?? []

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        <Button size="sm" onClick={() => setEditing('new')}>
          <Icon name="plus" size={15} /> Nuevo
        </Button>
      </header>

      {list.isLoading && <Spinner />}
      {list.isError && <ErrorState error={list.error} onRetry={() => list.refetch()} />}

      {!list.isLoading && !list.isError && rows.length === 0 && (
        <EmptyState title={`Aún no hay ${title.toLowerCase()}`} hint="Pulsa «Nuevo» para añadir el primero." />
      )}

      {rows.length > 0 && (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
          {rows.map((row) => {
            const b = badge?.(row) ?? null
            return (
            <li key={row.id} className="flex items-center gap-4 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate font-medium">
                  <span className="truncate">{primary(row)}</span>
                  {b && (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        BADGE_CLS[b.tone ?? 'accent']
                      }`}
                    >
                      {b.label}
                    </span>
                  )}
                </p>
                {secondary && <p className="truncate text-sm text-muted">{secondary(row)}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => setEditing(row)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-soft hover:bg-paper hover:text-ink"
                >
                  <Icon name="edit" size={14} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(row)}
                  className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600"
                  aria-label="Eliminar"
                >
                  <Icon name="trash" size={15} />
                </button>
              </div>
            </li>
            )
          })}
        </ul>
      )}

      <Drawer
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? `Nuevo · ${singular}` : `Editar · ${singular}`}
      >
        {editing !== null && (
          <AutoForm
            fields={fields}
            initial={
              editing === 'new'
                ? blank
                : config.toForm
                  ? config.toForm(editing)
                  : (editing as unknown as FormValues)
            }
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        )}
      </Drawer>

      {toast && <Toast>{toast}</Toast>}
    </div>
  )
}
