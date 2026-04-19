import Card from '../ui/Card'

function BookingInfo() {
  return (
    <Card className="border border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <h2 className="text-2xl font-semibold text-primary">Why Book With Us</h2>
      <p className="mt-3 text-sm text-muted">
        Our consultation is designed to give you clear next steps, practical pricing guidance, and expert design direction.
      </p>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
        Average response time: within 30 minutes during business hours.
      </div>

      <ul className="mt-5 space-y-3 text-sm text-muted">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 text-accent" aria-hidden="true">
            ●
          </span>
          <span>Free consultation with no hidden charges.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 text-accent" aria-hidden="true">
            ●
          </span>
          <span>Experienced interior designers for every room type.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 text-accent" aria-hidden="true">
            ●
          </span>
          <span>Transparent pricing and milestone-based planning.</span>
        </li>
      </ul>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</h3>
        <p className="mt-3 text-sm text-muted">Phone: +91-90000-11111</p>
        <p className="mt-1 text-sm text-muted">Email: consult@manishinterior.in</p>
      </div>
    </Card>
  )
}

export default BookingInfo
