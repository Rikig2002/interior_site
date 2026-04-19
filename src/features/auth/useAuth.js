import { useEffect, useState } from 'react'
import { api, withAuth } from '../../lib/api'

const TOKEN_KEY = 'manish-interiors-token'
const USER_KEY = 'manish-interiors-user'

function parseJson(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState(() => parseJson(window.localStorage.getItem(USER_KEY)))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }

    api
      .request('/auth/me', { headers: withAuth(token) })
      .then((payload) => {
        setUser(payload.user)
        window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
      })
      .catch(() => {
        setToken('')
        setUser(null)
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
      })
  }, [token])

  const login = async ({ email, password }) => {
    setLoading(true)
    setError('')
    try {
      const payload = await api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setToken(payload.token)
      setUser(payload.user)
      window.localStorage.setItem(TOKEN_KEY, payload.token)
      window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
      return payload.user
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    loading,
    error,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
  }
}
