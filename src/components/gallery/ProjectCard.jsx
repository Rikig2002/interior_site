import { Link } from 'react-router-dom'
import Card from '../ui/Card'

const categoryLabels = {
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  'living-room': 'Living Room',
  wardrobe: 'Wardrobe',
  'full-home': 'Full Home',
  dining: 'Dining',
  'pooja-room': 'Pooja Room',
  'home-office': 'Home Office',
  'kids-room': 'Kids Room',
}

const formatCategory = (category) =>
  String(category || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const fallbackImage =
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'

function ProjectCard({ project }) {
  const projectId = project?._id || project?.id || project?.slug
  const image = Array.isArray(project?.images) && project.images.length > 0 ? project.images[0] : fallbackImage
  const title = project?.title || 'Untitled Project'
  const city = project?.city || 'N/A'
  const category = categoryLabels[project?.category] || formatCategory(project?.category) || 'General'
  const priceRange = project?.priceRange || 'Custom Quote'

  return (
    <Link to={`/project/${projectId}`} className="group">
      <Card className="h-full overflow-hidden border border-slate-100 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/25 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            {priceRange}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-slate-200">{city}</p>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <p className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-accent">
            {category}
          </p>
          <h3 className="line-clamp-2 text-lg font-semibold text-primary">{title}</h3>
          <p className="text-sm text-muted">{city}</p>
        </div>
      </Card>
    </Link>
  )
}

export default ProjectCard
