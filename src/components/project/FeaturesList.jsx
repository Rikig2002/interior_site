function FeaturesList({ features = [] }) {
  const items = Array.isArray(features) ? features.filter(Boolean) : []

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <h2 className="text-2xl font-bold text-primary">Project Features</h2>

      {items.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {items.map((feature, index) => (
            <li key={`${feature}-${index}`}>{feature}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">Detailed features will be shared during consultation.</p>
      )}
    </section>
  )
}

export default FeaturesList
