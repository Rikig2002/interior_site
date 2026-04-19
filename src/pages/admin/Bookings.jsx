import { useEffect, useMemo, useState } from 'react'
import Card from '../../components/ui/Card'
import api from '../../services/api'

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled']

function Bookings() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: '10' })
    if (statusFilter) {
      params.set('status', statusFilter)
    }
    return params.toString()
  }, [page, statusFilter])

  useEffect(() => {
    let mounted = true

    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await api.get(`/bookings?${queryString}`)
        const payload = response?.data

        if (mounted) {
          setRows(Array.isArray(payload?.data) ? payload.data : [])
          setPage(payload?.page || 1)
          setPages(payload?.pages || 1)
        }
      } catch (err) {
        if (mounted) {
          setError(err?.response?.data?.message || 'Unable to load bookings.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchBookings()
    return () => {
      mounted = false
    }
  }, [queryString])

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status })
      setRows((prev) => prev.map((booking) => (booking._id === bookingId ? { ...booking, status } : booking)))
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update booking status.')
    }
  }

  return (
    <Card className="border border-slate-200">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-primary">Booking Management</h2>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="booking-status-filter" className="text-muted">
            Filter Status
          </label>
          <select
            id="booking-status-filter"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value)
              setPage(1)
            }}
            className="rounded-lg border border-slate-300 px-2 py-1 shadow-sm"
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="overflow-x-auto">
        <table className="crm-table text-left text-sm">
          <thead>
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">City</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  Loading bookings...
                </td>
              </tr>
            ) : rows.length ? (
              rows.map((booking) => (
                <tr key={booking._id} className="border-b border-slate-100">
                  <td className="py-2 pr-4 text-primary">{booking.name}</td>
                  <td className="py-2 pr-4 text-muted">{new Date(booking.preferredDate).toLocaleDateString()}</td>
                  <td className="py-2 pr-4 text-muted">{booking.preferredTime}</td>
                  <td className="py-2 pr-4 text-muted">{booking.city}</td>
                  <td className="py-2 pr-4">
                    <select
                      value={booking.status}
                      onChange={(event) => handleStatusUpdate(booking._id, event.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1 text-sm capitalize"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  No bookings found for the selected filters.
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
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
          disabled={page >= pages}
        >
          Next
        </button>
      </div>
    </Card>
  )
}

export default Bookings
