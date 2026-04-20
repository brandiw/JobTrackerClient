import { Link } from 'react-router-dom'
import { STRINGS } from '../../constants/strings'

export function Home() {
  return (
    <div>
      <h1>{STRINGS.appTitle}</h1>
      <p>Welcome to Job Tracker</p>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/companies">Companies</Link></li>
        </ul>
      </nav>
    </div>
  )
}
