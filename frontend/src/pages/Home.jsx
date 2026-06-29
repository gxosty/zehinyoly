import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useLocale } from '../i18n'
import { localizedText } from '../utils/localize'
import api, { imgUrl } from '../api/axios'
import { getIcon, iconColors } from '../components/courseIcons'

const BG_IMAGE = imgUrl('/static/landing.jpg')

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const { t, locale } = useLocale()

  useEffect(() => {
    api.get('/api/courses').then((res) => {
      setCourses(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="relative w-full overflow-hidden h-screen" style={{ height: '100dvh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/40 z-20" />
        <div className="absolute top-[22%] sm:top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 z-50 pointer-events-none">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-6xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              {t('hero.welcome')}
            </span>
            <span
              className="block font-normal text-6xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              {t('hero.title')}
            </span>
          </h1>
        </div>
        <div className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
          <p className="text-sm text-white/80 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {t('hero.cta')}
          </p>
          <Link
            to="/courses"
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-amber-600/30 inline-flex items-center gap-2"
          >
            {t('hero.view_courses')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('home.programs')}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('home.programs_sub')}
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-600 border-t-transparent" />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">{t('home.no_courses')}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {courses.map((c, i) => {
              const Icon = getIcon(c.icon_name)
              return (
                <div
                  key={c.id}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className={`${iconColors[i % iconColors.length]} p-3 rounded-xl text-white`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-800 text-center">{localizedText(c.title, locale)}</span>
                </div>
              )
            })}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-7 py-3 rounded-full transition-all"
          >
            {t('home.view_all')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="bg-amber-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t('home.cta_title')}</h2>
        <p className="text-amber-100 max-w-lg mx-auto mb-8">
          {t('home.cta_sub')}
        </p>
        <Link
          to="/about"
          className="inline-block bg-white text-amber-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all"
        >
          {t('home.cta_button')}
        </Link>
      </section>
    </div>
  )
}
