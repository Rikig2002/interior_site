import Card from '../ui/Card'
import { mockTestimonials } from '../../utils/mockData'

function Testimonials() {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">What Our Clients Say</h2>
        <p className="text-sm text-muted sm:text-base">Trusted by homeowners across multiple cities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockTestimonials.map((item) => (
          <Card key={item.id} className="border border-slate-100">
            <p className="text-amber-500" aria-label={`Rated ${item.rating} out of 5`}>
              {'★'.repeat(Math.round(item.rating))}
            </p>
            <p className="text-sm leading-relaxed text-slate-600">"{item.review}"</p>
            <p className="mt-4 text-sm font-semibold text-primary">{item.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-accent">{item.city ? `${item.city} • ` : ''}Rating: {item.rating}/5</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
