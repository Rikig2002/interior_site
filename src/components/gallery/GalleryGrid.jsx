import Card from '../ui/Card'
import ProjectCard from './ProjectCard'

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item} className="animate-pulse border border-slate-100 p-0">
          <div className="shimmer h-56" />
          <div className="space-y-3 p-5">
            <div className="shimmer h-5 w-2/5 rounded" />
            <div className="shimmer h-4 w-4/5 rounded" />
            <div className="shimmer h-3 w-1/3 rounded" />
          </div>
        </Card>
      ))}
    </div>
  )
}

function GalleryGrid({ projects, isLoading, error }) {
  if (isLoading) {
    return <GallerySkeleton />
  }

  if (error) {
    return <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
  }

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
        <p className="text-2xl" aria-hidden="true">
          🧭
        </p>
        <p className="mt-2 text-sm font-medium text-primary">No projects found</p>
        <p className="mt-1 text-sm text-muted">Try changing filters or search keywords.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project._id || project.id || project.slug} project={project} />
      ))}
    </div>
  )
}

export default GalleryGrid
