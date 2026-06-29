import axios from 'axios'

const BASE = 'http://localhost:8000'
export const LOGO_URL = `${BASE}/static/icon.jpg`

export function imgUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

const api = axios.create({
  baseURL: BASE,
})

api.interceptors.request.use((config) => {
  if (config.url.startsWith('/api/admin')) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

export default api
