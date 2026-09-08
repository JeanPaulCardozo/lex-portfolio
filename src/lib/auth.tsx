import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, TOKEN_KEY } from './api/client'
import type { User } from './api/types'

interface AuthState {
  user: User | null
  token: string | null
  status: 'loading' | 'authenticated' | 'anonymous'
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthState['status']>(token ? 'loading' : 'anonymous')

  useEffect(() => {
    let cancelled = false
    if (!token) {
      setStatus('anonymous')
      setUser(null)
      return
    }
    setStatus('loading')
    api
      .me()
      .then((u) => {
        if (cancelled) return
        setUser(u)
        setStatus('authenticated')
      })
      .catch(() => {
        if (cancelled) return
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        setUser(null)
        setStatus('anonymous')
      })
    return () => {
      cancelled = true
    }
  }, [token])

  const login = useCallback(async (email: string, password: string) => {
    const { token: t, user: u } = await api.login(email, password)
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
    setUser(u)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setStatus('anonymous')
  }, [])

  const value = useMemo<AuthState>(
    () => ({ user, token, status, login, logout }),
    [user, token, status, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
