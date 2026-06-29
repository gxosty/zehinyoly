import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import { useLocale } from '../i18n'
import { localizedText } from '../utils/localize'
import api, { imgUrl } from '../api/axios'

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t, locale } = useLocale()

  useEffect(() => {
    api.get(`/api/blogs/${id}`)
      .then((res) => { setPost(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">{t('blog_post.not_found')}</p>
        <Link to="/blog" className="text-amber-600 hover:underline text-sm">{t('blog_post.back')}</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 mb-6 transition-colors">
          <ArrowLeft size={16} /> {t('blog_post.back')}
        </Link>
        {post.image_url && (
          <img src={imgUrl(post.image_url)} alt={localizedText(post.title, locale)} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8" />
        )}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Calendar size={14} />
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{localizedText(post.title, locale)}</h1>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{localizedText(post.content, locale)}</div>
        {post.links?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Links</h3>
            <ul className="space-y-2">
              {post.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline text-sm">
                    {link.label || link.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  )
}
