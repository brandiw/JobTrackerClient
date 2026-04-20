import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

interface ApplicationDetail {
  id: number
  title: string
  company: string
  status: string
  dateApplied: string
  notes: string
}

export function ApplicationDetail() {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState<ApplicationDetail | null>(null)

  useEffect(() => {
    if (!applicationId) return

    fetch(`/api/applications/${applicationId}`)
      .then(res => res.json())
      .then(data => setApplication(data))
  }, [applicationId])

  return (
    <div>
      <h1>{application?.title}</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/companies">Companies</Link>
      </nav>
      <button
        onClick={() => navigate(-1)}
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
        Back
      </button>
      {application ? (
        <div>
          <p><strong>Company:</strong> {application.company}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Date Applied:</strong> {application.dateApplied}</p>
          <div>
            <strong>Notes:</strong>
            <p>{application.notes || 'No notes'}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
