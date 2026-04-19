import Input from '../ui/Input'
import { mockProjects } from '../../utils/mockData'

const categoryLabelMap = {
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

const categoryOptions = [
  { value: '', label: 'All Categories' },
  ...Array.from(new Set(mockProjects.map((project) => project.category)))
    .filter(Boolean)
    .sort((a, b) => String(a).localeCompare(String(b)))
    .map((category) => ({ value: category, label: categoryLabelMap[category] || formatCategory(category) })),
]

const cityOptions = [
  { value: '', label: 'All Cities' },
  ...Array.from(new Set(mockProjects.map((project) => project.city))).map((city) => ({ value: city, label: city })),
]

function Filters({ filters, onChange, onReset, isLoading = false }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-200 p-4 shadow-card sm:p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Filter Collection</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-primary">
            Category
          </label>
          <select
            id="category-filter"
            name="category"
            value={filters.category}
            onChange={onChange}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {categoryOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city-filter" className="mb-2 block text-sm font-medium text-primary">
            City
          </label>
          <select
            id="city-filter"
            name="city"
            value={filters.city}
            onChange={onChange}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {cityOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Search"
          name="search"
          value={filters.search}
          onChange={onChange}
          placeholder="Search by title or tag"
          className="md:col-span-1"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted">Refine by category, city, or keyword.</p>
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear Filters
        </button>
      </div>
    </section>
  )
}

export default Filters
