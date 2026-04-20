import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'

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
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Companies
      </button>
      {company?.applications.length === 0 ? (
        <p>No applications found for this company.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px' }}>Job Title</th>
              <th style={{ padding: '10px' }}>Status</th>
              <th style={{ padding: '10px' }}>Date Applied</th>
              <th style={{ padding: '10px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {company?.applications.map((application: any) => (
              <tr key={application.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{application.title}</td>
                <td style={{ padding: '10px' }}>{application.status}</td>
                <td style={{ padding: '10px' }}>{application.dateApplied}</td>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={() => navigate(`/application/${application.id}`)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
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
