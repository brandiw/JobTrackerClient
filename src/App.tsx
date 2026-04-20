import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Companies } from './pages/Companies'
import { Applications } from './pages/Applications'
import { ApplicationDetail } from './pages/ApplicationDetail'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/applications/:companyId" element={<Applications />} />
        <Route path="/application/:applicationId" element={<ApplicationDetail />} />
      </Routes>
    </>
  )
}

export default App
