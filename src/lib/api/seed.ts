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
 */

export const seedProfile: Profile = {
  fullName: 'Valentina Ortega',
  title: 'Abogada laboralista y de extranjería',
  headline:
    'Acompaño a personas trabajadoras y a pymes en conflictos laborales, despidos y procesos de extranjería, con un enfoque práctico y cercano.',
  summary:
    'Soy abogada colegiada con más de diez años de ejercicio independiente. Mi trabajo se centra en el Derecho del Trabajo y de la Seguridad Social, y en procedimientos de extranjería. Litigo ante los juzgados de lo social y de lo contencioso-administrativo, pero antes agoto siempre la vía de la negociación: la mayoría de mis asuntos se resuelven con un acuerdo razonable para mi cliente. Doy respuestas claras, sin tecnicismos innecesarios, y explico cada paso del proceso.',
  location: 'Madrid, España',
  email: 'contacto@valentinaortega.example',
  phone: '+34 600 000 000',
  whatsapp: '34600000000',
  linkedin: 'https://www.linkedin.com/in/ejemplo',
  avatarUrl: '',
  cvUrl: '',
  languages: ['Español (nativo)', 'Inglés (C1)', 'Portugués (B2)'],
  barAdmissions: [
    'Ilustre Colegio de la Abogacía de Madrid (nº 000000)',
    'Turno de oficio de extranjería',
  ],
  education: [
    {
      degree: 'Máster de Acceso a la Abogacía',
      institution: 'Universidad Complutense de Madrid',
      year: '2013',
    },
    {
      degree: 'Grado en Derecho',
      institution: 'Universidad de Salamanca',
      year: '2012',
    },
    {
      degree: 'Curso de especialización en Derecho de Extranjería',
      institution: 'Consejo General de la Abogacía Española',
      year: '2016',
    },
  ],
  stats: [
    { label: 'Años de ejercicio', value: '10+' },
    { label: 'Asuntos gestionados', value: '400+' },
    { label: 'Resueltos con acuerdo', value: '68%' },
    { label: 'Idiomas de trabajo', value: '3' },
  ],
}

export const seedAreas: PracticeArea[] = [
  {
    id: 'area-laboral',
    slug: 'derecho-laboral',
    name: 'Derecho laboral',
    summary: 'Despidos, reclamaciones de cantidad, modificaciones sustanciales y acoso laboral.',
    description:
      'Asesoro y represento a personas trabajadoras y a pequeñas empresas en toda la relación laboral: contratación, modificaciones de condiciones, sanciones, despidos individuales y colectivos, reclamaciones de salarios y horas extra, y situaciones de acoso o vulneración de derechos fundamentales. Preparo la papeleta de conciliación, negocio ante el SMAC y litigo ante el Juzgado de lo Social cuando no hay acuerdo.',
    faqs: [
      {
        q: '¿Cuánto tiempo tengo para impugnar un despido?',
        a: 'El plazo es de 20 días hábiles desde la fecha de efectos del despido. Es un plazo de caducidad, muy estricto: conviene consultar cuanto antes.',
      },
      {
        q: '¿Qué diferencia hay entre despido improcedente y nulo?',
        a: 'En el improcedente la empresa elige entre readmitir o indemnizar. En el nulo (por vulnerar derechos fundamentales o afectar a personas especialmente protegidas) la readmisión es obligatoria, con abono de los salarios de tramitación.',
      },
    ],
    order: 1,
  },
  {
    id: 'area-extranjeria',
    slug: 'extranjeria',
    name: 'Extranjería',
    summary: 'Arraigo, reagrupación familiar, renovaciones, nacionalidad y recursos.',
    description:
      'Tramito autorizaciones de residencia y trabajo (arraigo social, laboral y familiar), reagrupación familiar, tarjetas de familiar de ciudadano de la UE, renovaciones y solicitudes de nacionalidad por residencia. Interpongo recursos de reposición y contencioso-administrativos frente a denegaciones y frente a expedientes de expulsión.',
    faqs: [
      {
        q: '¿Puedo trabajar con una autorización por arraigo social?',
        a: 'Sí. El arraigo social habilita para trabajar por cuenta ajena o propia si se acredita el medio de vida correspondiente; desde las últimas reformas el contrato ya no es requisito imprescindible en todos los casos.',
      },
      {
        q: '¿Cuánto tarda un expediente de nacionalidad?',
        a: 'Depende de la carga de la Dirección General de Seguridad Jurídica y Fe Pública, pero el plazo legal de resolución es de un año desde que el expediente está completo. Superado ese plazo cabe recurso por silencio.',
      },
    ],
    order: 2,
  },
  {
    id: 'area-seguridad-social',
    slug: 'seguridad-social',
    name: 'Seguridad Social',
    summary: 'Incapacidad permanente, prestaciones denegadas y recargo por falta de medidas.',
    description:
      'Reclamo frente al INSS y la Seguridad Social: grados de incapacidad permanente (parcial, total, absoluta y gran invalidez), prestaciones por nacimiento y cuidado, desempleo, y recargo de prestaciones por falta de medidas de seguridad. Presento la reclamación administrativa previa y, en su caso, demanda ante el Juzgado de lo Social.',
    faqs: [
      {
        q: 'Me han denegado la incapacidad permanente, ¿qué puedo hacer?',
        a: 'Tienes 30 días para presentar reclamación administrativa previa ante el INSS y, si se desestima, 30 días para demanda judicial. Es clave aportar informes médicos actualizados y, si es posible, un informe pericial.',
      },
    ],
    order: 3,
  },
  {
    id: 'area-mediacion',
    slug: 'mediacion-y-negociacion',
    name: 'Mediación y negociación',
    summary: 'Acuerdos de salida, pactos de no competencia y conflictos entre socios.',
    description:
      'Diseño y conduzco negociaciones en conflictos laborales y mercantiles de baja cuantía: acuerdos de extinción indemnizada, pactos de confidencialidad y no competencia, planes de pago y salidas negociadas entre socios de pymes. El objetivo es cerrar el asunto rápido, por escrito y sin desgaste procesal.',
    faqs: [],
    order: 4,
  },
]

export const seedCases: Case[] = [
  {
    id: 'case-1',
    slug: 'despido-nulo-readmision',
    title: 'Despido declarado nulo con readmisión inmediata',
    area: 'Derecho laboral',
    year: 2024,
    role: 'Dirección letrada (parte trabajadora)',
    resultType: 'sentencia',
    outcome: 'Readmisión + 14.200 € de salarios de tramitación',
    situation:
      'La empresa despidió a la trabajadora dos semanas después de comunicar su embarazo, alegando causas objetivas de tipo económico que no estaban acreditadas.',
    action:
      'Se presentó papeleta de conciliación y, sin avenencia, demanda por despido nulo con vulneración del derecho a la no discriminación por razón de sexo. Se solicitó el interrogatorio de la dirección y prueba documental sobre la situación real de la empresa.',
    result:
      'El Juzgado de lo Social declaró la nulidad del despido, ordenó la readmisión con abono de los salarios de tramitación y una indemnización adicional por daño moral.',
    skills: ['Litigio laboral', 'Derechos fundamentales', 'Prueba documental'],
    featured: true,
    confidential: true,
    imageUrl: '',
  },
  {
    id: 'case-2',
    slug: 'arraigo-social-tras-denegacion',
    title: 'Arraigo social concedido tras recurso de reposición',
    area: 'Extranjería',
    year: 2024,
    role: 'Dirección letrada (solicitante)',
    resultType: 'dictamen',
    outcome: 'Autorización de residencia y trabajo por 1 año',
    situation:
      'La Oficina de Extranjería denegó una solicitud de arraigo social por considerar insuficiente la acreditación de la permanencia continuada en España.',
    action:
      'Se interpuso recurso de reposición aportando empadronamiento histórico, informes de servicios sociales, certificados médicos y declaraciones de terceros para completar la prueba de los tres años de estancia.',
    result:
      'La Administración estimó el recurso y concedió la autorización sin necesidad de acudir a la vía contencioso-administrativa.',
    skills: ['Extranjería', 'Recursos administrativos', 'Prueba de arraigo'],
    featured: true,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-3',
    slug: 'incapacidad-permanente-total',
    title: 'Incapacidad permanente total reconocida en vía judicial',
    area: 'Seguridad Social',
    year: 2023,
    role: 'Dirección letrada (parte demandante)',
    resultType: 'sentencia',
    outcome: 'Pensión vitalicia del 55% de la base reguladora',
    situation:
      'El INSS denegó el grado de incapacidad permanente total a un trabajador de la construcción con patología lumbar crónica, calificándolo como apto con limitaciones.',
    action:
      'Se presentó reclamación previa y demanda, con informe pericial médico independiente y valoración de los requerimientos reales del puesto de trabajo.',
    result:
      'La sentencia reconoció la incapacidad permanente total para la profesión habitual, con efectos económicos desde la fecha de la resolución denegatoria.',
    skills: ['Seguridad Social', 'Pericial médica', 'Litigio'],
    featured: true,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-4',
    slug: 'acuerdo-salida-directiva',
    title: 'Salida negociada de una directiva con pacto de no competencia',
    area: 'Mediación y negociación',
    year: 2023,
    role: 'Asesoramiento y negociación (parte trabajadora)',
    resultType: 'acuerdo',
    outcome: 'Indemnización equivalente a 18 meses + compensación por no competencia',
    situation:
      'Una directiva quería abandonar la empresa por un cambio de proyecto profesional, pero su contrato incluía un pacto de permanencia y otro de no competencia postcontractual.',
    action:
      'Se negoció con la empresa un acuerdo global: extinción de mutuo acuerdo, renuncia al pacto de permanencia y compensación económica por el mantenimiento parcial de la no competencia durante doce meses.',
    result:
      'Acuerdo firmado en tres semanas, sin proceso judicial, con calendario de pagos garantizado y cláusula de confidencialidad recíproca.',
    skills: ['Negociación', 'Alta dirección', 'Pactos postcontractuales'],
    featured: false,
    confidential: true,
    imageUrl: '',
  },
  {
    id: 'case-5',
    slug: 'reclamacion-horas-extra-logistica',
    title: 'Reclamación de horas extra en el sector logístico',
    area: 'Derecho laboral',
    year: 2022,
    role: 'Dirección letrada (parte trabajadora)',
    resultType: 'acuerdo',
    outcome: 'Abono de 9.800 € en conciliación',
    situation:
      'Un grupo de cuatro repartidores realizaba de forma sistemática horas por encima de la jornada pactada sin registro ni compensación.',
    action:
      'Se reconstruyó la jornada real a partir de los partes de ruta y la geolocalización de la flota, y se presentó papeleta de conciliación conjunta.',
    result:
      'La empresa reconoció la deuda en el acto de conciliación y abonó las cantidades reclamadas, además de implantar un sistema de registro horario.',
    skills: ['Reclamación de cantidad', 'Registro de jornada', 'Conciliación'],
    featured: false,
    confidential: false,
    imageUrl: '',
  },
  {
    id: 'case-6',
    slug: 'archivo-expediente-expulsion',
    title: 'Archivo de un expediente de expulsión por estancia irregular',
    area: 'Extranjería',
    year: 2022,
    role: 'Dirección letrada (interesado)',
    resultType: 'archivo',
    outcome: 'Expediente archivado; multa en lugar de expulsión',
    situation:
      'Se incoó un expediente de expulsión con prohibición de entrada frente a una persona con estancia irregular pero con fuerte arraigo familiar y laboral.',
    action:
      'Se presentaron alegaciones invocando la jurisprudencia del TJUE sobre proporcionalidad y la situación familiar (menores escolarizados a cargo), solicitando la sustitución por sanción de multa.',
    result:
      'La Subdelegación del Gobierno acordó no imponer la expulsión y sustituirla por multa, dejando expedita la vía para regularizar la situación.',
    skills: ['Extranjería sancionadora', 'Derecho de la UE', 'Alegaciones'],
    featured: false,
    confidential: false,
    imageUrl: '',
  },
]

export const seedExperience: Experience[] = [
  {
    id: 'exp-1',
    org: 'Despacho propio — Ortega Abogacía',
    role: 'Abogada titular',
    startDate: '2018-01',
    endDate: null,
    current: true,
    location: 'Madrid',
    description:
      'Ejercicio independiente en Derecho laboral, Seguridad Social y extranjería. Cartera propia de personas trabajadoras y pymes. Colaboración habitual con graduados sociales y peritos médicos.',
  },
  {
    id: 'exp-2',
    org: 'García-Luna & Asociados',
    role: 'Abogada del área laboral',
    startDate: '2014-09',
    endDate: '2017-12',
    current: false,
    location: 'Madrid',
    description:
      'Litigación laboral para clientes empresa y trabajadores. Despidos colectivos, conflictos de convenio y auditorías de cumplimiento en materia de contratación.',
  },
  {
    id: 'exp-3',
    org: 'Servicio de Orientación Jurídica (ICAM)',
    role: 'Abogada voluntaria',
    startDate: '2015-01',
    endDate: '2019-06',
    current: false,
    location: 'Madrid',
    description:
      'Orientación jurídica gratuita en materia de extranjería y vivienda a personas en situación de vulnerabilidad.',
  },
]

export const seedPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'El nuevo reglamento de extranjería: claves prácticas para el arraigo',
    kind: 'articulo',
    venue: 'Blog jurídico — Legaltoday',
    date: '2025-03-11',
    url: '',
    summary:
      'Análisis de los cambios en las modalidades de arraigo y su impacto en la acreditación de la permanencia y del medio de vida.',
  },
  {
    id: 'pub-2',
    title: 'Registro de jornada y prueba de las horas extraordinarias',
    kind: 'ponencia',
    venue: 'Jornadas de actualización laboral — ICAM',
    date: '2024-10-02',
    url: '',
    summary:
      'Ponencia sobre el valor probatorio del registro horario y las consecuencias de su ausencia en las reclamaciones de cantidad.',
  },
  {
    id: 'pub-3',
    title: 'Despido y garantía de indemnidad: repaso de jurisprudencia reciente',
    kind: 'articulo',
    venue: 'Revista de Derecho del Trabajo (colaboración)',
    date: '2023-06-20',
    url: '',
    summary:
      'Comentario a varias sentencias sobre nulidad del despido como represalia frente a reclamaciones previas del trabajador.',
  },
]

export const seedTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Me explicó las opciones con total claridad y siempre supe en qué punto estaba mi caso. Conseguimos un acuerdo mejor del que esperaba.',
    author: 'Cliente — reclamación por despido',
    authorRole: 'Sector comercio',
    context: '2024',
  },
  {
    id: 'test-2',
    quote:
      'Llevó mi expediente de arraigo después de una denegación. Fue meticulosa con la documentación y lo resolvió sin tener que ir a juicio.',
    author: 'Cliente — extranjería',
    authorRole: 'Arraigo social',
    context: '2024',
  },
  {
    id: 'test-3',
    quote:
      'Como pequeña empresa necesitábamos alguien que fuera al grano. Nos ayudó a negociar una salida sin conflicto y con todo por escrito.',
    author: 'Gerente de pyme',
    authorRole: 'Sector servicios',
    context: '2023',
  },
]

export const seedMessages: Message[] = [
  {
    id: 'msg-1',
    name: 'Laura Méndez',
    email: 'laura.mendez@example.com',
    phone: '+34 611 111 111',
    message:
      'Buenos días, me han comunicado un despido objetivo y creo que no está justificado. ¿Podríamos hablar esta semana?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Carlos Ntutumu',
    email: 'carlos.n@example.com',
    phone: '',
    message:
      'Necesito renovar mi tarjeta de residencia y tengo dudas con la documentación de la vida laboral. Gracias.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    read: true,
  },
]

export const DEMO_CREDENTIALS = {
  email: 'admin@demo.com',
  password: 'demo1234',
}
