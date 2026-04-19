function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
  className = '',
  ...props
}) {
  const inputId = id || name

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-primary">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
      ) : null}

      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text shadow-sm transition focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p id={`${inputId}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Select
