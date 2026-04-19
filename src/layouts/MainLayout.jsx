import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-text">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute -left-20 top-32 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl animate-float-soft" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl animate-float-soft" />
        <div className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl animate-float-soft" />
      </div>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div key={location.pathname} className="animate-fade-up">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
