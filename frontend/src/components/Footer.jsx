import { Link } from 'react-router-dom'
import { Music2, Phone } from 'lucide-react'
import { useLocale } from '../i18n'
import { LOGO_URL } from '../api/axios'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={LOGO_URL} alt={t('app.name')} className="w-8 h-8 rounded-full object-cover" />
            <h3 className="text-white font-semibold text-lg">{t('app.name')}</h3>
          </div>
          <p className="text-sm leading-relaxed">{t('footer.desc')}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t('footer.quick_links')}</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-amber-400 transition-colors">{t('nav.home')}</Link>
            <Link to="/courses" className="hover:text-amber-400 transition-colors">{t('nav.courses')}</Link>
            <Link to="/blog" className="hover:text-amber-400 transition-colors">{t('nav.blog')}</Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors">{t('nav.about')}</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">{t('footer.contact')}</h4>
          <div className="flex flex-col gap-2 text-sm mb-4">
            <a href="tel:+99312279044" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone size={14} /> +993 12 27 90 44
            </a>
            <a href="tel:+99371510199" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone size={14} /> +993 71 51 01 99
            </a>
          </div>
          <h4 className="text-white font-semibold mb-3">{t('about.follow_heading')}</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/zehinyoly/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@zehinyoly.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              <Music2 size={22} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} {t('app.name')}. All rights reserved.
      </div>
    </footer>
  )
}
