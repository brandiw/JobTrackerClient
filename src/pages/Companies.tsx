import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'
import '../components/shared.css'

type SortColumn = 'name' | 'location' | null
type SortDirection = 'asc' | 'desc'

interface Company {
  id: number
  name: string
  website?: string
  locationCity?: string
  locationState?: string
}

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
  }, [])

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // If clicking the same column, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // If clicking a different column, set it as the new sort column with ascending order
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortedCompanies = () => {
    if (!sortColumn) return companies

    const sorted = [...companies].sort((a, b) => {
      let aValue: string
      let bValue: string

      if (sortColumn === 'name') {
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
      } else {
        // location
        aValue = (
          a.locationCity && a.locationState
            ? `${a.locationCity}, ${a.locationState}`
            : a.locationCity || a.locationState || ''
        ).toLowerCase()
        bValue = (
          b.locationCity && b.locationState
            ? `${b.locationCity}, ${b.locationState}`
            : b.locationCity || b.locationState || ''
        ).toLowerCase()
      }

      const comparison = aValue.localeCompare(bValue)
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }

  const getSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? ' ▲' : ' ▼'
  }

  return (
    <div>
      <h1>Companies</h1>
      <p>Manage your target companies</p>

      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('name')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Name{getSortIndicator('name')}
            </th>
            <th
              onClick={() => handleSort('location')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Location{getSortIndicator('location')}
            </th>
            <th>Applications</th>
          </tr>
        </thead>
        <tbody>
          {getSortedCompanies().map((company: Company) => (
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
