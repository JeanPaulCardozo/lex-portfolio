import { httpClient } from './http'
import { mockClient } from './mock'
import type { ApiClient } from './types'

const MODE = import.meta.env.VITE_API_MODE ?? 'mock'

/**
 * Punto único de acceso a datos para toda la app.
 *   VITE_API_MODE=mock  -> datos de demostración en el navegador (por defecto)
 *   VITE_API_MODE=live  -> API REST real (VITE_API_BASE_URL)
 */
export const api: ApiClient = MODE === 'live' ? httpClient : mockClient

export const API_MODE = MODE
export const TOKEN_KEY = 'lex_token'

export * from './types'
