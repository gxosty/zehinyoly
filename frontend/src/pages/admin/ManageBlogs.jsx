import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useLocale } from '../../i18n'
import api from '../../api/axios'
import ImageUpload from '../../components/ImageUpload'

const locales = ['en', 'ru', 'tk']

const emptyLang = () => ({ en: '', ru: '', tk: '' })

const emptyForm = { title: emptyLang(), content: emptyLang(), image_url: '' }

export default function ManageBlogs() {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [tabs, setTabs] = useState({ title: 'en', content: 'en' })
  const [err, setErr] = useState('')
  const { t } = useLocale()

  const fetchPosts = () => api.get('/api/blogs?limit=50').then((r) => setPosts(r.data.items))

  useEffect(() => { fetchPosts() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!form.title.en?.trim() || !form.content.en?.trim()) {
      setErr('English values are required for Title and Content.')
      return
    }
    try {
      if (editingId) {
        await api.put(`/api/admin/blogs/${editingId}`, form)
      } else {
        await api.post('/api/admin/blogs', form)
      }
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchPosts()
    } catch {
      setErr('Failed to save blog post.')
    }
  }

  const handleEdit = (p) => {
    setForm({
      title: p.title || emptyLang(),
      content: p.content || emptyLang(),
      image_url: p.image_url || '',
      links: p.links || [],
    })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await api.delete(`/api/admin/blogs/${id}`)
    fetchPosts()
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const setField = (field, locale, value) => {
    setForm({ ...form, [field]: { ...form[field], [locale]: value } })
  }

  const addLink = () => {
    setForm({ ...form, links: [...form.links, { url: '', label: '' }] })
  }

  const removeLink = (i) => {
    setForm({ ...form, links: form.links.filter((_, idx) => idx !== i) })
  }

  const setLink = (i, key, value) => {
    const updated = form.links.map((link, idx) =>
      idx === i ? { ...link, [key]: value } : link
    )
    setForm({ ...form, links: updated })
  }

  const tabBar = (field) => (
    <div className="flex gap-1 mb-2">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setTabs({ ...tabs, [field]: l })}
          className={`px-3 py-1 text-xs font-medium rounded-t transition-colors ${
            tabs[field] === l ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {t(`locale.${l}`)}
        </button>
      ))}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
        <button onClick={openCreate} className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editingId ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {err && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                {tabBar('title')}
                <input
                  placeholder={t(`locale.${tabs['title']}`)}
                  value={form.title[tabs['title']] || ''}
                  onChange={(e) => setField('title', tabs['title'], e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                {tabBar('content')}
                <textarea
                  placeholder={t(`locale.${tabs['content']}`)}
                  value={form.content[tabs['content']] || ''}
                  onChange={(e) => setField('content', tabs['content'], e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[250px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <ImageUpload value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Links</label>
                <div className="flex flex-col gap-2">
                  {form.links.map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => setLink(i, 'url', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Label (optional)"
                        value={link.label}
                        onChange={(e) => setLink(i, 'label', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button type="button" onClick={() => removeLink(i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addLink} className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium">
                    <Plus size={16} /> Add Link
                  </button>
                </div>
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors">
                {editingId ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No blog posts yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium max-w-[300px] truncate">{p.title?.en || p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
