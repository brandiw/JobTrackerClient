import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'
import '../components/shared.css'

export function Companies() {
  const [companies, setCompanies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
  }, [])

  return (
    <div>
      <h1>Companies</h1>
      <p>Manage your target companies</p>
      <pre>{JSON.stringify(companies, null, 2)}</pre>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Applications</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: any) => (
            <tr key={company.id}>
              <td>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.name}
                </a>
              </td>
              <td>
                {company.locationCity && company.locationState
                  ? `${company.locationCity}, ${company.locationState}`
                  : company.locationCity || company.locationState || 'N/A'}
              </td>
              <td>
                <button
                  onClick={() => navigate(`/applications/${company.id}`)}
                  className="btn btn-primary"
                >
                  {STRINGS.seeApplications}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
