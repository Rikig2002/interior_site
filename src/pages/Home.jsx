import CTA from '../components/home/CTA'
import FeaturedProjects from '../components/home/FeaturedProjects'
import Hero from '../components/home/Hero'
import LeadForm from '../components/home/LeadForm'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'

function Home() {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      <Hero />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-5 shadow-card sm:p-7">
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -right-12 top-4 h-44 w-44 rounded-full bg-blue-100/70 blur-2xl" />
        <LeadForm />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-sky-50/70 p-5 shadow-card sm:p-7">
        <div className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-cyan-100/80 blur-2xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl" />
        <Services />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-indigo-50/40 p-5 shadow-card sm:p-7">
        <div className="pointer-events-none absolute -left-10 top-6 h-32 w-32 rounded-full bg-sky-100/70 blur-2xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-100/70 blur-2xl" />
        <FeaturedProjects />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-amber-50/70 p-5 shadow-card sm:p-7">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-amber-200/70 blur-2xl" />
        <Testimonials />
      </div>
      <CTA />
    </div>
  )
}

export default Home
