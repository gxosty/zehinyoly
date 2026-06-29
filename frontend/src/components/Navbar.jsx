import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { useLocale } from '../i18n'
import { LOGO_URL } from '../api/axios'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/courses', key: 'nav.courses' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/about', key: 'nav.about' },
]

const locales = ['en', 'ru', 'tk']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { t, locale, setLocale } = useLocale()

  const isLanding = pathname === '/'
  const opaque = !isLanding || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const selectLang = (l) => {
    setLocale(l)
    setLangOpen(false)
  }

  const sectionDivider = (
    <div className={`hidden md:block h-6 w-px transition-colors duration-300 ${opaque ? 'bg-gray-200' : 'bg-white/20'}`} />
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 pointer-events-none">
      <div className={`pointer-events-auto max-w-3xl w-full flex items-center justify-between px-1 py-1 rounded-full transition-all duration-300 ${
        opaque
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}>
        {/* Logo section */}
        <div className="flex items-center gap-2 px-4 py-1">
          <img src={LOGO_URL} alt={t('app.name')} className="w-7 h-7 rounded-full object-cover shrink-0" />
          <span className={`text-sm font-semibold transition-colors duration-300 hidden sm:block ${opaque ? 'text-gray-900' : 'text-white'}`}>
            {t('app.name')}
          </span>
        </div>

        {sectionDivider}

        {/* Nav links section */}
        <div className="hidden md:flex items-center gap-1 px-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'bg-amber-600 text-white'
                  : opaque
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10'
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        {sectionDivider}

        {/* Language section */}
        <div className="hidden md:flex items-center px-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                opaque
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Globe size={16} />
              <span className="uppercase">{locale}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => selectLang(l)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      locale === l ? 'font-semibold text-amber-600' : 'text-gray-700'
                    }`}
                  >
                    {t(`locale.${l}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile right section */}
        <div className="flex items-center gap-1 md:hidden">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`p-2 transition-colors ${opaque ? 'text-gray-600' : 'text-white/90'}`}
            >
              <Globe size={20} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => selectLang(l)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      locale === l ? 'font-semibold text-amber-600' : 'text-gray-700'
                    }`}
                  >
                    {t(`locale.${l}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className={`p-2 transition-colors ${opaque ? 'text-gray-600' : 'text-white/90'}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`pointer-events-auto absolute top-full mt-2 left-4 right-4 md:hidden rounded-2xl border p-4 flex flex-col gap-2 shadow-lg ${
          opaque ? 'bg-white border-gray-200' : 'bg-white/95 backdrop-blur-md border-white/20'
        }`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                pathname === l.to ? 'bg-amber-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
