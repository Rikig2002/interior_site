import { useState } from 'react'
import api from '../../services/api'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

const initialValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  requirement: '',
  preferredDate: '',
  preferredTime: '',
}

const timeSlots = [
  { value: '', label: 'Select preferred time' },
  { value: '10:00 AM - 11:00 AM', label: '10:00 AM - 11:00 AM' },
  { value: '11:00 AM - 12:00 PM', label: '11:00 AM - 12:00 PM' },
  { value: '12:00 PM - 01:00 PM', label: '12:00 PM - 01:00 PM' },
  { value: '02:00 PM - 03:00 PM', label: '02:00 PM - 03:00 PM' },
  { value: '03:00 PM - 04:00 PM', label: '03:00 PM - 04:00 PM' },
  { value: '04:00 PM - 05:00 PM', label: '04:00 PM - 05:00 PM' },
]

const phoneRegex = /^\+?[0-9]{7,15}$/

const isFutureDate = (value) => {
  if (!value) {
    return false
  }

  const selected = new Date(`${value}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return selected > today
}

function validateBooking(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required.'
  } else if (!phoneRegex.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (values.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.'
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Requirement is required.'
  }

  if (!values.preferredDate) {
    errors.preferredDate = 'Preferred date is required.'
  } else if (!isFutureDate(values.preferredDate)) {
    errors.preferredDate = 'Preferred date must be in the future.'
  }

  if (!values.preferredTime) {
    errors.preferredTime = 'Preferred time is required.'
  }

  return errors
}

function BookingForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '', form: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateBooking(values)
    setErrors(validationErrors)
    setApiError('')
    setSuccessMessage('')

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)

      await api.post('/bookings', {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        requirement: values.requirement.trim(),
        preferredDate: values.preferredDate,
        preferredTime: values.preferredTime,
      })

      setSuccessMessage('Your consultation has been booked.')
      setValues(initialValues)
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to book consultation right now. Please try again.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        error={errors.name}
        required
      />

      <Input
        label="Phone"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        error={errors.phone}
        required
      />

      <Input
        label="Email (optional)"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
      />

      <Input
        label="City"
        name="city"
        value={values.city}
        onChange={handleChange}
        placeholder="Enter your city"
        error={errors.city}
        required
      />

      <div>
        <label htmlFor="requirement" className="mb-2 block text-sm font-medium text-primary">
          Requirement<span className="text-red-600"> *</span>
        </label>
        <textarea
          id="requirement"
          name="requirement"
          value={values.requirement}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us what you want to design"
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? 'requirement-error' : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-2 text-sm text-text transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            errors.requirement ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
          }`}
        />
        {errors.requirement ? (
          <p id="requirement-error" className="mt-2 text-xs text-red-600">
            {errors.requirement}
          </p>
        ) : null}
      </div>

      <Input
        label="Preferred Date"
        name="preferredDate"
        type="date"
        value={values.preferredDate}
        onChange={handleChange}
        error={errors.preferredDate}
        required
      />

      <Select
        label="Preferred Time"
        name="preferredTime"
        value={values.preferredTime}
        onChange={handleChange}
        options={timeSlots}
        error={errors.preferredTime}
        required
      />

      {successMessage ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {apiError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</p>
      ) : null}

      <Button type="submit" className="w-full py-3 text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Booking...
          </span>
        ) : (
          'Book Free Consultation'
        )}
      </Button>
    </form>
  )
}

export default BookingForm
