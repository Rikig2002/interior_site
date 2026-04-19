const categoryLabels = {
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  'living-room': 'Living Room',
  wardrobe: 'Wardrobe',
  'full-home': 'Full Home',
}

function ProjectInfo({ project }) {
  const title = project?.title || 'Untitled Project'
  const description = project?.description || 'No description available.'
  const city = project?.city || 'N/A'
  const category = categoryLabels[project?.category] || project?.category || 'General'
  const priceRange = project?.priceRange || 'On request'

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <h1 className="text-3xl font-bold text-primary sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">City</p>
          <p className="mt-1 text-sm font-semibold text-primary">{city}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Category</p>
          <p className="mt-1 text-sm font-semibold text-primary">{category}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Price Range</p>
          <p className="mt-1 text-sm font-semibold text-primary">{priceRange}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Featured</p>
          <p className="mt-1 text-sm font-semibold text-primary">{project?.isFeatured ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </section>
  )
}

export default ProjectInfo
