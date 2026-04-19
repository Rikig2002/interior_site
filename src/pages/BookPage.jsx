import { useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

function BookPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <Card className="border border-slate-200">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Book Consultation</h1>
        <p className="mt-3 text-base text-muted">
          Share your details and preferred schedule. Our design consultant will connect within 24 hours.
        </p>

        {submitted ? (
          <p className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Consultation request received. Our team will call you shortly.
          </p>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <Input label="Name" name="name" placeholder="e.g. Rahul Verma" required />
          <Input label="Phone" name="phone" placeholder="e.g. +91 9876543210" required />
          <Input label="City" name="city" placeholder="e.g. Mumbai" required />
          <Input label="Preferred Date" name="date" type="date" required />
          <Button type="submit" className="w-full sm:w-fit">
            Confirm Booking
          </Button>
        </form>
      </Card>

      <Card className="border border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <h2 className="text-xl font-semibold text-primary">What Happens Next</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>1. Discovery call to understand your style and scope.</li>
          <li>2. Budget planning and timeline discussion.</li>
          <li>3. Design walkthrough with material recommendations.</li>
          <li>4. Proposal and execution roadmap.</li>
        </ul>
      </Card>
    </div>
  )
}

export default BookPage
