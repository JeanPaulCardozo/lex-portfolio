import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-6xl font-semibold">404</p>
        <p className="mt-3 text-ink-soft">La página que buscas no existe o se ha movido.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-soft"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
