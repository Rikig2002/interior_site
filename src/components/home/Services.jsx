import Card from '../ui/Card'
import { mockServices } from '../../utils/mockData'

function Services() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Interior Solutions</p>
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">Our Services</h2>
        <p className="text-sm text-muted sm:text-base">Designed to fit your lifestyle, budget, and taste with thoughtful detail.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockServices.map((service) => (
          <Card
            key={service.id}
            className="group overflow-hidden border border-slate-100 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/45 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-accent animate-float-soft">
                <span aria-hidden="true">{service.icon}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Services
