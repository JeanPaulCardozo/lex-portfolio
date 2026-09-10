import type {
  ApiClient,
  Case,
  CaseQuery,
  Collection,
  ContactInput,
  Experience,
  Message,
  PracticeArea,
  Profile,
  Publication,
  Testimonial,
  TestimonialSubmitInput,
} from './types'

const TOKEN_KEY = 'lex_token'
const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

const RESOURCE_PATH: Record<Collection, string> = {
  cases: 'cases',
  'practice-areas': 'practice-areas',
  experience: 'experience',
  publications: 'publications',
  testimonials: 'testimonials',
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function authHeader(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body && !(init.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...authHeader(),
      ...(init.headers || {}),
    },
  })

  if (res.status === 204) return undefined as T

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await res.json().catch(() => null) : await res.text()

  if (!res.ok) {
    const message =
      (isJson && payload && (payload.message || payload.error || payload.detail)) ||
      `Error ${res.status}`
    throw new ApiError(String(message), res.status)
  }
  return payload as T
}

function qs(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  )
  if (!entries.length) return ''
  const sp = new URLSearchParams()
  for (const [k, v] of entries) sp.set(k, String(v))
  return `?${sp.toString()}`
}

/**
 * Adaptador HTTP: consume la API REST descrita en API_CONTRACT.md.
 * Se activa con VITE_API_MODE=live.
 */
export const httpClient: ApiClient = {
  isMock: false,

  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => request('/auth/me'),

  getProfile: () => request<Profile>('/profile'),
  updateProfile: (data) =>
    request<Profile>('/profile', { method: 'PUT', body: JSON.stringify(data) }),

  listAreas: () => request<PracticeArea[]>('/practice-areas'),
  getArea: (slug) => request<PracticeArea>(`/practice-areas/${slug}`),

  listCases: (params: CaseQuery = {}) =>
    request<Case[]>(`/cases${qs(params as Record<string, unknown>)}`),
  getCase: (slug) => request<Case>(`/cases/${slug}`),

  listExperience: () => request<Experience[]>('/experience'),
  listPublications: () => request<Publication[]>('/publications'),
  listTestimonials: () => request<Testimonial[]>('/testimonials'),
  listAllTestimonials: () => request<Testimonial[]>('/testimonials?all=1'),
  submitTestimonial: (data: TestimonialSubmitInput) =>
    request<{ ok: true }>('/testimonials/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  create: (resource, data) =>
    request(`/${RESOURCE_PATH[resource]}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (resource, id, data) =>
    request(`/${RESOURCE_PATH[resource]}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (resource, id) =>
    request(`/${RESOURCE_PATH[resource]}/${id}`, { method: 'DELETE' }),

  submitContact: (data: ContactInput) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  listMessages: () => request<Message[]>('/messages'),
  updateMessage: (id, data) =>
    request<Message>(`/messages/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  removeMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),

  uploadImage: (file) => {
    const form = new FormData()
    form.append('file', file)
    return request<{ url: string }>('/uploads', { method: 'POST', body: form })
  },

  resetDemo: () =>
    Promise.reject(new Error('resetDemo solo está disponible en modo mock')),
}
