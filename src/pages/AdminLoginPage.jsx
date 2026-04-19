import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

function AdminLoginPage() {
  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
      <p className="mt-3 text-sm text-muted">Authentication integration will be connected in the next phases.</p>
      <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <Input label="Email" name="email" type="email" placeholder="admin@example.com" required />
        <Input label="Password" name="password" type="password" placeholder="Enter password" required />
        <Button type="submit" variant="secondary">
          Login
        </Button>
      </form>
    </Card>
  )
}

export default AdminLoginPage
