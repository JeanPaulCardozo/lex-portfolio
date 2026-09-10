const MONTHS = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

/** "2023-05" | "2023-05-14" -> "may 2023" */
export function formatMonthYear(value: string | null): string {
  if (!value) return 'Actualidad'
  const [y, m] = value.split('-')
  const mi = Number(m) - 1
  if (!y || Number.isNaN(mi) || mi < 0 || mi > 11) return value
  return `${MONTHS[mi]} ${y}`
}

/** "2024-02-09" -> "9 feb 2024" */
export function formatDate(value: string): string {
  const [y, m, d] = value.split('-')
  const mi = Number(m) - 1
  if (!y || !d || Number.isNaN(mi)) return value
  return `${Number(d)} ${MONTHS[mi]} ${y}`
}

/**
 * Construye el enlace de WhatsApp a partir de lo que el titular guarde en el
 * perfil. Acepta dos formatos:
 *   - Número con prefijo internacional: "573001234567", "+57 300 123 4567"
 *   - Nombre de usuario de WhatsApp:     "@miusuario"
 * Devuelve `null` si el valor está vacío o no deja nada utilizable.
 */
export function whatsappHref(value: string): string | null {
  const v = (value ?? '').trim()
  if (!v) return null
  if (v.startsWith('@')) {
    const handle = v.slice(1).replace(/[^a-zA-Z0-9._]/g, '')
    return handle ? `https://wa.me/${handle}` : null
  }
  const digits = v.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : null
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    // tras NFD las tildes quedan como marcas combinantes fuera del rango ASCII imprimible
    .replace(/[^ -~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60)
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}
