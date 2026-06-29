import { NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, FileText, LogOut } from 'lucide-react'
import { useLocale } from '../i18n'
import { LOGO_URL } from '../api/axios'

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const { t } = useLocale()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-800'
    }`

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8 mt-2">
          <img src={LOGO_URL} alt={t('app.name')} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold">{t('admin.panel')}</span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/admin/courses" className={linkClass}>
            <BookOpen size={18} /> {t('admin.manage_courses')}
          </NavLink>
          <NavLink to="/admin/blogs" className={linkClass}>
            <FileText size={18} /> {t('admin.manage_blogs')}
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors mt-auto"
        >
          <LogOut size={18} /> {t('admin.logout')}
        </button>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
    </div>
  )
}
