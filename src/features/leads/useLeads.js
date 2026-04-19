import { useCallback, useMemo, useState } from 'react'
import { api, withAuth } from '../../lib/api'

export function useLeads(token) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refreshLeads = useCallback(async () => {
    if (!token) {
      setLeads([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await api.request('/leads', { headers: withAuth(token) })
      setLeads(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load leads'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [token])

  const stats = useMemo(() => {
    const byStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {})

    return {
      total: leads.length,
      newLeads: byStatus.New || 0,
      proposalSent: byStatus['Proposal Sent'] || 0,
      closed: byStatus.Closed || 0,
    }
  }, [leads])

  const addLead = async (payload) => {
    const created = await api.request('/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return created
  }

  const updateLeadStatus = async (id, status) => {
    const updated = await api.request(`/leads/${id}/status`, {
      method: 'PATCH',
      headers: withAuth(token),
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((lead) => (lead.id === id ? updated : lead)))
  }

  return {
    leads,
    stats,
    loading,
    error,
    addLead,
    refreshLeads,
    updateLeadStatus,
  }
}
