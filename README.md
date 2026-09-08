# lex-portfolio

MVP de **portafolio web para abogados y abogadas independientes**.
Frontend en React que se muestra en entrevistas y consume una API REST (que desarrollas tú).

- **Sitio público**: portada, sobre mí, áreas de práctica, casos con búsqueda instantánea, trayectoria, publicaciones y contacto.
- **Panel privado `/admin`** (con login JWT): el titular sube y edita todo el contenido sin tocar código.
- **Modo demostración**: funciona sin API, con datos de ejemplo en el navegador. Ideal para enseñarlo el primer día.
- **Rápido para demos**: búsqueda global con `⌘K` / `Ctrl+K`, filtros de casos que actualizan la URL, caché de datos y carga diferida por ruta.
- **Responsive** y accesible (navegación por teclado, foco visible, contraste).

---

## Puesta en marcha

Requisitos: Node 20+.

```bash
npm install
cp .env.example .env      # opcional; los valores por defecto ya sirven
npm run dev               # http://localhost:5173
```

Scripts:

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` | comprueba tipos (`tsc`) y genera `dist/` |
| `npm run preview` | sirve el build de producción |
| `npm run typecheck` | solo comprobación de tipos |

---

## Modo demostración vs. API real

Se controla con variables de entorno (archivo `.env`):

```ini
# mock -> datos en el navegador (localStorage). No necesita API. (por defecto)
# live -> consume tu API REST
VITE_API_MODE=mock
VITE_API_BASE_URL=http://localhost:8000/api
```

### Credenciales del panel en modo `mock`

```
correo:      admin@demo.com
contraseña:  demo1234
```

(vienen precargadas en la pantalla de login).

En el panel, **Resumen → «Restaurar datos de demo»** deja el portafolio con el contenido
de ejemplo original: útil justo antes de una entrevista.

### Conectar tu backend

1. Implementa la API siguiendo **[`API_CONTRACT.md`](./API_CONTRACT.md)** (rutas, JSON, JWT, errores).
2. `VITE_API_MODE=live` y `VITE_API_BASE_URL=https://tu-api/api` en `.env`.
3. `npm run dev`. No hay que tocar componentes: todo el acceso a datos pasa por
   `src/lib/api/` y los hooks de `src/lib/queries.ts`.

El adaptador HTTP (`src/lib/api/http.ts`) ya implementa el contrato completo:
Bearer token, `multipart` para subidas, manejo de errores `{ message }`.

---

## Estructura

```
src/
  lib/
    api/
      types.ts      # tipos compartidos + interfaz ApiClient (el "contrato" en TS)
      mock.ts       # adaptador de demostración (localStorage + datos semilla)
      http.ts       # adaptador REST real (fetch + JWT)
      client.ts     # elige adaptador según VITE_API_MODE
      seed.ts       # datos de ejemplo (abogada ficticia)
    auth.tsx        # contexto de sesión (login/logout, validación de token)
    queries.ts      # hooks de datos (TanStack Query): lecturas y mutaciones
    format.ts       # fechas, slugs
  components/
    Layout.tsx / AdminLayout.tsx / ProtectedRoute.tsx
    CommandPalette.tsx   # buscador global ⌘K
    CaseCard.tsx
    ui.tsx               # Button, Badge, Section, estados de carga/error…
    form/                # AutoForm, TagsInput, Repeater, ImageField
    admin/               # CollectionAdmin (CRUD genérico) + Drawer
  pages/
    public/   # Home, About, Areas, AreaDetail, Cases, CaseDetail, Experience, Publications, Contact
    admin/    # Login, Dashboard, ProfileEdit, Messages, collections.tsx (config CRUD), screens.tsx
  App.tsx     # router + providers
```

### Cómo se añade un campo nuevo a una entidad

1. Añádelo en `src/lib/api/types.ts`.
2. Añádelo al `seed.ts` (para el modo mock).
3. Añádelo al array `fields` de la config correspondiente en `src/pages/admin/collections.tsx`
   (o en `ProfileEdit.tsx` para el perfil). El formulario del panel se regenera solo.
4. Úsalo donde toque en las páginas públicas.
5. Documenta el campo en `API_CONTRACT.md`.

---

## Despliegue (GitHub Pages)

El repo incluye `.github/workflows/deploy.yml`. Al hacer push a `main`:

1. build con `VITE_BASE=/<nombre-del-repo>/` y `VITE_API_MODE=mock`.
2. copia `index.html` a `404.html` (fallback SPA para rutas profundas).
3. publica en GitHub Pages.

Para activarlo: en el repo → **Settings → Pages → Source: GitHub Actions**.
La URL pública queda como `https://<usuario>.github.io/<nombre-del-repo>/`.

> Para desplegar contra tu API real, cambia `VITE_API_MODE` a `live` y añade
> `VITE_API_BASE_URL` en el workflow (o usa *secrets* del repositorio).

---

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · React Router 6 · TanStack Query 5 ·
React Hook Form + Zod (formulario de contacto).

## Aviso

Los textos, nombres y casos incluidos son **ficticios**, solo para la demostración.
Sustitúyelos por contenido real desde el panel antes de publicar.
