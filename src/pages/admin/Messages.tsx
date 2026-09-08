import { useState } from 'react'
import { useMessages, useRemoveMessage, useUpdateMessage } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import { EmptyState, ErrorState, Spinner } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'

export default function Messages() {
  const { data: messages = [], isLoading, isError, error, refetch } = useMessages()
  const updateMsg = useUpdateMessage()
  const removeMsg = useRemoveMessage()
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string, read: boolean) {
    setOpenId((cur) => (cur === id ? null : id))
    if (!read) updateMsg.mutate({ id, data: { read: true } })
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Mensajes</h1>
        <p className="mt-1 text-sm text-muted">Consultas recibidas desde el formulario de contacto.</p>
      </header>

      {isLoading && <Spinner />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {!isLoading && !isError && messages.length === 0 && (
        <EmptyState title="Todavía no has recibido mensajes" />
      )}

      <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
        {messages.map((m) => {
          const open = openId === m.id
          return (
            <li key={m.id} className={cn(!m.read && 'bg-accent-soft/40')}>
              <button
                onClick={() => toggle(m.id, m.read)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                <span className={cn('shrink-0 font-medium', m.read && 'ml-5')}>{m.name}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-muted">{m.message}</span>
                <span className="hidden shrink-0 text-xs text-muted sm:block">
                  {formatDate(m.createdAt.slice(0, 10))}
                </span>
                <Icon name="chevronDown" size={15} className={cn('shrink-0 text-muted', open && 'rotate-180')} />
              </button>

              {open && (
                <div className="space-y-3 border-t border-line px-4 py-4 text-sm">
                  <p className="whitespace-pre-wrap leading-relaxed text-ink-soft">{m.message}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <a href={`mailto:${m.email}`} className="text-accent-ink underline">
                      {m.email}
                    </a>
                    {m.phone && <span>{m.phone}</span>}
                    <span>{new Date(m.createdAt).toLocaleString('es-ES')}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <a
                      href={`mailto:${m.email}?subject=Re: tu consulta`}
                      className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white hover:bg-ink-soft"
                    >
                      Responder
                    </a>
                    <button
                      onClick={() => updateMsg.mutate({ id: m.id, data: { read: !m.read } })}
                      className="rounded-full border border-line-strong px-3 py-1.5 text-xs hover:border-ink"
                    >
                      Marcar como {m.read ? 'no leído' : 'leído'}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Eliminar este mensaje?')) removeMsg.mutate(m.id)
                      }}
                      className="rounded-full px-3 py-1.5 text-xs text-muted hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
