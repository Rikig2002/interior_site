import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/project/CTASection'
import FeaturesList from '../components/project/FeaturesList'
import ImageGallery from '../components/project/ImageGallery'
import ProjectInfo from '../components/project/ProjectInfo'
import api from '../services/api'
import { getMockProjectById } from '../utils/mockData'

function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMockSource, setIsMockSource] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchProject = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await api.get(`/projects/${id}`)
        const projectData = response?.data?.data?.project || null

        if (isMounted) {
          if (projectData) {
            setProject(projectData)
            setIsMockSource(false)
          } else {
            const fallback = getMockProjectById(id)
            setProject(fallback)
            setIsMockSource(Boolean(fallback))
          }
        }
      } catch (requestError) {
        if (isMounted) {
          const fallback = getMockProjectById(id)
          if (fallback) {
            setProject(fallback)
            setIsMockSource(true)
            setError('')
          } else {
            const message = requestError?.response?.data?.message || 'Unable to load project details.'
            setError(message)
            setProject(null)
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (id) {
      fetchProject()
    }

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <div className="space-y-6 sm:space-y-8">
      <Link
        to="/gallery"
        className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-primary transition hover:bg-slate-100"
      >
        Back to gallery
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <div className="shimmer h-72 rounded-2xl sm:h-96" />
          <div className="shimmer h-40 rounded-2xl" />
          <div className="shimmer h-28 rounded-2xl" />
        </div>
      ) : null}

      {!isLoading && error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!isLoading && !error && project ? (
        <>
          {isMockSource ? <p className="text-xs text-muted">Showing curated showcase project</p> : null}
          <ImageGallery images={project.images} projectTitle={project.title} />
          <ProjectInfo project={project} />
          <FeaturesList features={project.features} />
          <CTASection />
        </>
      ) : null}
    </div>
  )
}

export default ProjectDetails
