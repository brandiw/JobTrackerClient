import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'
import '../components/shared.css'

interface Company {
  id: number
  name: string
  website: string
  locationCity: string
  locationState: string
  roleType: string
  applications: Application[]
}

interface Application {
  id: number
  title: string
  status: string
  dateApplied: string
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
      <pre>{JSON.stringify(company, null, 2)}</pre>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/companies">Companies</Link>
      </nav>
      <button
        onClick={() => navigate('/companies')}
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        Back to Companies
      </button>
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
                <td>{application.dateApplied}</td>
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
