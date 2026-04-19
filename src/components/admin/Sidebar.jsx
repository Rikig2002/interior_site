import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', short: 'DB' },
  { to: '/admin/leads', label: 'Leads', short: 'LD' },
  { to: '/admin/bookings', label: 'Bookings', short: 'BK' },
  { to: '/admin/projects', label: 'Projects', short: 'PR' },
]

function Sidebar({ isOpen, onClose }) {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive ? 'bg-blue-50 text-accent shadow-sm' : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
        <div className="mb-6 px-2">
          <p className="text-xs uppercase tracking-wide text-muted">Admin</p>
          <h2 className="text-lg font-semibold text-primary">Interior CRM</h2>
        </div>
        <nav className="space-y-1">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs">
                {item.short}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="w-full bg-black/30"
            onClick={onClose}
            aria-label="Close sidebar overlay"
          />
          <aside className="h-full w-72 border-r border-slate-200 bg-white p-4">
            <div className="mb-6 flex items-center justify-between px-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Admin</p>
                <h2 className="text-lg font-semibold text-primary">Interior CRM</h2>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <nav className="space-y-1">
              {links.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs">
                    {item.short}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  )
}

export default Sidebar
