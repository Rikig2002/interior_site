import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="contact" className="relative mt-12 overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-2 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section>
          <div className="inline-flex items-center gap-3">
            <span className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-accent text-base font-extrabold text-white shadow-lg">
              <span className="absolute inset-x-2 top-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="absolute -right-5 bottom-0 h-10 w-10 rounded-full bg-white/10 blur-xl" />
              MI
            </span>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-sky-300">Premium Interiors</p>
              <h3 className="text-xl font-semibold text-white">Manish Interior</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300">Designing homes that balance beauty, utility, and comfort.</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            <li>
              <Link className="transition-colors hover:text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/styles">
                Design Styles
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/packages">
                Packages
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/book">
                Book Consultation
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100">Contact</h3>
          <p className="mt-2 text-sm text-slate-300">Phone: +91-00000-00000</p>
          <p className="mt-1 text-sm text-slate-300">Email: hello@manishinterior.in</p>
          <p className="mt-1 text-sm text-slate-300">Mon - Sat, 10:00 AM - 7:00 PM</p>
        </section>
      </div>
    </footer>
  )
}

export default Footer
