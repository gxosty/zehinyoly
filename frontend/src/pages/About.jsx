import { Music2, MapPin, Mail, Phone } from 'lucide-react'
import { useLocale } from '../i18n'

export default function About() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('about.title')}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('about.who_heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('about.who_p1')}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {t('about.who_p2')}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('about.contact_heading')}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={20} className="text-amber-600 shrink-0" />
              <span>{t('about.location')}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-amber-600 shrink-0" />
              <a href="mailto:info@zehinyoly.edu" className="hover:text-amber-600 transition-colors">info@zehinyoly.edu</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={20} className="text-amber-600 shrink-0" />
              <span>{t('about.contact_social')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('about.follow_heading')}</h2>
          <p className="text-gray-600 mb-6">
            {t('about.follow_sub')}
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/zehinyoly/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@zehinyoly.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-all hover:scale-[1.02]"
            >
              <Music2 size={18} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
