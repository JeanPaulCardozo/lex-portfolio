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
