import { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import api from '../../services/api'

const metricItems = [
  { key: 'totalLeads', label: 'Total Leads' },
  { key: 'totalBookings', label: 'Total Bookings' },
  { key: 'totalProjects', label: 'Total Projects' },
  { key: 'totalUsers', label: 'Total Users' },
]

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchDashboard = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await api.get('/admin/dashboard')
        if (mounted) {
          setData(response?.data?.data || null)
        }
      } catch (err) {
        if (mounted) {
          setError(err?.response?.data?.message || 'Unable to load dashboard data.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchDashboard()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="h-28 border border-slate-200">
            <div className="shimmer h-full w-full rounded-xl" />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
  }

  const totals = data?.totals || {}

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricItems.map((item) => (
          <Card key={item.key} className="border border-slate-200">
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-primary">{totals[item.key] || 0}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-lg font-semibold text-primary">Leads by Status</h2>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(data?.leadsByStatus || {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="capitalize text-muted">{status}</span>
                <span className="font-medium text-primary">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-lg font-semibold text-primary">Bookings by Status</h2>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(data?.bookingsByStatus || {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="capitalize text-muted">{status}</span>
                <span className="font-medium text-primary">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="text-lg font-semibold text-primary">Recent Leads</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="crm-table text-left text-sm">
              <thead>
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {(data?.recentLeads || []).map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-primary">{lead.name}</td>
                    <td className="py-2 pr-4 text-muted">{lead.city}</td>
                    <td className="py-2 pr-4 capitalize text-muted">{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-lg font-semibold text-primary">Recent Bookings</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="crm-table text-left text-sm">
              <thead>
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {(data?.recentBookings || []).map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-primary">{booking.name}</td>
                    <td className="py-2 pr-4 text-muted">
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 pr-4 capitalize text-muted">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard
