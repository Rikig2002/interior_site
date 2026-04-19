function Input({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id || name} className="mb-2 block text-sm font-medium text-primary">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
      ) : null}

      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id || name}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
        }`}
        {...props}
      />

      {error ? (
        <p id={`${id || name}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
