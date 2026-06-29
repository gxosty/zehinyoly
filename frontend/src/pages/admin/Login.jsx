import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useLocale } from '../../i18n'
import api, { LOGO_URL } from '../../api/axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { t } = useLocale()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/api/auth/login', { username, password })
      localStorage.setItem('token', res.data.access_token)
      navigate('/admin/courses')
    } catch {
      setError(t('admin.invalid_creds'))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={LOGO_URL} alt={t('app.name')} className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-semibold text-gray-900">{t('admin.login_title')}</span>
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          <LogIn size={18} /> {t('admin.sign_in')}
        </button>
      </form>
    </div>
  )
}
