import { useRef, useState } from 'react'
import { api } from '@/lib/api/client'
import { Icon } from '../Icon'

export function ImageField({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const { url } = await api.uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo subir la imagen')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-paper">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <Icon name="spark" size={18} className="text-muted" />
        )}
      </div>
      <div className="space-y-1">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="rounded-full border border-line-strong px-3 py-1.5 text-sm hover:border-ink disabled:opacity-50"
          >
            {busy ? 'Subiendo…' : value ? 'Cambiar' : 'Subir imagen'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-full px-3 py-1.5 text-sm text-muted hover:text-ink"
            >
              Quitar
            </button>
          )}
        </div>
        <p className="text-xs text-muted">
          También puedes pegar una URL en el campo de texto de abajo.
        </p>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-lg border border-line-strong bg-white px-3 py-1.5 text-sm outline-none focus:border-ink"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
    </div>
  )
}
