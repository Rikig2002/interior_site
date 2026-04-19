import BookingForm from '../components/booking/BookingForm'
import BookingInfo from '../components/booking/BookingInfo'
import Card from '../components/ui/Card'

function Book() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Book Consultation</h1>
        <p className="text-sm text-muted sm:text-base">
          Schedule a free design consultation and get personalized recommendations for your home.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:gap-8">
        <Card className="border border-slate-200">
          <h2 className="mb-4 text-2xl font-semibold text-primary">Consultation Details</h2>
          <BookingForm />
        </Card>

        <BookingInfo />
      </div>
    </div>
  )
}

export default Book
