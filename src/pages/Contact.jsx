import { useState } from 'react'
import api from '../services/api'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { mockTestimonials } from '../utils/mockData'

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  city: '',
  requirement: '',
  message: '',
}

function validateContactForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required.'
  } else if (!/^\+?[0-9]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.'
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Please choose your requirement.'
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us a little about your project.'
  } else if (values.message.trim().length < 15) {
    errors.message = 'Please enter at least 15 characters.'
  }

  return errors
}

function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateContactForm(formData)
    setErrors(validationErrors)
    setSuccessMessage('')
    setApiError('')

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)

      await api.post('/leads', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        requirement: formData.requirement.trim(),
        source: 'Contact Page',
        notes: formData.message.trim(),
      })

      setSuccessMessage('Thank you. Our design consultant will contact you within 24 hours.')
      setFormData(initialFormData)
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to submit right now. Please try again.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-sky-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-amber-100/70 blur-2xl" />
        <div className="relative space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Contact Us</p>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Let&apos;s Design Your Space Together</h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            Have questions about pricing, timeline, or materials? Reach out directly and our team will prepare a tailored plan for your home.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:gap-8">
        <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-primary to-slate-800 text-white">
          <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
          <div className="relative space-y-5">
            <h2 className="text-2xl font-semibold text-white">Studio Contact Details</h2>
            <div className="space-y-3 text-sm text-slate-200 sm:text-base">
              <p>
                <span className="font-semibold text-white">Phone:</span> +91-00000-00000
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span> hello@manishinterior.in
              </p>
              <p>
                <span className="font-semibold text-white">Address:</span> 4th Floor, Design Hub, MG Road, Bengaluru
              </p>
              <p>
                <span className="font-semibold text-white">Hours:</span> Mon - Sat, 10:00 AM - 7:00 PM
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">Client Feedback</p>
              <p className="mt-2 text-sm text-white">“{mockTestimonials[0]?.review || 'Great design process and transparent communication.'}”</p>
              <p className="mt-2 text-xs text-slate-200">- {mockTestimonials[0]?.name || 'Happy Client'}</p>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50/80">
          <h2 className="mb-5 text-2xl font-semibold text-primary">Send Us An Enquiry</h2>

          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
              required
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              error={errors.email}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              error={errors.city}
              required
            />

            <Input
              className="sm:col-span-2"
              label="Requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Kitchen, Full Home, Bedroom, Wardrobes"
              error={errors.requirement}
              required
            />

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">
                Project Details <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your preferred style, budget range, and expected timeline."
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-text shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.message ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.message ? <p className="mt-2 text-xs text-red-600">{errors.message}</p> : null}
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3">
              {successMessage ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>
              ) : null}
              {apiError ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</p> : null}

              <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  )
}

export default Contact
