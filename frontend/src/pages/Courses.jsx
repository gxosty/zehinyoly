import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { useLocale } from '../i18n'
import { localizedText } from '../utils/localize'
import api from '../api/axios'
import { getIcon, iconColors } from '../components/courseIcons'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const { t, locale } = useLocale()

  useEffect(() => {
    api.get('/api/courses').then((res) => {
      setCourses(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('courses.title')}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">{t('courses.none')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => {
              const Icon = getIcon(c.icon_name)
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                  <div className={`${iconColors[i % iconColors.length]} w-full h-48 flex items-center justify-center`}>
                    <Icon size={64} className="text-white" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{localizedText(c.title, locale)}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <Users size={14} />
                      <span>{localizedText(c.target_audience, locale)}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{localizedText(c.description, locale)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
