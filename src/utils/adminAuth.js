const ADMIN_TOKEN_KEY = 'admin_token'
const ADMIN_USER_KEY = 'admin_user'

export const getAdminToken = () => {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export const setAdminSession = ({ token, user }) => {
  if (!token) {
    return
  }

  localStorage.setItem(ADMIN_TOKEN_KEY, token)
  if (user) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user))
  }
}

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
}

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const isAdminAuthenticated = () => Boolean(getAdminToken())
