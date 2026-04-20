import { Link } from 'react-router-dom'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your job tracking dashboard</p>
      <nav>
        <Link to="/">Home</Link> | <Link to="/companies">Companies</Link>
      </nav>
    </div>
  )
}
