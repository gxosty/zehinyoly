import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from '../i18n'
import { localizedText } from '../utils/localize'
import api, { LOGO_URL, imgUrl } from '../api/axios'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const { t, locale } = useLocale()

  useEffect(() => {
    setLoading(true)
    api.get(`/api/blogs?page=${page}&limit=9`)
      .then((res) => {
        setPosts(res.data.items)
        setTotalPages(res.data.total_pages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('blog.title')}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">{t('blog.none')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {p.image_url ? (
                  <img src={imgUrl(p.image_url)} alt={localizedText(p.title, locale)} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img src={LOGO_URL} alt={t('app.name')} className="w-12 h-12 rounded-full opacity-50" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <Calendar size={12} />
                    <span>{new Date(p.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {localizedText(p.title, locale)}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{localizedText(p.content, locale)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} /> {t('blog.previous')}
            </button>
            <span className="text-sm text-gray-500">
              {t('blog.page', { page, total: totalPages })}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              {t('blog.next')} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
