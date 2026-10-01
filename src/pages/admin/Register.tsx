import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api/client'
import { useProfile } from '@/lib/queries'
import { useT } from '@/lib/i18n'
import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/ui'

export default function Register() {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const { data: profile } = useProfile()
  const t = useT()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (status === 'authenticated') {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'))
      return
    }

    setBusy(true)
    try {
      await api.register(email, password)
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : t('register.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 block text-sm text-muted hover:text-ink">
          {t('login.backToSite')}
        </Link>
        <BrandMark
          name={profile?.full_name ?? 'Portafolio'}
          profession={profile?.title?.split(' · ')[0]}
          size="lg"
          className="mb-6"
        />
        <h1 className="font-display text-2xl font-semibold">{t('register.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('register.subtitle')}</p>

        <div className="mt-6 rounded-2xl border border-line bg-card p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{t('login.email')}</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/25"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{t('login.password')}</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/25"
              />
              <span className="mt-1 block text-xs text-muted">{t('register.passwordHelp')}</span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{t('register.confirmPassword')}</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/25"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={busy} className="w-full">
              {busy ? t('register.submitting') : t('register.submit')}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted">
            {t('register.hasAccount')}{' '}
            <Link to="/admin/login" className="font-medium text-accent-ink hover:underline">
              {t('login.submit')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
