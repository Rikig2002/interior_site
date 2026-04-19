import Button from '../ui/Button'

function Hero() {
  const heroBackground =
    "linear-gradient(110deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.75) 45%, rgba(37, 99, 235, 0.45) 100%), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80')"

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: heroBackground,
          backgroundColor: '#0f172a',
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-14">
        <div className="max-w-xl space-y-6 animate-fade-up">
          <p className="inline-flex rounded-full border border-white/30 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            End-to-end interior design
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Design Your Dream Home
          </h1>
          <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
            Personalized interiors, transparent pricing, and expert execution for every room in your home.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#lead-form">
              <Button className="px-6 py-3 text-base" variant="primary">
                Get Free Consultation
              </Button>
            </a>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-slate-100">
              4.9/5 rating from 1,200+ homeowners
            </span>
          </div>

          <div className="grid max-w-lg grid-cols-3 gap-3 pt-2 text-white">
            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-sm">
              <p className="text-lg font-semibold">45+</p>
              <p className="text-xs text-slate-200">Cities Served</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-sm">
              <p className="text-lg font-semibold">12k+</p>
              <p className="text-xs text-slate-200">Homes Designed</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-sm">
              <p className="text-lg font-semibold">10 Yr</p>
              <p className="text-xs text-slate-200">Design Warranty</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm lg:p-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/90">Why clients choose us</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-100">
            <li>1. Dedicated design experts across kitchen, wardrobes, and full-home interiors</li>
            <li>2. 3D previews, transparent costing, and milestone-based execution</li>
            <li>3. On-time delivery backed by quality materials and workmanship assurance</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
