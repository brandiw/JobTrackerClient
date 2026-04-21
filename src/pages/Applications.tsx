import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { STRINGS } from '../../constants/strings'
import '../components/shared.css'

interface Company {
  id: number
  name: string
  website: string
  locationCity: string
  locationState: string
  applications: Application[]
}

interface Application {
  id: number
  title: string
  status: string
  roleType: string
  url: string | null
  dateApplied: Date
}

export function Applications() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState<Company | null>(null)

  useEffect(() => {
    if (!companyId) return

    // Fetch applications for this company
    fetch(`/api/companies/${companyId}`)
      .then(res => res.json())
      .then(data => setCompany(data))
  }, [companyId])

  return (
    <div>
      <h1>Applications for {company?.name}</h1>
      <Button
        component={Link}
        to={`/applications/${companyId}/new`}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
    >
        Add New Application
    </Button>
      {company?.applications.length === 0 ? (
        <p>No applications found for this company.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {company?.applications.map((application: any) => (
              <tr key={application.id}>
                <td>{application.title}</td>
                <td>{application.status}</td>
                <td>{new Date(application.dateApplied).toISOString().split('T')[0]}</td>
                <td>
                  <button
                    onClick={() => navigate(`/application/${application.id}`)}
                    className="btn btn-primary"
                  >
                    {STRINGS.seeNotes}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
