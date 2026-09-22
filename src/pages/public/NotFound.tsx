import { Link } from 'react-router-dom'
import { useT } from '@/lib/i18n'

export default function NotFound() {
  const t = useT()
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-6xl font-semibold">404</p>
        <p className="mt-3 text-ink-soft">{t('notFound.body')}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-soft"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  )
}
