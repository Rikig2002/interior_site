import { useState } from 'react'
import api from '../../services/api'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'

const initialFormData = {
  name: '',
  phone: '',
  city: '',
  requirement: '',
}

function validateLeadForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required.'
  } else if (!/^\+?[0-9]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.'
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Requirement is required.'
  }

  return errors
}

function LeadForm() {
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

    const validationErrors = validateLeadForm(formData)
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
        city: formData.city.trim(),
        requirement: formData.requirement.trim(),
      })

      setSuccessMessage('Thanks! Our design team will contact you shortly.')
      setFormData(initialFormData)
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to submit right now. Please try again.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="lead-form" className="scroll-mt-24">
      <Card className="border border-slate-200 bg-gradient-to-br from-white to-slate-50/80">
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Get Free Design Consultation</h2>
          <p className="text-sm text-muted sm:text-base">Share your requirement and our experts will call you with a tailored plan.</p>
        </div>

        <form className="grid gap-4 sm:grid-cols-2 lg:gap-5" onSubmit={handleSubmit} noValidate>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            error={errors.name}
            required
          />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            error={errors.phone}
            required
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
            label="Requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            placeholder="Kitchen, full home, wardrobe, etc."
            error={errors.requirement}
            required
          />

          <div className="sm:col-span-2 flex flex-col gap-3 pt-1">
            {successMessage ? (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </p>
            ) : null}
            {apiError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</p>
            ) : null}

            <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}

export default LeadForm
