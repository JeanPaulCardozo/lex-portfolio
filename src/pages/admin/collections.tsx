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

export function useCasesConfig(): CollectionConfig<Case> {
  const { data: areas = [] } = useAreas()
  const areaName = (id: string) => areas.find((a) => a.id === id)?.name ?? '—'

  return {
    resource: 'cases',
    title: 'Casos',
    singular: 'Caso',
    description:
      'Cada caso se cuenta en tres partes: situación, actuación y resultado. Marca como destacados los 3-4 más representativos.',
    useList: useCases,
    primary: (r) => r.title,
    secondary: (r) => `${areaName(r.practice_area_id)} · ${r.year} · ${r.outcome}`,
    badge: (r) => (r.featured ? { label: 'Destacado', tone: 'accent' } : null),
    blank: {
      title: '',
      practice_area_id: '',
      year: new Date().getFullYear(),
      role: '',
      result_type: '',
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
        name: 'practice_area_id',
        label: 'Área de práctica',
        type: 'select',
        required: true,
        options: areas.map((a) => ({ value: a.id, label: a.name })),
      },
      { name: 'year', label: 'Año', type: 'number', required: true },
      { name: 'role', label: 'Tu rol', type: 'text', help: 'P. ej. Dirección letrada (parte trabajadora).' },
      {
        name: 'result_type',
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
}

export const areasConfig: CollectionConfig<PracticeArea> = {
  resource: 'practice-areas',
  title: 'Áreas de práctica',
  singular: 'Área',
  description: 'Las materias en las que trabajas.',
  useList: useAreas,
  primary: (r) => r.name,
  secondary: (r) => r.summary,
  blank: { name: '', summary: '', description: '', fags: [] },
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
      name: 'fags',
      label: 'Preguntas frecuentes',
      type: 'repeater',
      full: true,
      addLabel: 'Añadir pregunta',
      fields: [
        { name: 'q', label: 'Pregunta', type: 'text' },
        { name: 'a', label: 'Respuesta', type: 'textarea' },
      ],
    },
  ],
}

export const experienceConfig: CollectionConfig<Experience> = {
  resource: 'experience',
  title: 'Trayectoria',
  singular: 'Puesto',
  description: 'Tu experiencia profesional, de lo más reciente a lo más antiguo.',
  useList: useExperience,
  primary: (r) => `${r.role} — ${r.org}`,
  secondary: (r) => `${formatMonthYear(r.start_date)} – ${r.current ? 'Actualidad' : formatMonthYear(r.end_date || null)}`,
  blank: {
    org: '',
    role: '',
    location: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
  },
  fields: [
    { name: 'org', label: 'Organización / despacho', type: 'text', required: true, full: true },
    { name: 'role', label: 'Cargo', type: 'text', required: true },
    { name: 'location', label: 'Ubicación', type: 'text' },
    { name: 'start_date', label: 'Fecha de inicio', type: 'text', help: 'Formato AAAA-MM (p. ej. 2018-01).' },
    {
      name: 'end_date',
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
  Pendiente: { label: 'Pendiente', tone: 'warn' as const },
  Rechazado: { label: 'Rechazado', tone: 'muted' as const },
  Aprobado: null,
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
    `${r.author_role ? `${r.author_role} · ` : ''}★${r.rating} · ${formatDate(
      r.created_at.slice(0, 10),
    )} · ${r.quote}`,
  badge: (r) => TESTIMONIAL_STATUS_BADGE[r.status] ?? null,
  blank: {
    quote: '',
    author: '',
    author_role: '',
    context: '',
    rating: 5,
    status: 'Aprobado',
    email: '',
  },
  fields: [
    { name: 'quote', label: 'Testimonio', type: 'textarea', required: true, full: true },
    { name: 'author', label: 'Autor/a', type: 'text', required: true },
    { name: 'author_role', label: 'Rol o sector', type: 'text' },
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
        { value: 'Pendiente', label: 'Pendiente de revisión' },
        { value: 'Aprobado', label: 'Aprobado (visible en el sitio)' },
        { value: 'Rechazado', label: 'Rechazado' },
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
