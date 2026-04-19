import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function CTASection() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-primary to-slate-800 px-6 py-10 sm:px-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Love this style?</h2>
          <p className="mt-2 text-sm text-slate-200">Book a consultation and get a personalized design quote.</p>
        </div>
        <Link to="/book">
          <Button variant="primary" className="px-6 py-3 text-base">
            Book Consultation
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default CTASection
