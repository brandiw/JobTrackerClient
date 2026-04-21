import { Link } from 'react-router-dom'
import cincentariImage from '../assets/cincentari.png'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your job tracking dashboard</p>
      <div style={{ textAlign: 'center' }}>
        <img 
          src={cincentariImage} 
          alt="Dashboard" 
          style={{ 
            width: '100%', 
            maxWidth: '600px',
            height: 'auto', 
            borderRadius: '8px',
            display: 'inline-block',
            margin: '20px 0'
          }} 
        />
        <p style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>
          Track your job applications and interview progress all in one place. Stay organized and focused on landing your next opportunity.
        </p>
      </div>
      <br />
      <nav>
        <Link to="/">Home</Link> | <Link to="/companies">Companies</Link>
      </nav>
    </div>
  )
}
