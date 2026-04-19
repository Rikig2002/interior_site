import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function CTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800/20 bg-gradient-to-r from-primary via-slate-900 to-sky-950 px-6 py-10 sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Book Your Free Consultation Today</h2>
          <p className="mt-2 text-sm text-slate-200 sm:text-base">
            Speak with our design experts and get a personalized concept, timeline, and budget roadmap.
          </p>
        </div>
        <Link to="/book">
          <Button variant="primary" className="animate-pulse-glow px-6 py-3 text-base">
            Book Consultation
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default CTA
