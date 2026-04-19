import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import api from '../../services/api'
import { isAdminAuthenticated, setAdminSession } from '../../utils/adminAuth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectPath = location.state?.from || '/admin/dashboard'

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)
      const response = await api.post('/auth/login', {
        email: form.email.trim(),
        password: form.password,
      })

      const token = response?.data?.data?.token
      const user = response?.data?.data?.user

      if (!token) {
        throw new Error('Invalid login response')
      }

      setAdminSession({ token, user })
      navigate(redirectPath, { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid credentials. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="border border-slate-200">
        <div className="mb-5 inline-flex items-center gap-3.5">
          <span className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-slate-700 to-accent text-base font-extrabold text-white shadow-lg">
            <span className="absolute inset-x-2 top-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="absolute -right-4 bottom-0 h-10 w-10 rounded-full bg-white/10 blur-xl" />
            MI
          </span>
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-accent">Manish Interior</p>
            <p className="text-sm text-muted">Admin Console</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage leads, bookings, and projects.</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <Button type="submit" variant="secondary" className="w-full py-3" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Login
