import Card from '../components/ui/Card'
import { mockDesignStyles } from '../utils/mockData'

function DesignStyles() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-cyan-100/80 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-indigo-100/80 blur-3xl" />
        <div className="relative space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Style Studio</p>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Design Styles by Manish Interior</h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            Explore curated interior styles and pick the visual direction that fits your lifestyle, budget, and personality.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mockDesignStyles.map((style) => (
          <Card key={style.id} className="group overflow-hidden border border-slate-200 p-0">
            <div className="relative h-52 overflow-hidden">
              <img
                src={style.heroImage}
                alt={style.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-semibold text-white">{style.name}</h2>
                <p className="mt-1 text-sm text-slate-200">{style.vibe}</p>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                {style.palette.map((color) => (
                  <span
                    key={color}
                    className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Palette color ${color}`}
                  />
                ))}
              </div>

              <ul className="space-y-2 text-sm text-muted">
                {style.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-accent" aria-hidden="true">
                      ●
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}

export default DesignStyles
