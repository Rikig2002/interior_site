import { useCallback, useEffect, useState } from 'react'
import { api, withAuth } from '../../lib/api'

const modules = ['projects', 'testimonials', 'blogs']

export function useCms(token) {
  const [data, setData] = useState({
    projects: [],
    testimonials: [],
    blogs: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [projects, testimonials, blogs] = await Promise.all(
        modules.map((moduleName) => api.request(`/${moduleName}`)),
      )
      setData({ projects, testimonials, blogs })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to fetch CMS data'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch on mount for public CMS content.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const createItem = async (moduleName, payload) => {
    const created = await api.request(`/${moduleName}`, {
      method: 'POST',
      headers: withAuth(token),
      body: JSON.stringify(payload),
    })
    setData((prev) => ({ ...prev, [moduleName]: [created, ...prev[moduleName]] }))
  }

  const deleteItem = async (moduleName, id) => {
    await api.request(`/${moduleName}/${id}`, {
      method: 'DELETE',
      headers: withAuth(token),
    })
    setData((prev) => ({ ...prev, [moduleName]: prev[moduleName].filter((item) => item.id !== id) }))
  }

  const addProjectImage = async (projectId, payload) => {
    const created = await api.request(`/projects/${projectId}/gallery`, {
      method: 'POST',
      headers: withAuth(token),
      body: JSON.stringify(payload),
    })

    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === projectId
          ? { ...project, gallery: [created, ...(Array.isArray(project.gallery) ? project.gallery : [])] }
          : project,
      ),
    }))
  }

  const removeProjectImage = async (projectId, imageId) => {
    await api.request(`/projects/${projectId}/gallery/${imageId}`, {
      method: 'DELETE',
      headers: withAuth(token),
    })

    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              gallery: (Array.isArray(project.gallery) ? project.gallery : []).filter(
                (item) => item.id !== imageId,
              ),
            }
          : project,
      ),
    }))
  }

  return {
    ...data,
    loading,
    error,
    refresh,
    createItem,
    deleteItem,
    addProjectImage,
    removeProjectImage,
  }
}
