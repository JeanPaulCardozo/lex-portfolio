# Contrato de API — `lex-portfolio`

Este documento define **exactamente** lo que el frontend espera de tu API.
Mientras no exista, la app funciona en `VITE_API_MODE=mock` con datos en el navegador.
Para conectar tu backend: `VITE_API_MODE=live` y `VITE_API_BASE_URL=https://tu-api/api`.

- Formato: **JSON** (`Content-Type: application/json`) salvo la subida de imágenes (`multipart/form-data`).
- Codificación de fechas: `YYYY-MM-DD` (publicaciones) o `YYYY-MM` (experiencia). `createdAt` va en ISO-8601.
- Autenticación: **JWT Bearer**. El frontend envía `Authorization: Bearer <token>` en las rutas privadas.
- CORS: permite el origen del frontend y la cabecera `Authorization`.
- El `BASE_URL` ya incluye el prefijo (p. ej. `/api`); las rutas de abajo son relativas a él.

## Convención de errores

Cualquier respuesta `>= 400` debe devolver:

```json
{ "message": "Texto legible para mostrar al usuario" }
```

(el frontend también acepta `error` o `detail` como clave alternativa).

| Código | Cuándo |
|-------:|--------|
| `400`  | Validación fallida |
| `401`  | Falta el token o es inválido/expirado |
| `403`  | Token válido pero sin permiso |
| `404`  | Recurso no encontrado |
| `422`  | Entidad no procesable (validación de campos) |

---

## 1. Autenticación

### `POST /auth/login`  — público

```jsonc
// Request
{ "email": "abogada@estudio.com", "password": "••••••••" }

// 200
{
  "token": "<jwt>",
  "user": { "id": "u_1", "name": "Valentina Ortega", "email": "abogada@estudio.com" }
}
// 401 -> { "message": "Credenciales incorrectas" }
```

### `GET /auth/me`  — privado

Valida el token y devuelve el usuario. El frontend la llama al cargar el panel.

```jsonc
// 200
{ "id": "u_1", "name": "Valentina Ortega", "email": "abogada@estudio.com" }
// 401 -> el frontend cierra sesión y redirige a /admin/login
```

> MVP: basta con **un** usuario (el titular del portafolio). No hace falta registro ni recuperación de contraseña.

---

## 2. Perfil  (objeto único)

### `GET /profile`  — público
### `PUT /profile`  — privado  (recibe el objeto completo, devuelve el actualizado)

```jsonc
{
  "fullName": "Valentina Ortega",
  "title": "Abogada laboralista y de extranjería",
  "headline": "Acompaño a personas trabajadoras y pymes...",
  "summary": "Texto largo de la biografía...",
  "location": "Madrid, España",
  "email": "contacto@ejemplo.com",
  "phone": "+34 600 000 000",
  "whatsapp": "34600000000",          // solo dígitos, para https://wa.me/<whatsapp>
  "linkedin": "https://linkedin.com/in/...",
  "avatarUrl": "https://cdn/.../foto.jpg",   // "" si no hay
  "cvUrl": "https://cdn/.../cv.pdf",          // "" si no hay
  "languages": ["Español (nativo)", "Inglés (C1)"],
  "barAdmissions": ["Ilustre Colegio de la Abogacía de Madrid (nº 000000)"],
  "education": [
    { "degree": "Máster de Acceso a la Abogacía", "institution": "UCM", "year": "2013" }
  ],
  "stats": [
    { "label": "Años de ejercicio", "value": "10+" }
  ]
}
```

---

## 3. Áreas de práctica

| Método | Ruta | Acceso |
|---|---|---|
| `GET`    | `/practice-areas`        | público — lista completa, ordenada por `order` asc |
| `GET`    | `/practice-areas/:slug`  | público — **por `slug`**, no por id |
| `POST`   | `/practice-areas`        | privado — crea; el backend genera `id` y `slug` |
| `PUT`    | `/practice-areas/:id`    | privado — actualiza (**por `id`**) |
| `DELETE` | `/practice-areas/:id`    | privado |

```jsonc
{
  "id": "area_1",
  "slug": "derecho-laboral",     // generado a partir de "name"; único
  "name": "Derecho laboral",
  "summary": "Frase corta para tarjetas.",
  "description": "Texto largo.",
  "faqs": [ { "q": "¿Pregunta?", "a": "Respuesta." } ],
  "order": 1
}
```

---

## 4. Casos

| Método | Ruta | Acceso |
|---|---|---|
| `GET`    | `/cases`        | público — admite filtros (abajo) |
| `GET`    | `/cases/:slug`  | público — **por `slug`** |
| `POST`   | `/cases`        | privado |
| `PUT`    | `/cases/:id`    | privado |
| `DELETE` | `/cases/:id`    | privado |

**Query params de `GET /cases`** (todos opcionales, combinables):

| Param | Ejemplo | Efecto |
|---|---|---|
| `q`          | `q=despido`      | texto libre sobre título, área, rol, resultado y narrativa |
| `area`       | `area=Derecho laboral` | coincidencia exacta con `area` |
| `year`       | `year=2024`      | coincidencia exacta |
| `resultType` | `resultType=sentencia` | uno de los valores del enum |

> El frontend **también** filtra en cliente para respuesta instantánea; implementar los filtros en servidor es recomendable pero no bloqueante para el MVP.

```jsonc
{
  "id": "case_1",
  "slug": "despido-nulo-readmision",     // generado a partir de "title"; único
  "title": "Despido declarado nulo con readmisión",
  "area": "Derecho laboral",             // string; debe casar con PracticeArea.name
  "year": 2024,
  "role": "Dirección letrada (parte trabajadora)",
  "resultType": "sentencia",             // "sentencia" | "acuerdo" | "archivo" | "dictamen" | "otro"
  "outcome": "Readmisión + 14.200 € de salarios de tramitación",
  "situation": "...",
  "action": "...",
  "result": "...",
  "skills": ["Litigio laboral", "Derechos fundamentales"],
  "featured": true,                      // aparece en la portada
  "confidential": true,                  // muestra aviso de anonimización
  "imageUrl": ""                         // "" si no hay
}
```

---

## 5. Trayectoria (experiencia)

| Método | Ruta | Acceso |
|---|---|---|
| `GET`    | `/experience`     | público — orden descendente por `startDate` |
| `POST`   | `/experience`     | privado |
| `PUT`    | `/experience/:id` | privado |
| `DELETE` | `/experience/:id` | privado |

```jsonc
{
  "id": "exp_1",
  "org": "Despacho propio — Ortega Abogacía",
  "role": "Abogada titular",
  "startDate": "2018-01",      // YYYY-MM
  "endDate": null,             // null o "" si es el puesto actual
  "current": true,
  "location": "Madrid",
  "description": "..."
}
```

---

## 6. Publicaciones

| Método | Ruta | Acceso |
|---|---|---|
| `GET`    | `/publications`     | público — orden descendente por `date` |
| `POST`   | `/publications`     | privado |
| `PUT`    | `/publications/:id` | privado |
| `DELETE` | `/publications/:id` | privado |

```jsonc
{
  "id": "pub_1",
  "title": "El nuevo reglamento de extranjería",
  "kind": "articulo",          // "articulo" | "ponencia" | "libro" | "podcast"
  "venue": "Legaltoday",
  "date": "2025-03-11",        // YYYY-MM-DD
  "url": "https://...",        // "" si no hay
  "summary": "..."
}
```

---

## 7. Testimonios

| Método | Ruta | Acceso |
|---|---|---|
| `GET`    | `/testimonials`     | público |
| `POST`   | `/testimonials`     | privado |
| `PUT`    | `/testimonials/:id` | privado |
| `DELETE` | `/testimonials/:id` | privado |

```jsonc
{
  "id": "test_1",
  "quote": "Me explicó las opciones con total claridad...",
  "author": "Cliente — reclamación por despido",
  "authorRole": "Sector comercio",
  "context": "2024"
}
```

---

## 8. Contacto y mensajes

### `POST /contact`  — público

```jsonc
// Request
{ "name": "Laura Méndez", "email": "laura@ej.com", "phone": "", "message": "Buenos días..." }
// 200
{ "ok": true }
```

El backend guarda el mensaje con `id`, `createdAt` (ISO) y `read: false`.
Recomendado: enviar además un email de aviso al titular y aplicar rate-limiting / captcha.

### `GET /messages`  — privado

Lista descendente por `createdAt`.

```jsonc
[
  {
    "id": "msg_1",
    "name": "Laura Méndez",
    "email": "laura@ej.com",
    "phone": "+34 611 111 111",
    "message": "...",
    "createdAt": "2026-09-07T09:12:00.000Z",
    "read": false
  }
]
```

### `PATCH /messages/:id`  — privado

Actualización parcial. El frontend solo envía `{ "read": true }` o `{ "read": false }`.

### `DELETE /messages/:id`  — privado

---

## 9. Subida de imágenes

### `POST /uploads`  — privado — `multipart/form-data`

- Campo del archivo: **`file`**.
- Respuesta:

```jsonc
{ "url": "https://cdn.tu-dominio.com/uploads/abc123.jpg" }
```

El frontend guarda esa `url` en `avatarUrl` / `imageUrl`. Valida tipo (`image/*`) y tamaño.

---

## Resumen de rutas

```
POST   /auth/login          público
GET    /auth/me             privado

GET    /profile            público
PUT    /profile            privado

GET    /practice-areas               público
GET    /practice-areas/:slug         público
POST   /practice-areas               privado
PUT    /practice-areas/:id           privado
DELETE /practice-areas/:id           privado

GET    /cases            público   (?q= &area= &year= &resultType=)
GET    /cases/:slug      público
POST   /cases            privado
PUT    /cases/:id        privado
DELETE /cases/:id        privado

GET/POST/PUT/DELETE  /experience[/:id]     (GET público, resto privado)
GET/POST/PUT/DELETE  /publications[/:id]   (GET público, resto privado)
GET/POST/PUT/DELETE  /testimonials[/:id]   (GET público, resto privado)

POST   /contact           público
GET    /messages          privado
PATCH  /messages/:id      privado
DELETE /messages/:id      privado

POST   /uploads           privado (multipart, campo "file")
```

## Notas de implementación

- El frontend nunca envía `id` ni `slug` en un `POST`; los genera el backend.
- En `PUT` el frontend puede reenviar el objeto completo; ignora `id`/`slug` del body y usa el de la URL.
- `GET` de colecciones devuelve **arrays planos** (sin envoltorio `{ data: [...] }` ni paginación en el MVP).
- Si más adelante añades paginación, avísalo: hay que tocar los hooks de `src/lib/queries.ts`.
