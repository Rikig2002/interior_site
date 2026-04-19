import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

const propertyTypeOptions = [
  { value: '', label: 'Select property type' },
  { value: '1BHK', label: '1BHK' },
  { value: '2BHK', label: '2BHK' },
  { value: '3BHK', label: '3BHK' },
  { value: 'Villa', label: 'Villa' },
]

const designTypeOptions = [
  { value: '', label: 'Select design type' },
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
]

const roomOptions = [
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'wardrobe', label: 'Wardrobe' },
  { value: 'livingRoom', label: 'Living Room' },
]

function CalculatorForm({ values, errors, isLoading, onChange, onRoomToggle, onSubmit }) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <Select
        name="propertyType"
        label="Property Type"
        value={values.propertyType}
        onChange={onChange}
        options={propertyTypeOptions}
        error={errors.propertyType}
        required
      />

      <Input
        name="area"
        type="number"
        min="100"
        label="Area (sq ft)"
        value={values.area}
        onChange={onChange}
        placeholder="e.g. 1200"
        error={errors.area}
        required
      />

      <Select
        name="designType"
        label="Design Type"
        value={values.designType}
        onChange={onChange}
        options={designTypeOptions}
        error={errors.designType}
        required
      />

      <div>
        <p className="mb-2 block text-sm font-medium text-primary">Rooms</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {roomOptions.map((room) => {
            const isSelected = values.rooms.includes(room.value)

            return (
              <label
                key={room.value}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm shadow-sm transition ${
                  isSelected
                    ? 'border-accent bg-gradient-to-br from-blue-50 to-indigo-50 text-accent'
                    : 'border-slate-300 bg-white text-muted hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onRoomToggle(room.value)}
                />
                {room.label}
              </label>
            )
          })}
        </div>
      </div>

      <Input
        name="city"
        label="City (optional)"
        value={values.city}
        onChange={onChange}
        placeholder="e.g. Mumbai"
      />

      {errors.form ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form}</p> : null}

      <Button type="submit" className="w-full sm:w-fit" disabled={isLoading}>
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Calculating...
          </span>
        ) : (
          'Calculate Estimate'
        )}
      </Button>
    </form>
  )
}

export default CalculatorForm
