import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/lib/auth'
import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { CommandPalette } from '@/components/CommandPalette'
import { Spinner } from '@/components/ui'
import {
  AreasAdmin,
  CasesAdmin,
  ExperienceAdmin,
  PublicationsAdmin,
  TestimonialsAdmin,
} from '@/pages/admin/screens'

/* Páginas públicas: carga diferida por ruta */
const Home = lazy(() => import('@/pages/public/Home'))
const About = lazy(() => import('@/pages/public/About'))
const Areas = lazy(() => import('@/pages/public/Areas'))
const AreaDetail = lazy(() => import('@/pages/public/AreaDetail'))
const Cases = lazy(() => import('@/pages/public/Cases'))
const CaseDetail = lazy(() => import('@/pages/public/CaseDetail'))
const Experience = lazy(() => import('@/pages/public/Experience'))
const Publications = lazy(() => import('@/pages/public/Publications'))
const Contact = lazy(() => import('@/pages/public/Contact'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))

/* Panel de administración */
const Login = lazy(() => import('@/pages/admin/Login'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const ProfileEdit = lazy(() => import('@/pages/admin/ProfileEdit'))
const Messages = lazy(() => import('@/pages/admin/Messages'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function PageFallback() {
  return (
    <div className="container-x py-24">
      <Spinner />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <CommandPalette />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="sobre-mi" element={<About />} />
                <Route path="areas" element={<Areas />} />
                <Route path="areas/:slug" element={<AreaDetail />} />
                <Route path="casos" element={<Cases />} />
                <Route path="casos/:slug" element={<CaseDetail />} />
                <Route path="experiencia" element={<Experience />} />
                <Route path="publicaciones" element={<Publications />} />
                <Route path="contacto" element={<Contact />} />
              </Route>

              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="perfil" element={<ProfileEdit />} />
                  <Route path="casos" element={<CasesAdmin />} />
                  <Route path="areas" element={<AreasAdmin />} />
                  <Route path="experiencia" element={<ExperienceAdmin />} />
                  <Route path="publicaciones" element={<PublicationsAdmin />} />
                  <Route path="testimonios" element={<TestimonialsAdmin />} />
                  <Route path="mensajes" element={<Messages />} />
                </Route>
              </Route>

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/inicio" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
