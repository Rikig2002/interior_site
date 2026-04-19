import Card from '../ui/Card'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0)

function ResultCard({ result, isLoading, error, isMockResult }) {
  if (isLoading) {
    return (
      <Card className="animate-pulse border border-slate-200 bg-white">
        <div className="h-6 w-1/2 rounded bg-slate-200" />
        <div className="mt-6 h-12 w-2/3 rounded bg-slate-200" />
        <div className="mt-6 space-y-3">
          <div className="h-10 rounded bg-slate-200" />
          <div className="h-10 rounded bg-slate-200" />
          <div className="h-10 rounded bg-slate-200" />
        </div>
      </Card>
    )
  }

  if (error && !result) {
    return (
      <Card className="border border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-primary">Estimate Result</h2>
        <p className="mt-4 text-sm text-red-700">{error}</p>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="border border-slate-200 bg-gradient-to-br from-white to-slate-50">
        <h2 className="text-xl font-semibold text-primary">Estimate Result</h2>
        <p className="mt-4 text-sm text-muted">Enter details to estimate cost.</p>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-white via-white to-indigo-50/60 transition-opacity duration-500">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-100/80 blur-3xl" />
      <div className="relative">
      <h2 className="text-xl font-semibold text-primary">Estimated Cost</h2>
      {isMockResult ? <p className="mt-1 text-xs text-muted">Calculated in offline mode</p> : null}
      {error ? <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">{error}</p> : null}

      <p className="mt-5 text-4xl font-bold text-accent">{formatCurrency(result.estimatedPrice)}</p>

      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="text-muted">Price Range</span>
          <span className="font-semibold text-primary">
            {formatCurrency(result.priceRange?.min)} - {formatCurrency(result.priceRange?.max)}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="text-muted">Cost per sqft</span>
          <span className="font-semibold text-primary">{formatCurrency(result.costPerSqft)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="text-muted">Base Cost</span>
            <span className="font-medium text-primary">{formatCurrency(result.breakdown?.baseCost)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="text-muted">Room Cost</span>
            <span className="font-medium text-primary">{formatCurrency(result.breakdown?.roomCost)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="text-muted">Additional Cost</span>
            <span className="font-medium text-primary">{formatCurrency(result.breakdown?.additionalCost)}</span>
          </div>
        </div>
      </div>
      </div>
    </Card>
  )
}

export default ResultCard
