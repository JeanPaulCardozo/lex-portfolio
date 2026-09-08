export interface User {
  id: string
  name: string
  email: string
}

export interface EducationItem {
  degree: string
  institution: string
  year: string
}

export interface StatItem {
  label: string
  value: string
}

export interface Profile {
  fullName: string
  title: string
  headline: string
  summary: string
  location: string
  email: string
  phone: string
  whatsapp: string
  linkedin: string
  avatarUrl: string
  cvUrl: string
  languages: string[]
  barAdmissions: string[]
  education: EducationItem[]
  stats: StatItem[]
}

export interface Faq {
  q: string
  a: string
}

export interface PracticeArea {
  id: string
  slug: string
  name: string
  summary: string
  description: string
  faqs: Faq[]
  order: number
}

export type CaseResultType =
  | 'sentencia'
  | 'acuerdo'
  | 'archivo'
  | 'dictamen'
  | 'otro'

export interface Case {
  id: string
  slug: string
  title: string
  area: string
  year: number
  role: string
  resultType: CaseResultType
  outcome: string
  situation: string
  action: string
  result: string
  skills: string[]
  featured: boolean
  confidential: boolean
  imageUrl: string
}

export interface Experience {
  id: string
  org: string
  role: string
  startDate: string
  endDate: string | null
  current: boolean
  location: string
  description: string
}

export type PublicationKind = 'articulo' | 'ponencia' | 'libro' | 'podcast'

export interface Publication {
  id: string
  title: string
  kind: PublicationKind
  venue: string
  date: string
  url: string
  summary: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  authorRole: string
  context: string
}

export interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
  read: boolean
}

export interface CaseQuery {
  q?: string
  area?: string
  year?: number | string
  resultType?: string
}

export type Collection =
  | 'cases'
  | 'practice-areas'
  | 'experience'
  | 'publications'
  | 'testimonials'

export type ContactInput = Omit<Message, 'id' | 'createdAt' | 'read'>

export interface ApiClient {
  readonly isMock: boolean

  login(email: string, password: string): Promise<{ token: string; user: User }>
  me(): Promise<User>

  getProfile(): Promise<Profile>
  updateProfile(data: Profile): Promise<Profile>

  listAreas(): Promise<PracticeArea[]>
  getArea(slug: string): Promise<PracticeArea>

  listCases(params?: CaseQuery): Promise<Case[]>
  getCase(slug: string): Promise<Case>

  listExperience(): Promise<Experience[]>
  listPublications(): Promise<Publication[]>
  listTestimonials(): Promise<Testimonial[]>

  create<T = unknown>(resource: Collection, data: Record<string, unknown>): Promise<T>
  update<T = unknown>(resource: Collection, id: string, data: Record<string, unknown>): Promise<T>
  remove(resource: Collection, id: string): Promise<void>

  submitContact(data: ContactInput): Promise<{ ok: true }>
  listMessages(): Promise<Message[]>
  updateMessage(id: string, data: Partial<Message>): Promise<Message>
  removeMessage(id: string): Promise<void>

  uploadImage(file: File): Promise<{ url: string }>

  /** Solo modo mock: restaura los datos de demostración. */
  resetDemo(): Promise<void>
}
