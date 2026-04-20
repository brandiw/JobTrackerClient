import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import { STRINGS } from '../constants/strings'
import './App.css'

function App() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
  }, [])

  return (
    <>
      <div>
        <h1>{STRINGS.appTitle}</h1>
        <p>Frontend is running.</p>
        <pre>{JSON.stringify(companies, null, 2)}</pre>
      </div>
    </>
  )
}

export default App
