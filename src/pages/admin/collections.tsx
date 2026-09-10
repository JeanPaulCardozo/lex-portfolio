import type {
  Case,
  Experience,
  PracticeArea,
  Publication,
  Testimonial,
} from '@/lib/api/types'
import {
  useAllTestimonials,
  useAreas,
  useCases,
  useExperience,
  usePublications,
} from '@/lib/queries'
import type { CollectionConfig } from '@/components/admin/CollectionAdmin'
import { formatDate, formatMonthYear } from '@/lib/format'

export const casesConfig: CollectionConfig<Case> = {
  resource: 'cases',
  title: 'Casos',
  singular: 'Caso',
  description:
    'Cada caso se cuenta en tres partes: situación, actuación y resultado. Marca como destacados los 3-4 más representativos.',
  useList: useCases,
  primary: (r) => r.title,
  secondary: (r) => `${r.area} · ${r.year} · ${r.outcome}`,
  badge: (r) => (r.featured ? { label: 'Destacado', tone: 'accent' } : null),
  blank: {
    title: '',
    area: '',
    year: new Date().getFullYear(),
    role: '',
    resultType: '',
    outcome: '',
    situation: '',
    action: '',
    result: '',
    skills: [],
    imageUrl: '',
    featured: false,
    confidential: false,
  },
  fields: [
    { name: 'title', label: 'Título del caso', type: 'text', required: true, full: true },
    {
      name: 'area',
      label: 'Área de práctica',
      type: 'text',
      required: true,
      help: 'Escríbela igual que en «Áreas de práctica» (p. ej. Derecho laboral).',
    },
    { name: 'year', label: 'Año', type: 'number', required: true },
    { name: 'role', label: 'Tu rol', type: 'text', help: 'P. ej. Dirección letrada (parte trabajadora).' },
    {
      name: 'resultType',
      label: 'Tipo de resultado',
      type: 'select',
      required: true,
      options: [
        { value: 'sentencia', label: 'Sentencia' },
        { value: 'acuerdo', label: 'Acuerdo / conciliación' },
        { value: 'archivo', label: 'Archivo / sobreseimiento' },
        { value: 'dictamen', label: 'Resolución administrativa' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    {
      name: 'outcome',
      label: 'Resultado en una frase',
      type: 'text',
      required: true,
      full: true,
      help: 'P. ej. Readmisión + 14.200 € de salarios de tramitación.',
    },
    { name: 'situation', label: 'Situación', type: 'textarea', full: true },
    { name: 'action', label: 'Actuación', type: 'textarea', full: true },
    { name: 'result', label: 'Resultado (detalle)', type: 'textarea', full: true },
    { name: 'skills', label: 'Competencias demostradas', type: 'tags', full: true },
    { name: 'imageUrl', label: 'Imagen (opcional)', type: 'image', full: true },
    { name: 'featured', label: 'Destacar en portada', type: 'boolean' },
    {
      name: 'confidential',
      label: 'Caso confidencial',
      type: 'boolean',
      help: 'Muestra un aviso de que se han anonimizado los datos.',
    },
  ],
}

export const areasConfig: CollectionConfig<PracticeArea> = {
  resource: 'practice-areas',
  title: 'Áreas de práctica',
  singular: 'Área',
  description: 'Las materias en las que trabajas. El «orden» controla su posición en el sitio.',
  useList: useAreas,
  primary: (r) => r.name,
  secondary: (r) => r.summary,
  blank: { name: '', summary: '', description: '', faqs: [], order: 99 },
  fields: [
    { name: 'name', label: 'Nombre del área', type: 'text', required: true, full: true },
    {
      name: 'summary',
      label: 'Resumen corto',
      type: 'text',
      required: true,
      full: true,
      help: 'Una frase para tarjetas y listados.',
    },
    { name: 'description', label: 'Descripción', type: 'textarea', full: true },
    {
      name: 'faqs',
      label: 'Preguntas frecuentes',
      type: 'repeater',
      full: true,
      addLabel: 'Añadir pregunta',
      fields: [
        { name: 'q', label: 'Pregunta', type: 'text' },
        { name: 'a', label: 'Respuesta', type: 'textarea' },
      ],
    },
    { name: 'order', label: 'Orden', type: 'number' },
  ],
}

export const experienceConfig: CollectionConfig<Experience> = {
  resource: 'experience',
  title: 'Trayectoria',
  singular: 'Puesto',
  description: 'Tu experiencia profesional, de lo más reciente a lo más antiguo.',
  useList: useExperience,
  primary: (r) => `${r.role} — ${r.org}`,
  secondary: (r) => `${formatMonthYear(r.startDate)} – ${r.current ? 'Actualidad' : formatMonthYear(r.endDate || null)}`,
  blank: {
    org: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  },
  fields: [
    { name: 'org', label: 'Organización / despacho', type: 'text', required: true, full: true },
    { name: 'role', label: 'Cargo', type: 'text', required: true },
    { name: 'location', label: 'Ubicación', type: 'text' },
    { name: 'startDate', label: 'Fecha de inicio', type: 'text', help: 'Formato AAAA-MM (p. ej. 2018-01).' },
    {
      name: 'endDate',
      label: 'Fecha de fin',
      type: 'text',
      help: 'AAAA-MM. Déjalo vacío si es tu puesto actual.',
    },
    { name: 'current', label: 'Es mi puesto actual', type: 'boolean' },
    { name: 'description', label: 'Descripción', type: 'textarea', full: true },
  ],
}

export const publicationsConfig: CollectionConfig<Publication> = {
  resource: 'publications',
  title: 'Publicaciones',
  singular: 'Publicación',
  description: 'Artículos, ponencias, libros o pódcast en los que has participado.',
  useList: usePublications,
  primary: (r) => r.title,
  secondary: (r) => `${r.kind} · ${r.venue}`,
  blank: { title: '', kind: '', venue: '', date: '', url: '', summary: '' },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true, full: true },
    {
      name: 'kind',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: 'articulo', label: 'Artículo' },
        { value: 'ponencia', label: 'Ponencia' },
        { value: 'libro', label: 'Libro / capítulo' },
        { value: 'podcast', label: 'Pódcast' },
      ],
    },
    { name: 'venue', label: 'Medio / evento', type: 'text' },
    { name: 'date', label: 'Fecha', type: 'date' },
    { name: 'url', label: 'Enlace', type: 'url', full: true },
    { name: 'summary', label: 'Resumen', type: 'textarea', full: true },
  ],
}

const TESTIMONIAL_STATUS_BADGE = {
  pending: { label: 'Pendiente', tone: 'warn' as const },
  rejected: { label: 'Rechazado', tone: 'muted' as const },
  approved: null,
}

export const testimonialsConfig: CollectionConfig<Testimonial> = {
  resource: 'testimonials',
  title: 'Testimonios',
  singular: 'Testimonio',
  description:
    'Opiniones de clientes o colegas. Las que llegan desde el sitio entran como «Pendiente»; solo se publican las que marques como «Aprobado».',
  useList: useAllTestimonials,
  primary: (r) => r.author,
  secondary: (r) =>
    `${r.authorRole ? `${r.authorRole} · ` : ''}★${r.rating} · ${formatDate(
      r.createdAt.slice(0, 10),
    )} · ${r.quote}`,
  badge: (r) => TESTIMONIAL_STATUS_BADGE[r.status] ?? null,
  blank: {
    quote: '',
    author: '',
    authorRole: '',
    context: '',
    rating: 5,
    status: 'approved',
    email: '',
  },
  fields: [
    { name: 'quote', label: 'Testimonio', type: 'textarea', required: true, full: true },
    { name: 'author', label: 'Autor/a', type: 'text', required: true },
    { name: 'authorRole', label: 'Rol o sector', type: 'text' },
    {
      name: 'rating',
      label: 'Valoración',
      type: 'select',
      required: true,
      options: [
        { value: '5', label: '★★★★★ (5)' },
        { value: '4', label: '★★★★ (4)' },
        { value: '3', label: '★★★ (3)' },
        { value: '2', label: '★★ (2)' },
        { value: '1', label: '★ (1)' },
      ],
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { value: 'pending', label: 'Pendiente de revisión' },
        { value: 'approved', label: 'Aprobado (visible en el sitio)' },
        { value: 'rejected', label: 'Rechazado' },
      ],
    },
    {
      name: 'email',
      label: 'Correo de quien escribe',
      type: 'text',
      help: 'No se publica. Útil para verificar la autoría.',
    },
    { name: 'context', label: 'Contexto', type: 'text', help: 'Año o tipo de asunto.' },
  ],
}
