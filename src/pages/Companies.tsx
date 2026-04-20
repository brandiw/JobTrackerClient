import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'

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
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Location</th>
            <th style={{ padding: '10px' }}>Applications</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: any) => (
            <tr key={company.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.name}
                </a>
              </td>
              <td style={{ padding: '10px' }}>
                {company.locationCity && company.locationState
                  ? `${company.locationCity}, ${company.locationState}`
                  : company.locationCity || company.locationState || 'N/A'}
              </td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => navigate(`/applications/${company.id}`)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
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
