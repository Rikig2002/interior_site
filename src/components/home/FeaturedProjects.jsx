import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { mockProjects } from '../../utils/mockData'
import Card from '../ui/Card'

const fallbackImage =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80'

function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMockSource, setIsMockSource] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      try {
        setLoading(true)

        const response = await api.get('/projects')
        const payload = response?.data?.data

        if (isMounted) {
          const list = Array.isArray(payload) ? payload : []
          if (list.length) {
            setProjects(list.slice(0, 6))
            setIsMockSource(false)
          } else {
            setProjects(mockProjects.slice(0, 6))
            setIsMockSource(true)
          }
        }
      } catch (requestError) {
        if (isMounted) {
          setProjects(mockProjects.slice(0, 6))
          setIsMockSource(true)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="animate-pulse border border-slate-100">
              <div className="h-44 rounded-lg bg-slate-200" />
              <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-1/3 rounded bg-slate-200" />
            </Card>
          ))}
        </div>
      )
    }

    if (projects.length === 0) {
      return (
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-muted">
          No projects available yet.
        </p>
      )
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const id = project._id || project.id || project.slug
          const title = project.title || 'Untitled Project'
          const city = project.city || 'Location unavailable'
          const image = Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : fallbackImage

          return (
            <Link key={id} to={`/project/${id}`} className="group">
              <Card className="overflow-hidden border border-slate-100 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-slate-200">{city}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{city}</p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    )
  }, [loading, projects])

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Featured Projects</h2>
          <p className="text-sm text-muted sm:text-base">Explore recent interiors crafted by our expert design team.</p>
        </div>
        <Link
          to="/gallery"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-primary transition hover:bg-slate-100"
        >
          View All Projects
        </Link>
      </div>
      <div className="space-y-2">
        {isMockSource ? <p className="text-xs text-muted">Curated showcase projects</p> : null}
      </div>
      {content}
    </section>
  )
}

export default FeaturedProjects
