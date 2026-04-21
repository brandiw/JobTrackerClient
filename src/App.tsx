import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material';
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Companies } from './pages/Companies'
import { AllApplications } from './pages/AllApplications';
import { Applications } from './pages/Applications'
import { ApplicationDetail } from './pages/ApplicationDetail'
import { NewApplication } from './pages/NewApplication';
import { NewInterviewNote } from './pages/NewInterviewNote';
import { NewCompany } from './pages/NewCompany';
import Header from './components/Header';
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/new" element={<NewCompany />} />
            <Route path="/applications/:companyId" element={<Applications />} />
            <Route path="/application/:applicationId" element={<ApplicationDetail />} />
            <Route path="/applications/:applicationId/notes/new" element={<NewInterviewNote />} />
            <Route path="/applications" element={<AllApplications />} />
            <Route path="/applications/:companyId/new" element={<NewApplication />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
