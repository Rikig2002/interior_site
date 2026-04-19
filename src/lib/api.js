const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.message || `Request failed with ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function withAuth(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const api = {
  request,
}
