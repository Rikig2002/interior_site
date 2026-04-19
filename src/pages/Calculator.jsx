import { useState } from 'react'
import CalculatorForm from '../components/calculator/CalculatorForm'
import ResultCard from '../components/calculator/ResultCard'
import Card from '../components/ui/Card'
import api from '../services/api'

const initialFormValues = {
  propertyType: '',
  area: '',
  designType: '',
  rooms: [],
  city: '',
}

const simulatePricingResponse = (payload) => {
  const designRates = {
    basic: { baseRate: 1300, multiplier: 1 },
    premium: { baseRate: 1800, multiplier: 1.15 },
    luxury: { baseRate: 2350, multiplier: 1.32 },
  }

  const propertyMultiplier = {
    '1bhk': 1,
    '2bhk': 1.08,
    '3bhk': 1.16,
    villa: 1.32,
  }

  const roomCosts = {
    kitchen: 160000,
    wardrobe: 110000,
    livingRoom: 140000,
  }

  const cityMultiplier = {
    mumbai: 1.18,
    bengaluru: 1.14,
    delhi: 1.16,
    pune: 1.08,
    hyderabad: 1.1,
    default: 1,
  }

  const area = Number(payload.area)
  const rates = designRates[payload.designType] || designRates.premium
  const propertyFactor = propertyMultiplier[payload.propertyType.toLowerCase()] || 1
  const cityFactor = cityMultiplier[String(payload.city || '').trim().toLowerCase()] || cityMultiplier.default

  const baseCost = area * rates.baseRate
  const roomCost = (payload.rooms || []).reduce((sum, room) => sum + (roomCosts[room] || 0), 0)
  const additionalCost = Math.max(baseCost * (rates.multiplier - 1), 0)

  const estimatedPrice = Math.round((baseCost + roomCost + additionalCost) * propertyFactor * cityFactor)

  return {
    estimatedPrice,
    priceRange: {
      min: Math.round(estimatedPrice * 0.9),
      max: Math.round(estimatedPrice * 1.12),
    },
    breakdown: {
      baseCost: Math.round(baseCost),
      roomCost: Math.round(roomCost),
      additionalCost: Math.round(additionalCost),
      propertyMultiplier: propertyFactor,
      cityMultiplier: cityFactor,
      selectedRooms: payload.rooms || [],
    },
    costPerSqft: Math.round(estimatedPrice / area),
  }
}

function validateForm(values) {
  const errors = {}

  if (!values.propertyType) {
    errors.propertyType = 'Property type is required.'
  }

  if (!values.area) {
    errors.area = 'Area is required.'
  } else {
    const numericArea = Number(values.area)
    if (Number.isNaN(numericArea) || numericArea <= 0) {
      errors.area = 'Enter a valid positive area.'
    }
  }

  if (!values.designType) {
    errors.designType = 'Design type is required.'
  }

  return errors
}

function Calculator() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultError, setResultError] = useState('')
  const [isMockResult, setIsMockResult] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '', form: '' }))
  }

  const handleRoomToggle = (roomName) => {
    setFormValues((previous) => {
      const exists = previous.rooms.includes(roomName)
      return {
        ...previous,
        rooms: exists ? previous.rooms.filter((item) => item !== roomName) : [...previous.rooms, roomName],
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateForm(formValues)
    setErrors(validationErrors)
    setResultError('')

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const payload = {
      propertyType: formValues.propertyType,
      area: Number(formValues.area),
      designType: formValues.designType,
      rooms: formValues.rooms,
      city: formValues.city.trim(),
    }

    try {
      setIsLoading(true)
      const response = await api.post('/pricing/calculate', payload)
      const apiResult = response?.data?.data

      setResult(apiResult)
      setIsMockResult(false)
    } catch (error) {
      const fallbackResult = simulatePricingResponse(payload)
      setResult(fallbackResult)
      setIsMockResult(true)

      const backendMessage = error?.response?.data?.message
      if (backendMessage && String(backendMessage).trim()) {
        setResultError(`${backendMessage}. Showing simulated estimate.`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="pointer-events-none absolute -left-14 top-2 h-40 w-40 rounded-full bg-sky-100/80 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-indigo-100/70 blur-2xl" />
        <div className="relative space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Smart Estimate Tool</p>
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Pricing Calculator</h1>
        <p className="text-sm text-muted sm:text-base">
          Build a quick estimate for your interiors based on home type, area, design package, and selected rooms.
        </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200 bg-gradient-to-br from-white via-white to-sky-50/70">
          <h2 className="mb-4 text-xl font-semibold text-primary">Input Details</h2>
          <CalculatorForm
            values={formValues}
            errors={errors}
            isLoading={isLoading}
            onChange={handleChange}
            onRoomToggle={handleRoomToggle}
            onSubmit={handleSubmit}
          />
        </Card>

        <ResultCard result={result} isLoading={isLoading} error={resultError} isMockResult={isMockResult} />
      </div>
    </div>
  )
}

export default Calculator
