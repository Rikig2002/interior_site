import axios from 'axios'
import { clearAdminSession } from '../utils/adminAuth'
import { getAdminToken } from '../utils/adminAuth'

const defaultApiBaseUrl =
  typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getAdminToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      clearAdminSession()
      window.location.href = '/admin/login'
    }

    return Promise.reject(error)
  },
)

export default api
