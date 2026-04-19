const variantStyles = {
  primary: 'bg-accent text-white shadow-sm hover:bg-blue-700 hover:shadow-md focus-visible:ring-accent',
  secondary: 'bg-primary text-white shadow-sm hover:bg-slate-800 hover:shadow-md focus-visible:ring-primary',
  outline: 'border border-slate-300 bg-white text-primary hover:bg-slate-100 focus-visible:ring-primary',
}

function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const variantClass = variantStyles[variant] || variantStyles.primary

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
