import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { mockPackages } from '../utils/mockData'

function Packages() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-primary via-slate-900 to-sky-950 p-6 shadow-card sm:p-8">
        <div className="pointer-events-none absolute -left-12 top-0 h-48 w-48 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">Package Planner</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Interior Packages</h1>
          <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
            Compare curated plans from essential setups to bespoke luxury delivery. Upgrade anytime based on project scope.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockPackages.map((pkg) => (
          <Card key={pkg.id} className="relative overflow-hidden border border-slate-200 bg-white p-0">
            <div className={`bg-gradient-to-r ${pkg.accent} px-5 py-4`}>
              <h2 className="text-xl font-semibold text-white">{pkg.name}</h2>
              <p className="mt-1 text-sm text-white/90">{pkg.priceHint}</p>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-primary">Best for:</span> {pkg.bestFor}
              </p>

              <ul className="space-y-2 text-sm text-muted">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 text-accent" aria-hidden="true">
                      ●
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/book" className="inline-flex">
                <Button variant="outline">Choose {pkg.name}</Button>
              </Link>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}

export default Packages
