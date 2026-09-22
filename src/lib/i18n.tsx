import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'es' | 'en'

const LANG_KEY = 'lex_lang'

/**
 * Traducciones de la interfaz (textos fijos del código: navegación, botones,
 * encabezados de sección, mensajes de estado…). El contenido dinámico del
 * portafolio (perfil, casos, testimonios, publicaciones) lo escribe el
 * abogado desde /admin y no se traduce automáticamente aquí.
 */
const es = {
  'nav.home': 'Inicio',
  'nav.about': 'Sobre mí',
  'nav.areas': 'Áreas',
  'nav.cases': 'Casos',
  'nav.experience': 'Trayectoria',
  'nav.publications': 'Publicaciones',
  'nav.search': 'Buscar',
  'nav.contact': 'Contactar',
  'nav.openMenu': 'Abrir menú',
  'footer.contact': 'Contacto',
  'footer.panel': 'Panel',
  'footer.rights': 'Portafolio profesional.',

  'common.loading': 'Cargando…',
  'common.retry': 'Reintentar',
  'common.errorTitle': 'No se pudieron cargar los datos',
  'common.genericError': 'Se produjo un error.',
  'common.save': 'Guardar',
  'common.saving': 'Guardando…',
  'common.cancel': 'Cancelar',
  'common.select': 'Selecciona…',
  'common.close': 'Cerrar',
  'common.sending': 'Enviando…',
  'common.current': 'Actualidad',

  'palette.placeholder': 'Busca casos, áreas, publicaciones…',
  'palette.noResults': 'Sin resultados',
  'palette.groupNav': 'Navegación',
  'palette.groupAreas': 'Áreas',
  'palette.groupCases': 'Casos',
  'palette.groupPublications': 'Publicaciones',
  'palette.itemHome': 'Inicio',
  'palette.itemAbout': 'Sobre mí',
  'palette.itemAreas': 'Áreas de práctica',
  'palette.itemCases': 'Casos y resultados',
  'palette.itemExperience': 'Trayectoria',
  'palette.itemPublications': 'Publicaciones',
  'palette.itemContact': 'Contacto',

  'home.loading': 'Cargando portafolio…',
  'home.viewCases': 'Ver casos y resultados',
  'home.scheduleConsult': 'Agendar una consulta',
  'home.areasLabel': 'En qué puedo ayudarte',
  'home.areasTitle': 'Áreas de práctica',
  'home.casesLabel': 'Resultados',
  'home.casesTitle': 'Casos destacados',
  'home.casesIntro':
    'Una muestra de asuntos representativos. En la sección de casos puedes filtrarlos por área, año y tipo de resultado.',
  'home.viewAllCases': 'Ver todos los casos',
  'home.aboutLabel': 'Perfil',
  'home.aboutTitle': 'Sobre mí',
  'home.fullBio': 'Trayectoria completa',
  'home.barAdmissions': 'Colegiación',
  'home.languages': 'Idiomas',
  'home.testimonialsLabel': 'Opiniones',
  'home.testimonialsTitle': 'Lo que dicen',
  'home.noTestimonials':
    'Aún no hay opiniones publicadas. ¿Trabajaste conmigo? Anímate a dejar la primera.',
  'home.leaveReview': 'Deja tu opinión',
  'home.reviewsModerated': 'Las opiniones se revisan antes de publicarse.',
  'home.ctaTitle': '¿Hablamos de tu caso?',
  'home.ctaSubtitle': 'Primera valoración sin compromiso.',
  'home.goToContact': 'Ir a contacto',

  'areasPage.label': 'Servicios',
  'areasPage.title': 'Áreas de práctica',
  'areasPage.intro':
    'Materias en las que asesoro y litigo. Cada área incluye una explicación del tipo de asuntos que gestiono y preguntas frecuentes.',
  'areasPage.empty': 'Todavía no hay áreas publicadas',
  'areasPage.faq': 'pregunta frecuente',
  'areasPage.faqs': 'preguntas frecuentes',

  'areaDetail.back': 'Áreas de práctica',
  'areaDetail.faq': 'Preguntas frecuentes',
  'areaDetail.examplesLabel': 'Ejemplos',
  'areaDetail.examplesTitlePrefix': 'Casos de',
  'areaDetail.ctaQuestion': '¿Tu asunto encaja en esta área?',
  'areaDetail.notFound': 'Área no encontrada',
  'areaDetail.backLink': 'Volver a áreas',

  'casesPage.label': 'Resultados',
  'casesPage.title': 'Casos',
  'casesPage.intro':
    'Búsqueda instantánea. Filtra por área, año y tipo de resultado; la URL guarda el filtro para compartirlo.',
  'casesPage.searchPlaceholder': 'Buscar por palabra clave…',
  'casesPage.allAreas': 'Todas las áreas',
  'casesPage.anyYear': 'Cualquier año',
  'casesPage.anyResult': 'Cualquier resultado',
  'casesPage.clear': 'Limpiar',
  'casesPage.case': 'caso',
  'casesPage.cases': 'casos',
  'casesPage.of': 'de',
  'casesPage.empty': 'Ningún caso coincide con el filtro',
  'casesPage.emptyHint': 'Prueba a quitar algún criterio.',

  'caseCard.result': 'Resultado',
  'caseCard.viewCase': 'Ver caso',
  'result.sentencia': 'Sentencia',
  'result.acuerdo': 'Acuerdo',
  'result.archivo': 'Archivo',
  'result.dictamen': 'Resolución',
  'result.otro': 'Otro',

  'caseDetail.back': 'Casos',
  'caseDetail.situation': 'Situación',
  'caseDetail.action': 'Actuación',
  'caseDetail.result': 'Resultado',
  'caseDetail.skills': 'Competencias demostradas',
  'caseDetail.confidential':
    'Los datos identificativos de este caso se han anonimizado por respeto al secreto profesional.',
  'caseDetail.similarCase': 'Consultar un caso similar',
  'caseDetail.notFound': 'Caso no encontrado',
  'caseDetail.backLink': 'Volver a casos',

  'experiencePage.label': 'Recorrido profesional',
  'experiencePage.title': 'Trayectoria',
  'experiencePage.intro': 'Puestos y colaboraciones, de lo más reciente a lo más antiguo.',
  'experiencePage.empty': 'Todavía no hay experiencia publicada',

  'publicationsPage.label': 'Divulgación',
  'publicationsPage.title': 'Publicaciones y ponencias',
  'publicationsPage.intro': 'Artículos, intervenciones en jornadas y otras aportaciones profesionales.',
  'publicationsPage.empty': 'Todavía no hay publicaciones',
  'pub.articulo': 'Artículo',
  'pub.ponencia': 'Ponencia',
  'pub.libro': 'Libro',
  'pub.podcast': 'Pódcast',

  'about.location': 'Ubicación',
  'about.barAdmissions': 'Colegiación',
  'about.languages': 'Idiomas',
  'about.downloadCv': 'Descargar CV',
  'about.educationLabel': 'Formación',
  'about.educationTitle': 'Estudios',
  'about.experienceLabel': 'Trayectoria',
  'about.experienceTitle': 'Experiencia reciente',
  'about.viewFullExperience': 'Ver trayectoria completa',

  'contact.label': 'Contacto',
  'contact.title': 'Cuéntame tu caso',
  'contact.name': 'Nombre',
  'contact.email': 'Correo electrónico',
  'contact.phone': 'Teléfono',
  'contact.message': 'Mensaje',
  'contact.send': 'Enviar mensaje',
  'contact.sent': 'Mensaje enviado',
  'contact.sentBody': 'Te responderé lo antes posible al correo que has indicado.',
  'contact.sendAnother': 'Enviar otro mensaje',
  'contact.sendError': 'No se pudo enviar. Inténtalo de nuevo.',
  'contact.disclaimer':
    'El envío de este formulario no genera relación profesional ni obligación de asistencia.',
  'contact.errorName': 'Indica tu nombre',
  'contact.errorEmail': 'Correo no válido',
  'contact.errorMessage': 'Cuéntame brevemente tu situación (mín. 10 caracteres)',
  'contact.whatsapp': 'WhatsApp',
  'contact.whatsappCta': 'Escribir por WhatsApp',
  'contact.linkedin': 'LinkedIn',
  'contact.viewProfile': 'Ver perfil',
  'contact.location': 'Ubicación',

  'testimonialForm.name': 'Nombre',
  'testimonialForm.role': 'Rol o sector',
  'testimonialForm.rolePlaceholder': 'P. ej. Gerente de pyme',
  'testimonialForm.email': 'Correo electrónico',
  'testimonialForm.emailHelp': 'No se publica. Solo sirve para verificar tu opinión.',
  'testimonialForm.rating': 'Valoración',
  'testimonialForm.quote': 'Tu opinión',
  'testimonialForm.thanks': '¡Gracias por tu opinión!',
  'testimonialForm.thanksBody': 'La revisaré antes de publicarla en el sitio.',
  'testimonialForm.writeAnother': 'Escribir otra',
  'testimonialForm.send': 'Enviar opinión',
  'testimonialForm.sendError': 'No se pudo enviar. Inténtalo de nuevo.',
  'testimonialForm.errorName': 'Indica tu nombre',
  'testimonialForm.errorEmail': 'Correo no válido',
  'testimonialForm.errorQuote': 'Cuéntanos un poco más (mín. 10 caracteres)',

  'notFound.body': 'La página que buscas no existe o se ha movido.',
  'notFound.backHome': 'Volver al inicio',

  'admin.nav.summary': 'Resumen',
  'admin.nav.profile': 'Perfil',
  'admin.nav.cases': 'Casos',
  'admin.nav.areas': 'Áreas de práctica',
  'admin.nav.experience': 'Trayectoria',
  'admin.nav.publications': 'Publicaciones',
  'admin.nav.testimonials': 'Testimonios',
  'admin.nav.messages': 'Mensajes',
  'admin.title': 'Panel de edición',
  'admin.viewSite': 'Ver sitio ↗',
  'admin.logout': 'Salir',

  'login.backToSite': '← Volver al sitio',
  'login.subtitle': 'Acceso privado del titular del portafolio.',
  'login.email': 'Correo',
  'login.password': 'Contraseña',
  'login.submit': 'Entrar',
  'login.submitting': 'Entrando…',
  'login.error': 'No se pudo iniciar sesión',
  'login.demoNotice': 'Modo demostración ({mode}). Credenciales precargadas:',

  'dashboard.greeting': 'Hola',
  'dashboard.subtitle': 'Desde aquí gestionas todo lo que se muestra en tu portafolio público.',
  'dashboard.cases': 'Casos',
  'dashboard.areas': 'Áreas de práctica',
  'dashboard.publications': 'Publicaciones',
  'dashboard.pendingTestimonials': 'Testimonios pendientes',
  'dashboard.unreadMessages': 'Mensajes sin leer',
  'dashboard.recentMessages': 'Últimos mensajes',
  'dashboard.viewAll': 'Ver todos',
  'dashboard.noMessages': 'Sin mensajes todavía.',
  'dashboard.demoTitle': 'Datos de demostración',
  'dashboard.demoBody': 'Útil antes de una entrevista: deja el portafolio con el contenido de ejemplo original.',
  'dashboard.demoRestore': 'Restaurar datos de demo',
  'dashboard.demoRestoring': 'Restaurando…',
  'dashboard.demoConfirm': 'Esto restaura todos los datos de demostración y descarta tus cambios. ¿Continuar?',
  'dashboard.demoRestored': 'Datos de demostración restaurados',

  'messages.title': 'Mensajes',
  'messages.subtitle': 'Consultas recibidas desde el formulario de contacto.',
  'messages.empty': 'Todavía no has recibido mensajes',
  'messages.reply': 'Responder',
  'messages.markUnread': 'Marcar como no leído',
  'messages.markRead': 'Marcar como leído',
  'messages.delete': 'Eliminar',
  'messages.deleteConfirm': '¿Eliminar este mensaje?',

  'collectionAdmin.new': 'Nuevo',
  'collectionAdmin.edit': 'Editar',
  'collectionAdmin.delete': 'Eliminar',
  'collectionAdmin.emptyTitle': 'Aún no hay {title}',
  'collectionAdmin.emptyHint': 'Pulsa «Nuevo» para añadir el primero.',
  'collectionAdmin.deleteConfirm': '¿Eliminar este {item}? Esta acción no se puede deshacer.',
  'collectionAdmin.created': '{item} creado',
  'collectionAdmin.updated': '{item} actualizado',
  'collectionAdmin.deleted': '{item} eliminado',
  'collectionAdmin.newDrawer': 'Nuevo ·',
  'collectionAdmin.editDrawer': 'Editar ·',

  'autoForm.required': 'El campo "{field}" es obligatorio.',

  'profileEdit.title': 'Perfil',
  'profileEdit.intro': 'Estos datos aparecen en la portada, en «Sobre mí» y en la página de contacto.',
  'profileEdit.save': 'Guardar perfil',
  'profileEdit.saved': 'Perfil guardado',
}

type Dict = Record<keyof typeof es, string>

const en: Dict = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.areas': 'Practice Areas',
  'nav.cases': 'Cases',
  'nav.experience': 'Experience',
  'nav.publications': 'Publications',
  'nav.search': 'Search',
  'nav.contact': 'Contact',
  'nav.openMenu': 'Open menu',
  'footer.contact': 'Contact',
  'footer.panel': 'Admin',
  'footer.rights': 'Professional portfolio.',

  'common.loading': 'Loading…',
  'common.retry': 'Retry',
  'common.errorTitle': "We couldn't load the data",
  'common.genericError': 'Something went wrong.',
  'common.save': 'Save',
  'common.saving': 'Saving…',
  'common.cancel': 'Cancel',
  'common.select': 'Select…',
  'common.close': 'Close',
  'common.sending': 'Sending…',
  'common.current': 'Present',

  'palette.placeholder': 'Search cases, practice areas, publications…',
  'palette.noResults': 'No results',
  'palette.groupNav': 'Navigation',
  'palette.groupAreas': 'Practice areas',
  'palette.groupCases': 'Cases',
  'palette.groupPublications': 'Publications',
  'palette.itemHome': 'Home',
  'palette.itemAbout': 'About',
  'palette.itemAreas': 'Practice areas',
  'palette.itemCases': 'Cases and results',
  'palette.itemExperience': 'Experience',
  'palette.itemPublications': 'Publications',
  'palette.itemContact': 'Contact',

  'home.loading': 'Loading portfolio…',
  'home.viewCases': 'View cases and results',
  'home.scheduleConsult': 'Schedule a consultation',
  'home.areasLabel': 'How I can help',
  'home.areasTitle': 'Practice areas',
  'home.casesLabel': 'Results',
  'home.casesTitle': 'Featured cases',
  'home.casesIntro':
    'A sample of representative matters. On the cases page you can filter by area, year and result type.',
  'home.viewAllCases': 'View all cases',
  'home.aboutLabel': 'Profile',
  'home.aboutTitle': 'About me',
  'home.fullBio': 'Full background',
  'home.barAdmissions': 'Bar admissions',
  'home.languages': 'Languages',
  'home.testimonialsLabel': 'Reviews',
  'home.testimonialsTitle': 'What clients say',
  'home.noTestimonials':
    'No reviews published yet. Have we worked together? Feel free to leave the first one.',
  'home.leaveReview': 'Leave a review',
  'home.reviewsModerated': 'Reviews are checked before they go live.',
  'home.ctaTitle': "Let's talk about your case",
  'home.ctaSubtitle': 'Free initial assessment.',
  'home.goToContact': 'Go to contact',

  'areasPage.label': 'Services',
  'areasPage.title': 'Practice areas',
  'areasPage.intro':
    'The matters I advise on and litigate. Each area explains the kind of work I handle and answers frequent questions.',
  'areasPage.empty': 'No practice areas published yet',
  'areasPage.faq': 'frequently asked question',
  'areasPage.faqs': 'frequently asked questions',

  'areaDetail.back': 'Practice areas',
  'areaDetail.faq': 'Frequently asked questions',
  'areaDetail.examplesLabel': 'Examples',
  'areaDetail.examplesTitlePrefix': 'Cases in',
  'areaDetail.ctaQuestion': 'Does your matter fit this area?',
  'areaDetail.notFound': 'Practice area not found',
  'areaDetail.backLink': 'Back to practice areas',

  'casesPage.label': 'Results',
  'casesPage.title': 'Cases',
  'casesPage.intro':
    'Instant search. Filter by area, year and result type; the URL keeps the filter so you can share it.',
  'casesPage.searchPlaceholder': 'Search by keyword…',
  'casesPage.allAreas': 'All areas',
  'casesPage.anyYear': 'Any year',
  'casesPage.anyResult': 'Any result',
  'casesPage.clear': 'Clear',
  'casesPage.case': 'case',
  'casesPage.cases': 'cases',
  'casesPage.of': 'of',
  'casesPage.empty': 'No case matches the filter',
  'casesPage.emptyHint': 'Try removing a filter.',

  'caseCard.result': 'Result',
  'caseCard.viewCase': 'View case',
  'result.sentencia': 'Judgment',
  'result.acuerdo': 'Settlement',
  'result.archivo': 'Dismissal',
  'result.dictamen': 'Ruling',
  'result.otro': 'Other',

  'caseDetail.back': 'Cases',
  'caseDetail.situation': 'Situation',
  'caseDetail.action': 'Action taken',
  'caseDetail.result': 'Result',
  'caseDetail.skills': 'Skills demonstrated',
  'caseDetail.confidential':
    "Identifying details of this case have been anonymized out of respect for professional secrecy.",
  'caseDetail.similarCase': 'Ask about a similar case',
  'caseDetail.notFound': 'Case not found',
  'caseDetail.backLink': 'Back to cases',

  'experiencePage.label': 'Professional path',
  'experiencePage.title': 'Experience',
  'experiencePage.intro': 'Positions and collaborations, from most to least recent.',
  'experiencePage.empty': 'No experience published yet',

  'publicationsPage.label': 'Outreach',
  'publicationsPage.title': 'Publications & talks',
  'publicationsPage.intro': 'Articles, conference talks and other professional contributions.',
  'publicationsPage.empty': 'No publications yet',
  'pub.articulo': 'Article',
  'pub.ponencia': 'Talk',
  'pub.libro': 'Book',
  'pub.podcast': 'Podcast',

  'about.location': 'Location',
  'about.barAdmissions': 'Bar admissions',
  'about.languages': 'Languages',
  'about.downloadCv': 'Download CV',
  'about.educationLabel': 'Education',
  'about.educationTitle': 'Education',
  'about.experienceLabel': 'Experience',
  'about.experienceTitle': 'Recent experience',
  'about.viewFullExperience': 'View full experience',

  'contact.label': 'Contact',
  'contact.title': 'Tell me about your case',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.message': 'Message',
  'contact.send': 'Send message',
  'contact.sent': 'Message sent',
  'contact.sentBody': "I'll get back to you as soon as possible at the email you provided.",
  'contact.sendAnother': 'Send another message',
  'contact.sendError': 'Could not send the message. Please try again.',
  'contact.disclaimer':
    'Submitting this form does not create a professional relationship or an obligation to assist.',
  'contact.errorName': 'Please enter your name',
  'contact.errorEmail': 'Invalid email',
  'contact.errorMessage': 'Briefly describe your situation (min. 10 characters)',
  'contact.whatsapp': 'WhatsApp',
  'contact.whatsappCta': 'Message on WhatsApp',
  'contact.linkedin': 'LinkedIn',
  'contact.viewProfile': 'View profile',
  'contact.location': 'Location',

  'testimonialForm.name': 'Name',
  'testimonialForm.role': 'Role or sector',
  'testimonialForm.rolePlaceholder': 'e.g. Small business owner',
  'testimonialForm.email': 'Email',
  'testimonialForm.emailHelp': "Not published. Only used to verify your review.",
  'testimonialForm.rating': 'Rating',
  'testimonialForm.quote': 'Your review',
  'testimonialForm.thanks': 'Thanks for your review!',
  'testimonialForm.thanksBody': "I'll review it before it's published on the site.",
  'testimonialForm.writeAnother': 'Write another',
  'testimonialForm.send': 'Submit review',
  'testimonialForm.sendError': 'Could not send it. Please try again.',
  'testimonialForm.errorName': 'Please enter your name',
  'testimonialForm.errorEmail': 'Invalid email',
  'testimonialForm.errorQuote': 'Tell us a bit more (min. 10 characters)',

  'notFound.body': "The page you're looking for doesn't exist or has moved.",
  'notFound.backHome': 'Back to home',

  'admin.nav.summary': 'Summary',
  'admin.nav.profile': 'Profile',
  'admin.nav.cases': 'Cases',
  'admin.nav.areas': 'Practice areas',
  'admin.nav.experience': 'Experience',
  'admin.nav.publications': 'Publications',
  'admin.nav.testimonials': 'Testimonials',
  'admin.nav.messages': 'Messages',
  'admin.title': 'Admin panel',
  'admin.viewSite': 'View site ↗',
  'admin.logout': 'Log out',

  'login.backToSite': '← Back to site',
  'login.subtitle': "Private access for the portfolio's owner.",
  'login.email': 'Email',
  'login.password': 'Password',
  'login.submit': 'Sign in',
  'login.submitting': 'Signing in…',
  'login.error': 'Could not sign in',
  'login.demoNotice': 'Demo mode ({mode}). Preloaded credentials:',

  'dashboard.greeting': 'Hi',
  'dashboard.subtitle': 'From here you manage everything shown on your public portfolio.',
  'dashboard.cases': 'Cases',
  'dashboard.areas': 'Practice areas',
  'dashboard.publications': 'Publications',
  'dashboard.pendingTestimonials': 'Pending testimonials',
  'dashboard.unreadMessages': 'Unread messages',
  'dashboard.recentMessages': 'Recent messages',
  'dashboard.viewAll': 'View all',
  'dashboard.noMessages': 'No messages yet.',
  'dashboard.demoTitle': 'Demo data',
  'dashboard.demoBody': 'Useful before an interview: resets the portfolio to the original sample content.',
  'dashboard.demoRestore': 'Restore demo data',
  'dashboard.demoRestoring': 'Restoring…',
  'dashboard.demoConfirm': 'This restores all demo data and discards your changes. Continue?',
  'dashboard.demoRestored': 'Demo data restored',

  'messages.title': 'Messages',
  'messages.subtitle': 'Inquiries received through the contact form.',
  'messages.empty': "You haven't received any messages yet",
  'messages.reply': 'Reply',
  'messages.markUnread': 'Mark as unread',
  'messages.markRead': 'Mark as read',
  'messages.delete': 'Delete',
  'messages.deleteConfirm': 'Delete this message?',

  'collectionAdmin.new': 'New',
  'collectionAdmin.edit': 'Edit',
  'collectionAdmin.delete': 'Delete',
  'collectionAdmin.emptyTitle': 'No {title} yet',
  'collectionAdmin.emptyHint': 'Click "New" to add the first one.',
  'collectionAdmin.deleteConfirm': 'Delete this {item}? This action cannot be undone.',
  'collectionAdmin.created': '{item} created',
  'collectionAdmin.updated': '{item} updated',
  'collectionAdmin.deleted': '{item} deleted',
  'collectionAdmin.newDrawer': 'New ·',
  'collectionAdmin.editDrawer': 'Edit ·',

  'autoForm.required': 'The "{field}" field is required.',

  'profileEdit.title': 'Profile',
  'profileEdit.intro': 'This information appears on the homepage, in "About" and on the contact page.',
  'profileEdit.save': 'Save profile',
  'profileEdit.saved': 'Profile saved',
}

const DICTS: Record<Lang, Dict> = { es, en }

export type TKey = keyof typeof es
export type TFn = (key: TKey, vars?: Record<string, string | number>) => string

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TFn
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    /* localStorage no disponible (SSR, modo privado…) */
  }
  return 'es'
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match,
  )
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* ignorar */
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => interpolate(DICTS[lang][key] ?? DICTS.es[key] ?? key, vars),
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}

/** Atajo cuando solo hace falta `t`. */
export function useT() {
  return useLanguage().t
}
