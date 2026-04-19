import { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import api from '../../services/api'

const statusOptions = ['new', 'contacted', 'qualified', 'converted', 'closed']

function Leads() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [selectedLead, setSelectedLead] = useState(null)

  const fetchLeads = async (currentPage) => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get(`/leads?page=${currentPage}&limit=10`)
      const payload = response?.data
      setRows(Array.isArray(payload?.data) ? payload.data : [])
      setPage(payload?.page || 1)
      setPages(payload?.pages || 1)
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load leads.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads(1)
  }, [])

  const handleStatusUpdate = async (leadId, status) => {
    try {
      await api.patch(`/leads/${leadId}`, { status })
      setRows((prev) => prev.map((lead) => (lead._id === leadId ? { ...lead, status } : lead)))
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update lead status.')
    }
  }

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > pages || nextPage === page) {
      return
    }
    fetchLeads(nextPage)
  }

  return (
    <Card className="border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Lead Management</h2>
        <p className="text-sm text-muted">
          Page {page} of {pages}
        </p>
      </div>

      {error ? <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="overflow-x-auto">
        <table className="crm-table text-left text-sm">
          <thead>
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">City</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  Loading leads...
                </td>
              </tr>
            ) : rows.length ? (
              rows.map((lead) => (
                <tr key={lead._id} className="border-b border-slate-100">
                  <td className="py-2 pr-4 text-primary">{lead.name}</td>
                  <td className="py-2 pr-4 text-muted">{lead.phone}</td>
                  <td className="py-2 pr-4 text-muted">{lead.city}</td>
                  <td className="py-2 pr-4 capitalize text-muted">{lead.status}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(event) => handleStatusUpdate(lead._id, event.target.value)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        onClick={() => setSelectedLead(lead)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  No leads found. New website leads will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= pages}
        >
          Next
        </button>
      </div>

      {selectedLead ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-primary">Lead Details</h3>
            <button
              type="button"
              className="rounded-md border border-slate-300 px-2 py-1 text-xs"
              onClick={() => setSelectedLead(null)}
            >
              Close
            </button>
          </div>
          <p className="text-muted">
            <span className="font-medium text-primary">Name:</span> {selectedLead.name}
          </p>
          <p className="text-muted">
            <span className="font-medium text-primary">Phone:</span> {selectedLead.phone}
          </p>
          <p className="text-muted">
            <span className="font-medium text-primary">Email:</span> {selectedLead.email || 'N/A'}
          </p>
          <p className="text-muted">
            <span className="font-medium text-primary">City:</span> {selectedLead.city}
          </p>
          <p className="text-muted">
            <span className="font-medium text-primary">Requirement:</span> {selectedLead.requirement || 'N/A'}
          </p>
        </div>
      ) : null}
    </Card>
  )
}

export default Leads
