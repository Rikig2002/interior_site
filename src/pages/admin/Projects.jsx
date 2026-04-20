import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import api from '../../services/api'

const categoryOptions = [
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'living-room', label: 'Living Room' },
  { value: 'wardrobe', label: 'Wardrobe' },
  { value: 'full-home', label: 'Full Home' },
]

const emptyForm = {
  title: '',
  description: '',
  city: '',
  category: 'kitchen',
  priceRange: '',
  images: '',
  features: '',
}

function Projects() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState('')

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('/projects?limit=50')
      setRows(Array.isArray(response?.data?.data) ? response.data.data : [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load projects.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    const loadProjects = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await api.get('/projects?limit=50')
        if (!isActive) return

        setRows(Array.isArray(response?.data?.data) ? response.data.data : [])
      } catch (err) {
        if (isActive) {
          setError(err?.response?.data?.message || 'Unable to load projects.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadProjects()

    return () => {
      isActive = false
    }
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      city: form.city.trim(),
      category: form.category,
      priceRange: form.priceRange.trim(),
      images: form.images
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      features: form.features
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    if (!payload.title || !payload.description || !payload.city || !payload.images.length) {
      setError('Title, description, city and at least one image are required.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      if (editingId) {
        await api.patch(`/projects/${editingId}`, payload)
      } else {
        await api.post('/projects', payload)
      }
      await fetchProjects()
      resetForm()
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to save project.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project._id)
    setForm({
      title: project.title || '',
      description: project.description || '',
      city: project.city || '',
      category: project.category || 'kitchen',
      priceRange: project.priceRange || '',
      images: Array.isArray(project.images) ? project.images.join(', ') : '',
      features: Array.isArray(project.features) ? project.features.join(', ') : '',
    })
  }

  const handleDelete = async (projectId) => {
    try {
      setError('')
      await api.delete(`/projects/${projectId}`)
      setRows((prev) => prev.filter((project) => project._id !== projectId))
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to delete project.')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200">
        <h2 className="text-xl font-semibold text-primary">{editingId ? 'Edit Project' : 'Add Project'}</h2>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-primary">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="City" name="city" value={form.city} onChange={handleChange} required />
            <Select label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} />
          </div>

          <Input label="Price Range" name="priceRange" value={form.priceRange} onChange={handleChange} placeholder="e.g. INR 8L - 12L" />
          <Input
            label="Images (comma separated URLs)"
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="https://... , https://..."
            required
          />
          <Input
            label="Features (comma separated)"
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Soft-close shutters, Quartz countertop"
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
            </Button>
            {editingId ? (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card className="border border-slate-200">
        <h2 className="text-xl font-semibold text-primary">Projects</h2>
        {error ? <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <div className="mt-4 overflow-x-auto">
          <table className="crm-table text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">City</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted">
                    Loading projects...
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((project) => (
                  <tr key={project._id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-primary">{project.title}</td>
                    <td className="py-2 pr-4 text-muted">{project.city}</td>
                    <td className="py-2 pr-4 capitalize text-muted">{project.category}</td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                          onClick={() => handleEdit(project)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-300 px-2 py-1 text-xs text-red-700"
                          onClick={() => handleDelete(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted">
                    No projects found. Add your first project above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Projects
