import { useParams } from 'react-router-dom'
import Card from '../components/ui/Card'

function ProjectDetailsPage() {
  const { id } = useParams()

  return (
    <Card>
      <h1 className="text-3xl font-bold text-primary sm:text-4xl">Project Details</h1>
      <p className="mt-4 text-base text-muted">Project ID: {id}</p>
    </Card>
  )
}

export default ProjectDetailsPage
