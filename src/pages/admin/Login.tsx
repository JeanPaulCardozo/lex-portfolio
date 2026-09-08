import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { API_MODE, api } from '@/lib/api/client'
import { DEMO_CREDENTIALS } from '@/lib/api/seed'
import { Button } from '@/components/ui'

export default function Login() {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }

  const demo = api.isMock
  const [email, setEmail] = useState(demo ? DEMO_CREDENTIALS.email : '')
  const [password, setPassword] = useState(demo ? DEMO_CREDENTIALS.password : '')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (status === 'authenticated') {
    return <Navigate to={location.state?.from ?? '/admin'} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await login(email, password)
      navigate(location.state?.from ?? '/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 block text-sm text-muted hover:text-ink">
          ← Volver al sitio
        </Link>
        <h1 className="font-display text-2xl font-semibold">Panel de edición</h1>
        <p className="mt-1 text-sm text-muted">Acceso privado del titular del portafolio.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Correo</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={busy} className="w-full">
            {busy ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>

        {demo && (
          <p className="mt-4 rounded-lg bg-accent-soft px-3 py-2 text-xs text-accent-ink">
            Modo demostración ({API_MODE}). Credenciales precargadas:{' '}
            <code className="font-mono">{DEMO_CREDENTIALS.email}</code> /{' '}
            <code className="font-mono">{DEMO_CREDENTIALS.password}</code>
          </p>
        )}
      </div>
    </div>
  )
}
