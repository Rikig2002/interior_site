import { useCallback, useState } from 'react'
import { api, withAuth } from '../../lib/api'

export function useClientProjects(token) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refreshProjects = useCallback(async () => {
    if (!token) {
      setProjects([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const payload = await api.request('/client/projects', {
        headers: withAuth(token),
      })
      setProjects(payload)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load projects'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [token])

  return {
    projects,
    loading,
    error,
    refreshProjects,
  }
}
