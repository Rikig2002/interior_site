import { useEffect, useMemo, useState } from 'react'
import Filters from '../components/gallery/Filters'
import GalleryGrid from '../components/gallery/GalleryGrid'
import api from '../services/api'
import { mockProjects } from '../utils/mockData'

const initialFilters = {
  category: '',
  city: '',
  search: '',
}

const mergeWithMockProjects = (apiProjects = []) => {
  const merged = new Map()

  for (const project of mockProjects) {
    const key = project.id || project.slug || `${project.title}-${project.city}`
    merged.set(key, project)
  }

  for (const project of apiProjects) {
    const key = project?._id || project?.id || project?.slug || `${project?.title || ''}-${project?.city || ''}`
    if (!merged.has(key)) {
      merged.set(key, project)
    }
  }

  return Array.from(merged.values())
}

const filterProjects = (items, activeFilters) => {
  const category = String(activeFilters.category || '').trim().toLowerCase()
  const city = String(activeFilters.city || '').trim().toLowerCase()
  const search = String(activeFilters.search || '').trim().toLowerCase()

  return items.filter((project) => {
    const matchesCategory = !category || String(project.category || '').toLowerCase() === category
    const matchesCity = !city || String(project.city || '').toLowerCase() === city

    const searchable = [project.title, project.city, project.category, ...(project.tags || [])]
      .join(' ')
      .toLowerCase()
    const matchesSearch = !search || searchable.includes(search)

    return matchesCategory && matchesCity && matchesSearch
  })
}

function Gallery() {
  const [filters, setFilters] = useState(initialFilters)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMockSource, setIsMockSource] = useState(false)

  const queryString = useMemo(() => {
    const params = new URLSearchParams()

    if (filters.category) {
      params.append('category', filters.category)
    }

    if (filters.city) {
      params.append('city', filters.city)
    }

    if (filters.search.trim()) {
      params.append('search', filters.search.trim())
    }

    return params.toString()
  }, [filters])

  useEffect(() => {
    let isMounted = true

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await api.get('/projects')

        if (isMounted) {
          const apiProjects = Array.isArray(response?.data?.data) ? response.data.data : []
          const mergedProjects = mergeWithMockProjects(apiProjects)
          setProjects(filterProjects(mergedProjects, filters))
          setIsMockSource(true)
        }
      } catch {
        if (isMounted) {
          setProjects(filterProjects(mockProjects, filters))
          setError('')
          setIsMockSource(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }, 350)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [filters, queryString])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((previous) => ({ ...previous, [name]: value }))
  }

  const handleResetFilters = () => {
    setFilters(initialFilters)
  }

  const portfolioHeroBackground =
    "linear-gradient(110deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.8) 42%, rgba(30, 64, 175, 0.55) 100%), url('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=80')"

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-card">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: portfolioHeroBackground,
            backgroundColor: '#0f172a',
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Portfolio Collection</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Our Projects</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-100 sm:text-base">
            Browse real homes designed by our team. Filter by category, city, and keyword.
          </p>
          {isMockSource ? <p className="mt-2 text-xs text-slate-200">Showing curated portfolio collection</p> : null}
        </div>
      </section>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:p-6">
        <div className="pointer-events-none absolute -right-10 top-2 h-36 w-36 rounded-full bg-sky-100/80 blur-2xl" />
        <div className="relative">
          <Filters filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} isLoading={isLoading} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50/80 p-4 shadow-card sm:p-6">
        <GalleryGrid projects={projects} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}

export default Gallery
