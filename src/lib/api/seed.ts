import type {
  Case,
  Experience,
  Message,
  PracticeArea,
  Profile,
  Publication,
  Testimonial,
} from './types'

/**
 * Datos de demostración (ficticios). Sirven para mostrar el MVP sin necesidad de
 * la API real. El abogado los reemplaza desde el panel /admin.
 *
 * Ambientación: ejercicio independiente en Colombia, con foco en Derecho Procesal
 * (litigio civil y laboral, acción de tutela y conciliación).
 */

export const seedProfile: Profile = {
  fullName: 'María Banda',
  title: 'Abogada · Especialista en Derecho Procesal',
  headline:
    'Represento a personas y pymes en litigios civiles, laborales y de tutela ante la Rama Judicial, con estrategia procesal clara y comunicación en cada etapa.',
  summary:
    'Soy abogada con tarjeta profesional y más de diez años de ejercicio independiente, especialista en Derecho Procesal. Concentro mi práctica en el litigio civil y laboral y en la acción de tutela, bajo el Código General del Proceso y el Código Procesal del Trabajo y de la Seguridad Social. Antes de demandar agoto la conciliación y las salidas negociadas; cuando el proceso es inevitable, defino una estrategia probatoria y de recursos y explico cada etapa —audiencias, pruebas y términos— sin tecnicismos innecesarios.',
  location: 'Cartagena, Colombia',
  email: 'contacto@mariabanda.example',
  notifyEmail: '',
  phone: '+57 300 000 0000',
  whatsapp: '573000000000',
  linkedin: 'https://www.linkedin.com/in/ejemplo',
  avatarUrl: '',
  cvUrl: '',
  languages: ['Español (nativo)', 'Inglés (B2)'],
  barAdmissions: [
    'Tarjeta profesional de abogada — Consejo Superior de la Judicatura',
    'Inscrita como conciliadora en derecho — Ministerio de Justicia',
  ],
  education: [
    {
      degree: 'Especialización en Derecho Procesal',
      institution: 'Universidad Libre',
      year: '',
    },
    {
      degree: 'Pregrado en Derecho',
      institution: 'Universidad Libre',
      year: '',
    },
    {
      degree: 'Educación básica primaria y media académica',
      institution: 'Ciudad Escolar Comfenalco (Cartagena)',
      year: '',
    },
  ],
  stats: [
    { label: 'Años de ejercicio', value: '10+' },
    { label: 'Procesos gestionados', value: '400+' },
    { label: 'Resueltos por conciliación', value: '62%' },
    { label: 'Audiencias al año', value: '120+' },
  ],
}

export const seedAreas: PracticeArea[] = [
  {
    id: 'area-civil',
    slug: 'derecho-procesal-civil',
    name: 'Derecho procesal civil',
    summary:
      'Procesos ejecutivos y declarativos, medidas cautelares, restitución de inmueble y responsabilidad civil.',
    description:
      'Asesoro y litigo en asuntos civiles bajo el Código General del Proceso: procesos ejecutivos (con títulos valores o contractuales) y declarativos (verbales y verbales sumarios), restitución de inmueble arrendado, responsabilidad civil contractual y extracontractual, pertenencia y servidumbres. Solicito y controvierto medidas cautelares (embargo y secuestro, inscripción de la demanda), preparo la prueba para la audiencia inicial y la de instrucción y juzgamiento, y sustento los recursos de reposición, apelación y, cuando procede, casación.',
    faqs: [
      {
        q: '¿Qué necesito para iniciar un proceso ejecutivo?',
        a: 'Un título ejecutivo: un documento que contenga una obligación clara, expresa y exigible (pagaré, letra, factura, contrato, acta de conciliación, sentencia). Con él se libra mandamiento de pago y se pueden pedir medidas cautelares desde el inicio.',
      },
      {
        q: '¿Cuánto puede durar un proceso verbal?',
        a: 'Depende del despacho y de la práctica de pruebas, pero el Código General del Proceso fija una meta de un año en primera instancia y seis meses en segunda. En la práctica suele extenderse; una estrategia probatoria ordenada ayuda a evitar aplazamientos.',
      },
    ],
    order: 1,
  },
  {
    id: 'area-laboral',
    slug: 'derecho-procesal-laboral',
    name: 'Derecho procesal laboral',
    summary:
      'Reclamación de prestaciones, despidos, estabilidad laboral reforzada y acoso laboral.',
    description:
      'Represento a trabajadores y a pequeñas empresas ante los juzgados laborales del circuito bajo el Código Procesal del Trabajo y de la Seguridad Social: reclamación de salarios, horas extra y recargos, liquidación y reliquidación de prestaciones sociales, despidos sin justa causa, ineficacia del despido por estabilidad laboral reforzada (embarazo, salud, fuero sindical) y acoso laboral. Agoto la reclamación administrativa y la conciliación, y llevo el proceso ordinario hasta la audiencia de trámite y juzgamiento.',
    faqs: [
      {
        q: '¿En cuánto tiempo prescriben las acreencias laborales?',
        a: 'La regla general es de tres años contados desde que la obligación se hace exigible (art. 488 del CST y 151 del CPTSS). La reclamación escrita al empleador interrumpe la prescripción por una sola vez.',
      },
      {
        q: '¿Qué es la estabilidad laboral reforzada?',
        a: 'Es la protección especial frente al despido de personas en situación de embarazo, con afectación de salud o con fuero sindical. Sin autorización previa del inspector de trabajo o del juez, el despido se presume ineficaz y procede el reintegro con pago de lo dejado de percibir.',
      },
    ],
    order: 2,
  },
  {
    id: 'area-tutela',
    slug: 'accion-de-tutela',
    name: 'Acción de tutela y litigio constitucional',
    summary:
      'Protección de derechos fundamentales, tutela contra providencias judiciales e incidentes de desacato.',
    description:
      'Presento acciones de tutela (art. 86 de la Constitución) para la protección inmediata de derechos fundamentales frente a autoridades y particulares: mora en el reconocimiento de prestaciones, acceso a la salud, debido proceso administrativo y mínimo vital. Tramito la tutela contra providencias judiciales cuando se cumplen las causales de procedibilidad, e impulso el incidente de desacato hasta el cumplimiento efectivo del fallo.',
    faqs: [
      {
        q: '¿En cuánto tiempo se resuelve una tutela?',
        a: 'El juez debe fallar en un máximo de diez días hábiles desde el reparto. El fallo se puede impugnar dentro de los tres días siguientes a su notificación y la Corte Constitucional puede seleccionarlo para revisión.',
      },
      {
        q: '¿Se puede tutelar una sentencia?',
        a: 'Sí, de forma excepcional. Debe agotarse todo recurso ordinario y extraordinario, cumplirse el requisito de inmediatez y configurarse un defecto (fáctico, sustantivo, procedimental, entre otros) que vulnere derechos fundamentales.',
      },
    ],
    order: 3,
  },
  {
    id: 'area-masc',
    slug: 'conciliacion-y-masc',
    name: 'Conciliación y MASC',
    summary:
      'Conciliación extrajudicial como requisito de procedibilidad, acuerdos de pago e insolvencia de persona natural.',
    description:
      'Diseño y conduzco procesos de conciliación en derecho y otros mecanismos alternativos de solución de conflictos: audiencias en centros de conciliación, acuerdos de pago con mérito ejecutivo, transacciones y cláusulas compromisorias. También acompaño trámites de insolvencia de persona natural no comerciante (arts. 531 y siguientes del CGP) para negociar y formalizar acuerdos con los acreedores.',
    faqs: [
      {
        q: '¿La conciliación es obligatoria antes de demandar?',
        a: 'En varios asuntos civiles y de familia la conciliación extrajudicial en derecho es requisito de procedibilidad: sin la constancia de que se intentó, el juez rechaza la demanda. En materia laboral no es obligatoria, pero suele ser conveniente.',
      },
    ],
    order: 4,
  },
]

export const seedCases: Case[] = [
  {
    id: 'case-1',
    slug: 'ejecutivo-pago-total-tras-cautelares',
    title: 'Proceso ejecutivo: pago total del capital tras decretarse medidas cautelares',
    area: 'Derecho procesal civil',
    year: 2024,
    role: 'Apoderada de la parte demandante (ejecutante)',
    resultType: 'acuerdo',
    outcome: 'Pago de $92.000.000 más intereses y costas antes de la sentencia',
    situation:
      'Una pyme del sector de suministros no logró el pago de dos pagarés vencidos pese a varios requerimientos. El deudor tenía capacidad de pago pero dilataba la negociación.',
    action:
      'Se presentó demanda ejecutiva con los títulos valores y se solicitaron medidas cautelares. Decretados el embargo y secuestro de cuentas y de un vehículo, se libró mandamiento de pago y se controvirtieron las excepciones propuestas.',
    result:
      'Antes de la audiencia, el deudor pagó la totalidad del capital, los intereses de mora liquidados y las costas. Se levantaron las cautelas y se dio por terminado el proceso por pago total de la obligación.',
    skills: ['Proceso ejecutivo', 'Medidas cautelares', 'Títulos valores'],
    featured: true,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-2',
    slug: 'restitucion-inmueble-arrendado',
    title: 'Restitución de inmueble arrendado por mora en el pago de cánones',
    area: 'Derecho procesal civil',
    year: 2024,
    role: 'Apoderada de la parte demandante (arrendadora)',
    resultType: 'sentencia',
    outcome: 'Sentencia de restitución y pago de $18.000.000 en cánones adeudados',
    situation:
      'El arrendatario de un local comercial acumuló seis cánones sin pagar y se negaba a entregar el inmueble, lo que impedía a la propietaria arrendarlo de nuevo.',
    action:
      'Se adelantó el proceso de restitución de inmueble arrendado, aportando el contrato, la prueba de la mora y los paz y salvos de servicios. Se pidió el embargo de los cánones y la práctica anticipada de la inspección.',
    result:
      'La sentencia ordenó la restitución y el pago de los cánones y servicios adeudados. La entrega se materializó en diligencia de lanzamiento con acompañamiento de la Policía.',
    skills: ['Restitución de inmueble', 'Contratos de arrendamiento', 'Diligencia de lanzamiento'],
    featured: true,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-3',
    slug: 'reintegro-estabilidad-laboral-reforzada',
    title: 'Ineficacia del despido y reintegro por estabilidad laboral reforzada',
    area: 'Derecho procesal laboral',
    year: 2023,
    role: 'Apoderada de la parte demandante (trabajadora)',
    resultType: 'sentencia',
    outcome: 'Reintegro, pago de lo dejado de percibir e indemnización del art. 239 del CST',
    situation:
      'Una trabajadora fue despedida sin justa causa dos semanas después de informar su estado de embarazo, sin autorización del inspector de trabajo.',
    action:
      'Se presentó demanda ordinaria laboral por ineficacia del despido y, de forma paralela, acción de tutela como mecanismo transitorio ante el riesgo para el mínimo vital. Se aportó la historia clínica y las comunicaciones con la empresa.',
    result:
      'El juzgado declaró la ineficacia del despido, ordenó el reintegro sin solución de continuidad, el pago de salarios y prestaciones dejados de percibir y la indemnización equivalente a sesenta días de salario.',
    skills: ['Litigio laboral', 'Estabilidad laboral reforzada', 'Acción de tutela'],
    featured: true,
    confidential: true,
    imageUrl: '',
  },
  {
    id: 'case-4',
    slug: 'conciliacion-horas-extra-vigilancia',
    title: 'Conciliación por horas extra y recargos en el sector de vigilancia',
    area: 'Derecho procesal laboral',
    year: 2022,
    role: 'Apoderada de la parte demandante (trabajadores)',
    resultType: 'acuerdo',
    outcome: 'Conciliación por $34.000.000 en la audiencia inicial',
    situation:
      'Tres vigilantes cubrían turnos de doce horas sin pago de recargos nocturnos, dominicales ni horas extra, y con prestaciones liquidadas sobre un salario base incompleto.',
    action:
      'Se reconstruyeron los turnos reales a partir de minutas y planillas de relevo y se presentó demanda ordinaria laboral acumulada. En la audiencia inicial se sustentó la liquidación actualizada.',
    result:
      'La empresa reconoció la deuda por recargos, horas extra y reliquidación de prestaciones, que se formalizó en acta de conciliación con mérito ejecutivo y calendario de pagos.',
    skills: ['Derecho laboral', 'Horas extra y recargos', 'Conciliación judicial'],
    featured: false,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-5',
    slug: 'tutela-mora-reconocimiento-pensional',
    title: 'Acción de tutela por mora en el reconocimiento de una pensión de invalidez',
    area: 'Acción de tutela y litigio constitucional',
    year: 2024,
    role: 'Apoderada en la acción de tutela (accionante)',
    resultType: 'sentencia',
    outcome: 'Reconocimiento y pago del retroactivo pensional en 48 horas',
    situation:
      'El fondo de pensiones dilató más de ocho meses la resolución de fondo sobre una pensión de invalidez, dejando al afiliado sin ingresos ni afiliación a salud.',
    action:
      'Se presentó acción de tutela por vulneración del mínimo vital, la seguridad social y el debido proceso administrativo, con prueba de las radicaciones y del silencio de la entidad.',
    result:
      'El fallo ordenó resolver de fondo en cuarenta y ocho horas y pagar el retroactivo. Ante el incumplimiento inicial se abrió incidente de desacato, tras el cual la entidad cumplió.',
    skills: ['Acción de tutela', 'Derecho a la seguridad social', 'Incidente de desacato'],
    featured: true,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-6',
    slug: 'conciliacion-responsabilidad-civil-transito',
    title: 'Conciliación en responsabilidad civil por un accidente de tránsito',
    area: 'Conciliación y MASC',
    year: 2023,
    role: 'Apoderada del convocante',
    resultType: 'acuerdo',
    outcome: 'Acuerdo conciliatorio por $47.000.000, pagadero en 30 días',
    situation:
      'Un conductor sufrió daños materiales y lucro cesante por la inactividad de su vehículo de trabajo tras un choque. La aseguradora ofrecía una suma que no cubría el perjuicio real.',
    action:
      'Se convocó audiencia de conciliación extrajudicial en un centro de conciliación, respaldada por un dictamen pericial sobre el lucro cesante y las cotizaciones de reparación.',
    result:
      'Se logró un acuerdo conciliatorio, que presta mérito ejecutivo, por el cien por ciento de los daños y el setenta por ciento del lucro cesante, con pago en treinta días.',
    skills: ['Conciliación extrajudicial', 'Responsabilidad civil', 'Dictamen pericial'],
    featured: false,
    confidential: true,
    imageUrl: '',
  },
]

export const seedExperience: Experience[] = [
  {
    id: 'exp-1',
    org: 'Despacho propio — María Banda',
    role: 'Abogada titular',
    startDate: '2018-01',
    endDate: null,
    current: true,
    location: 'Cartagena',
    description:
      'Ejercicio independiente en litigio civil, laboral y constitucional. Representación ante juzgados civiles y laborales del circuito y el Tribunal Superior del Distrito Judicial de Bolívar. Cartera propia de personas y pymes; colaboración con peritos y con abogados de familia.',
  },
  {
    id: 'exp-2',
    org: 'Restrepo & Asociados',
    role: 'Abogada litigante — área civil y de cobros',
    startDate: '2014-09',
    endDate: '2017-12',
    current: false,
    location: 'Cartagena',
    description:
      'Procesos ejecutivos y declarativos para clientes empresa, insolvencia de persona natural y recuperación de cartera. Elaboración de demandas, sustentación de audiencias y recursos de apelación.',
  },
  {
    id: 'exp-3',
    org: 'Consultorio Jurídico — Universidad Libre',
    role: 'Asesora y monitora',
    startDate: '2015-01',
    endDate: '2019-06',
    current: false,
    location: 'Cartagena',
    description:
      'Orientación jurídica gratuita en asuntos civiles, de familia y laborales a población en situación de vulnerabilidad, y acompañamiento a estudiantes en la práctica procesal.',
  },
]

export const seedPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Medidas cautelares en el proceso ejecutivo bajo el Código General del Proceso',
    kind: 'articulo',
    venue: 'Blog jurídico — Ámbito Jurídico',
    date: '2025-03-11',
    url: '',
    summary:
      'Análisis práctico del embargo y secuestro, la caución y el levantamiento de cautelas, con criterios recientes de los tribunales.',
  },
  {
    id: 'pub-2',
    title: 'La tutela contra providencias judiciales: causales de procedibilidad',
    kind: 'ponencia',
    venue: 'Jornada de actualización procesal — Universidad Libre, Seccional Cartagena',
    date: '2024-10-02',
    url: '',
    summary:
      'Ponencia sobre los requisitos generales y específicos fijados por la Corte Constitucional y su aplicación en el litigio civil y laboral.',
  },
  {
    id: 'pub-3',
    title: 'Estabilidad laboral reforzada: línea jurisprudencial de la Corte Constitucional',
    kind: 'articulo',
    venue: 'Revista de Derecho Laboral (colaboración)',
    date: '2023-06-20',
    url: '',
    summary:
      'Repaso de la evolución de la protección frente al despido por embarazo, salud y fuero sindical, y sus efectos procesales.',
  },
]

export const seedTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Me explicó las opciones con claridad y siempre supe en qué etapa iba el proceso. Logramos el pago completo sin llegar a sentencia.',
    author: 'Cliente — proceso ejecutivo',
    authorRole: 'Sector comercio',
    context: '2024',
    rating: 5,
    status: 'approved',
    email: '',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
  },
  {
    id: 'test-2',
    quote:
      'Llevó mi acción de tutela por la demora en la pensión. Fue rigurosa con las pruebas y se resolvió rápido, sin necesidad de más instancias.',
    author: 'Cliente — acción de tutela',
    authorRole: 'Seguridad social',
    context: '2024',
    rating: 5,
    status: 'approved',
    email: '',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
  },
  {
    id: 'test-3',
    quote:
      'Como pequeña empresa necesitábamos a alguien práctico. Nos ayudó a conciliar un conflicto contractual sin ir a juicio y con todo por escrito.',
    author: 'Gerente de pyme',
    authorRole: 'Sector servicios',
    context: '2023',
    rating: 4,
    status: 'approved',
    email: '',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
  {
    id: 'test-4',
    quote:
      'Me acompañó en la restitución de un local arrendado. Todo llegó a tiempo y el lanzamiento se hizo sin contratiempos.',
    author: 'Propietario — arrendamiento comercial',
    authorRole: 'Sector inmobiliario',
    context: '2024',
    rating: 5,
    status: 'pending',
    email: 'propietario@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
]

export const seedMessages: Message[] = [
  {
    id: 'msg-1',
    name: 'Laura Méndez',
    email: 'laura.mendez@example.com',
    phone: '+57 311 111 1111',
    message:
      'Buenos días. Me notificaron una demanda ejecutiva, pero creo que nunca me notificaron en debida forma el auto que la admitió y ya hay un embargo. ¿Podríamos hablar esta semana?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Carlos Ortega',
    email: 'carlos.ortega@example.com',
    phone: '',
    message:
      'Necesito iniciar un proceso de restitución de un inmueble arrendado. El arrendatario lleva cuatro meses sin pagar y no quiere entregar. Gracias.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    read: true,
  },
]

export const DEMO_CREDENTIALS = {
  email: 'admin@demo.com',
  password: 'demo1234',
}
