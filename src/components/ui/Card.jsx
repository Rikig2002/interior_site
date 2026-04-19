function Card({ children, className = '' }) {
  return (
    <section className={`animate-fade-up rounded-2xl border border-slate-200/70 bg-card p-6 shadow-card transition-shadow duration-300 ${className}`}>
      {children}
    </section>
  )
}

export default Card
