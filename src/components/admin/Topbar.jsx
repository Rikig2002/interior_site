import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { clearAdminSession } from '../../utils/adminAuth'

const titleByPath = {
  '/admin/dashboard': 'Dashboard',
  '/admin/leads': 'Leads',
  '/admin/bookings': 'Bookings',
  '/admin/projects': 'Projects',
}

function Topbar({ onMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()

  const title = useMemo(() => titleByPath[location.pathname] || 'Admin Panel', [location.pathname])

  const handleLogout = () => {
    clearAdminSession()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-100 lg:hidden"
            onClick={onMenuToggle}
          >
            Menu
          </button>
          <h1 className="text-xl font-semibold text-primary">{title}</h1>
        </div>

        <button
          type="button"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Topbar
