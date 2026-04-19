import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Styles', to: '/styles' },
  { label: 'Packages', to: '/packages' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Book', to: '/book' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const getNavClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isActive ? 'bg-primary text-white shadow-sm' : 'text-muted hover:bg-white hover:text-primary hover:shadow-sm'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-3.5 text-lg font-semibold tracking-tight text-primary">
          <span className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-slate-700 to-accent text-base font-extrabold text-white shadow-lg">
            <span className="absolute inset-x-2 top-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="absolute -right-5 bottom-0 h-10 w-10 rounded-full bg-white/10 blur-xl" />
            MI
          </span>
          <span className="leading-tight">
            <span className="block text-[0.72rem] uppercase tracking-[0.24em] text-accent">Premium Interiors</span>
            <span className="block text-lg font-semibold text-primary sm:text-xl">Manish Interior</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={getNavClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-primary transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>

      {isOpen ? (
        <nav id="mobile-menu" className="animate-fade-up border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={getNavClass} onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

export default Navbar
