import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import AdminLayout from './layouts/AdminLayout'
import MainLayout from './layouts/MainLayout'

const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Calculator = lazy(() => import('./pages/Calculator'))
const DesignStyles = lazy(() => import('./pages/DesignStyles'))
const Packages = lazy(() => import('./pages/Packages'))
const Book = lazy(() => import('./pages/Book'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Leads = lazy(() => import('./pages/admin/Leads'))
const Bookings = lazy(() => import('./pages/admin/Bookings'))
const Projects = lazy(() => import('./pages/admin/Projects'))

function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="shimmer h-5 w-32 rounded" />
        <div className="mt-5 space-y-3">
          <div className="shimmer h-4 w-full rounded" />
          <div className="shimmer h-4 w-4/5 rounded" />
          <div className="shimmer h-4 w-3/5 rounded" />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/styles" element={<DesignStyles />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
