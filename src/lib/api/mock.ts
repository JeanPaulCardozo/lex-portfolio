import { slugify } from '@/lib/format'
import {
  DEMO_CREDENTIALS,
  seedAreas,
  seedCases,
  seedExperience,
  seedMessages,
  seedProfile,
  seedPublications,
  seedTestimonials,
} from './seed'
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
  User,
} from './types'

const DB_KEY = 'lex_db_v1'
const TOKEN_KEY = 'lex_token'

interface DB {
  profile: Profile
  cases: Case[]
  areas: PracticeArea[]
  experience: Experience[]
  publications: Publication[]
  testimonials: Testimonial[]
  messages: Message[]
}

function freshDB(): DB {
  // clon profundo para no mutar las semillas importadas
  return structuredClone({
    profile: seedProfile,
    cases: seedCases,
    areas: seedAreas,
    experience: seedExperience,
    publications: seedPublications,
    testimonials: seedTestimonials,
    messages: seedMessages,
  })
}

function load(): DB {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) {
      const db = freshDB()
      localStorage.setItem(DB_KEY, JSON.stringify(db))
      return db
    }
    return JSON.parse(raw) as DB
  } catch {
    return freshDB()
  }
}

function save(db: DB): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  } catch (err) {
    // p. ej. cuota excedida por imágenes en base64
    console.warn('No se pudo guardar en localStorage:', err)
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const latency = () => sleep(90 + Math.random() * 160)
const clone = <T>(v: T): T => structuredClone(v)

const RESOURCE_KEY: Record<Collection, keyof DB> = {
  cases: 'cases',
  'practice-areas': 'areas',
  experience: 'experience',
  publications: 'publications',
  testimonials: 'testimonials',
}

type Row = Record<string, unknown>

/** Devuelve la tabla (array mutable) que corresponde a una colección. */
function table(db: DB, resource: Collection): Row[] {
  return db[RESOURCE_KEY[resource]] as unknown as Row[]
}

function uid(prefix: string): string {
  const rnd =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)
  return `${prefix}-${rnd}`
}

function uniqueSlug(base: string, taken: string[]): string {
  let slug = base || 'item'
  let i = 2
  while (taken.includes(slug)) {
    slug = `${base}-${i}`
    i += 1
  }
  return slug
}

function matchesCaseQuery(c: Case, q: CaseQuery): boolean {
  if (q.area && c.area !== q.area) return false
  if (q.year && String(c.year) !== String(q.year)) return false
  if (q.resultType && c.resultType !== q.resultType) return false
  if (q.q) {
    const needle = q.q.toLowerCase()
    const haystack = [
      c.title,
      c.area,
      c.role,
      c.outcome,
      c.situation,
      c.action,
      c.result,
      c.skills.join(' '),
    ]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(needle)) return false
  }
  return true
}

export const mockClient: ApiClient = {
  isMock: true,

  async login(email, password) {
    await latency()
    const ok =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    if (!ok) {
      throw new Error('Credenciales incorrectas. Prueba con las de demostración.')
    }
    const user: User = { id: 'u-1', name: 'Administración del portafolio', email }
    const token = btoa(`${email}:${Date.now()}`)
    return { token, user }
  },

  async me() {
    await sleep(40)
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) throw new Error('No autenticado')
    return { id: 'u-1', name: 'Administración del portafolio', email: DEMO_CREDENTIALS.email }
  },

  async getProfile() {
    await latency()
    return clone(load().profile)
  },

  async updateProfile(data) {
    await latency()
    const db = load()
    db.profile = clone(data)
    save(db)
    return clone(db.profile)
  },

  async listAreas() {
    await latency()
    return clone(load().areas).sort((a, b) => a.order - b.order)
  },

  async getArea(slug) {
    await latency()
    const area = load().areas.find((a) => a.slug === slug)
    if (!area) throw new Error('Área no encontrada')
    return clone(area)
  },

  async listCases(params = {}) {
    await latency()
    const list = load()
      .cases.filter((c) => matchesCaseQuery(c, params))
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    return clone(list)
  },

  async getCase(slug) {
    await latency()
    const found = load().cases.find((c) => c.slug === slug)
    if (!found) throw new Error('Caso no encontrado')
    return clone(found)
  },

  async listExperience() {
    await latency()
    return clone(load().experience).sort((a, b) => b.startDate.localeCompare(a.startDate))
  },

  async listPublications() {
    await latency()
    return clone(load().publications).sort((a, b) => b.date.localeCompare(a.date))
  },

  async listTestimonials() {
    await latency()
    return clone(load().testimonials)
  },

  async create(resource, data) {
    await latency()
    const db = load()
    const arr = table(db, resource)
    const record: Row = { ...data, id: uid(resource) }

    if (resource === 'cases' || resource === 'practice-areas') {
      const nameField = resource === 'cases' ? 'title' : 'name'
      const taken = arr.map((r) => String(r.slug ?? ''))
      record.slug = uniqueSlug(slugify(String(data[nameField] ?? data.slug ?? 'item')), taken)
    }
    if (resource === 'practice-areas' && record.order == null) {
      record.order = arr.length + 1
    }

    arr.unshift(record)
    save(db)
    return clone(record) as never
  },

  async update(resource, id, data) {
    await latency()
    const db = load()
    const arr = table(db, resource)
    const idx = arr.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error('Registro no encontrado')

    const next: Row = { ...arr[idx], ...data, id }
    if ((resource === 'cases' || resource === 'practice-areas') && !next.slug) {
      const nameField = resource === 'cases' ? 'title' : 'name'
      const taken = arr.filter((_, i) => i !== idx).map((r) => String(r.slug ?? ''))
      next.slug = uniqueSlug(slugify(String(next[nameField] ?? 'item')), taken)
    }
    arr[idx] = next
    save(db)
    return clone(next) as never
  },

  async remove(resource, id) {
    await latency()
    const db = load()
    const arr = table(db, resource)
    const idx = arr.findIndex((r) => r.id === id)
    if (idx !== -1) {
      arr.splice(idx, 1)
      save(db)
    }
  },

  async submitContact(data: ContactInput) {
    await latency()
    const db = load()
    db.messages.unshift({
      ...data,
      id: uid('msg'),
      createdAt: new Date().toISOString(),
      read: false,
    })
    save(db)
    return { ok: true }
  },

  async listMessages() {
    await latency()
    return clone(load().messages).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  async updateMessage(id, data) {
    await latency()
    const db = load()
    const idx = db.messages.findIndex((m) => m.id === id)
    if (idx === -1) throw new Error('Mensaje no encontrado')
    db.messages[idx] = { ...db.messages[idx], ...data, id }
    save(db)
    return clone(db.messages[idx])
  },

  async removeMessage(id) {
    await latency()
    const db = load()
    db.messages = db.messages.filter((m) => m.id !== id)
    save(db)
  },

  async uploadImage(file) {
    await latency()
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
      reader.readAsDataURL(file)
    })
    return { url }
  },

  async resetDemo() {
    await latency()
    save(freshDB())
  },
}
