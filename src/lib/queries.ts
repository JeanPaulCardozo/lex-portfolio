import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { api } from './api/client'
import type {
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
} from './api/types'

/* ------------------------------------------------------------------ *
 * Claves de caché
 * ------------------------------------------------------------------ */
export const keys = {
  profile: ['profile'] as const,
  areas: ['areas'] as const,
  area: (slug: string) => ['area', slug] as const,
  cases: (params?: CaseQuery) => ['cases', params ?? {}] as const,
  case: (slug: string) => ['case', slug] as const,
  experience: ['experience'] as const,
  publications: ['publications'] as const,
  testimonials: ['testimonials'] as const,
  allTestimonials: ['testimonials', 'all'] as const,
  messages: ['messages'] as const,
}

const COLLECTION_TO_KEY: Record<Collection, readonly unknown[]> = {
  cases: ['cases'],
  'practice-areas': ['areas'],
  experience: ['experience'],
  publications: ['publications'],
  testimonials: ['testimonials'],
}

/* ------------------------------------------------------------------ *
 * Lecturas públicas
 * ------------------------------------------------------------------ */
export const useProfile = (opts?: Partial<UseQueryOptions<Profile>>) =>
  useQuery({ queryKey: keys.profile, queryFn: () => api.getProfile(), ...opts })

export const useAreas = () =>
  useQuery({ queryKey: keys.areas, queryFn: () => api.listAreas() })

export const useArea = (slug: string) =>
  useQuery({ queryKey: keys.area(slug), queryFn: () => api.getArea(slug), enabled: !!slug })

export const useCases = (params?: CaseQuery) =>
  useQuery({ queryKey: keys.cases(params), queryFn: () => api.listCases(params) })

export const useCase = (slug: string) =>
  useQuery({ queryKey: keys.case(slug), queryFn: () => api.getCase(slug), enabled: !!slug })

export const useExperience = () =>
  useQuery({ queryKey: keys.experience, queryFn: () => api.listExperience() })

export const usePublications = () =>
  useQuery({ queryKey: keys.publications, queryFn: () => api.listPublications() })

export const useTestimonials = () =>
  useQuery({ queryKey: keys.testimonials, queryFn: () => api.listTestimonials() })

/** Panel admin: incluye pendientes y rechazados. */
export const useAllTestimonials = () =>
  useQuery({ queryKey: keys.allTestimonials, queryFn: () => api.listAllTestimonials() })

export function useSubmitTestimonial() {
  return useMutation({
    mutationFn: (data: TestimonialSubmitInput) => api.submitTestimonial(data),
  })
}

export function usePrefetchCase() {
  const qc = useQueryClient()
  return (slug: string) =>
    qc.prefetchQuery({ queryKey: keys.case(slug), queryFn: () => api.getCase(slug) })
}

/* ------------------------------------------------------------------ *
 * Escrituras (panel admin)
 * ------------------------------------------------------------------ */
function useInvalidateAll() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries()
}

export function useUpdateProfile() {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: (data: Profile) => api.updateProfile(data),
    onSuccess: invalidate,
  })
}

export function useCreate(resource: Collection) {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.create(resource, data),
    onSuccess: invalidate,
  })
}

export function useUpdate(resource: Collection) {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.update(resource, id, data),
    onSuccess: invalidate,
  })
}

export function useRemove(resource: Collection) {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: (id: string) => api.remove(resource, id),
    onSuccess: invalidate,
  })
}

export const collectionKey = (resource: Collection) => COLLECTION_TO_KEY[resource]

/* ------------------------------------------------------------------ *
 * Contacto y mensajes
 * ------------------------------------------------------------------ */
export function useSubmitContact() {
  return useMutation({ mutationFn: (data: ContactInput) => api.submitContact(data) })
}

export const useMessages = () =>
  useQuery({ queryKey: keys.messages, queryFn: () => api.listMessages() })

export function useUpdateMessage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Message> }) =>
      api.updateMessage(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.messages }),
  })
}

export function useRemoveMessage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.removeMessage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.messages }),
  })
}

/* Re-export de tipos usados por la UI */
export type { Case, Experience, PracticeArea, Publication, Testimonial }
