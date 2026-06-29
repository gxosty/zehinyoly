import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useLocale } from '../../i18n'
import api from '../../api/axios'
import IconPicker from '../../components/IconPicker'

const locales = ['en', 'ru', 'tk']

const emptyLang = () => ({ en: '', ru: '', tk: '' })

const emptyForm = { title: emptyLang(), description: emptyLang(), target_audience: { ...emptyLang(), en: 'All Ages' }, icon_name: '' }

export default function ManageCourses() {
  const [courses, setCourses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [tabs, setTabs] = useState({ title: 'en', description: 'en', target_audience: 'en' })
  const [err, setErr] = useState('')
  const { t } = useLocale()

  const fetchCourses = () => api.get('/api/courses').then((r) => setCourses(r.data))

  useEffect(() => { fetchCourses() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!form.title.en?.trim() || !form.description.en?.trim() || !form.target_audience.en?.trim()) {
      setErr('English values are required for Title, Description, and Audience.')
      return
    }
    try {
      if (editingId) {
        await api.put(`/api/admin/courses/${editingId}`, form)
      } else {
        await api.post('/api/admin/courses', form)
      }
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchCourses()
    } catch {
      setErr('Failed to save course.')
    }
  }

  const handleEdit = (c) => {
    setForm({
      title: c.title || emptyLang(),
      description: c.description || emptyLang(),
      target_audience: c.target_audience || { ...emptyLang(), en: 'All Ages' },
      icon_name: c.icon_name || '',
    })
    setEditingId(c.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    await api.delete(`/api/admin/courses/${id}`)
    fetchCourses()
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const setField = (field, locale, value) => {
    setForm({ ...form, [field]: { ...form[field], [locale]: value } })
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
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.courses.title')}</h1>
        <button onClick={openCreate} className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> {t('admin.courses.add')}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editingId ? t('admin.courses.edit') : t('admin.courses.new')}</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {tabBar('description')}
                <textarea
                  placeholder={t(`locale.${tabs['description']}`)}
                  value={form.description[tabs['description']] || ''}
                  onChange={(e) => setField('description', tabs['description'], e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                {tabBar('target_audience')}
                <input
                  placeholder={t(`locale.${tabs['target_audience']}`)}
                  value={form.target_audience[tabs['target_audience']] || ''}
                  onChange={(e) => setField('target_audience', tabs['target_audience'], e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <IconPicker value={form.icon_name} onChange={(v) => setForm({ ...form, icon_name: v })} />
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors">
                {editingId ? t('admin.courses.update') : t('admin.courses.create')}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center py-10">{t('admin.courses.none')}</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 font-medium text-gray-600">Audience</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.title?.en || c.title}</td>
                  <td className="px-4 py-3 text-gray-500">{c.target_audience?.en || c.target_audience}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(c)} className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"><Trash2 size={16} /></button>
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
