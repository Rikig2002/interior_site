import { useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const packageMultipliers = {
  essential: 1450,
  premium: 1900,
  luxury: 2450,
}

const packageLabels = {
  essential: 'Essential',
  premium: 'Premium',
  luxury: 'Luxury',
}

function CalculatorPage() {
  const [form, setForm] = useState({
    area: '1200',
    packageType: 'premium',
    rooms: '3',
  })

  const estimated = useMemo(() => {
    const area = Number(form.area) || 0
    const rooms = Number(form.rooms) || 0
    const multiplier = packageMultipliers[form.packageType] || packageMultipliers.premium

    if (!area || !rooms) {
      return null
    }

    const base = area * multiplier
    const roomAdjustment = rooms * 180000
    const subtotal = base + roomAdjustment
    const tax = subtotal * 0.18
    const total = subtotal + tax

    return {
      subtotal,
      tax,
      total,
    }
  }, [form.area, form.packageType, form.rooms])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Pricing Calculator</h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Get an instant estimate based on your home size, room count, and design package.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <Input
              label="Carpet Area (sq ft)"
              name="area"
              type="number"
              min="300"
              value={form.area}
              onChange={handleChange}
              placeholder="Enter area"
              required
            />

            <div>
              <label htmlFor="packageType" className="mb-2 block text-sm font-medium text-primary">
                Package
              </label>
              <select
                id="packageType"
                name="packageType"
                value={form.packageType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="essential">Essential</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <Input
              label="Number of Rooms"
              name="rooms"
              type="number"
              min="1"
              max="8"
              value={form.rooms}
              onChange={handleChange}
              placeholder="Enter room count"
              required
            />

            <Button type="button" variant="secondary" className="w-full sm:w-fit">
              Estimate Updated
            </Button>
          </form>
        </Card>

        <Card className="border border-slate-200 bg-gradient-to-br from-white to-slate-50">
          <h2 className="text-xl font-semibold text-primary">Estimated Investment</h2>
          <p className="mt-2 text-sm text-muted">Indicative numbers for planning. Final quote depends on design scope.</p>

          {estimated ? (
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3">
                <span className="text-muted">Package</span>
                <span className="font-semibold text-primary">{packageLabels[form.packageType]}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold text-primary">{formatCurrency(estimated.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3">
                <span className="text-muted">Estimated Taxes</span>
                <span className="font-semibold text-primary">{formatCurrency(estimated.tax)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-white">
                <span>Total Estimate</span>
                <span className="font-semibold">{formatCurrency(estimated.total)}</span>
              </div>
            </div>
          ) : (
            <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-muted">
              Enter valid values to preview your estimate.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default CalculatorPage
