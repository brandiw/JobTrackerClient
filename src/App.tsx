import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material';
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Companies } from './pages/Companies'
import { Applications } from './pages/Applications'
import { ApplicationDetail } from './pages/ApplicationDetail'
import { NewInterviewNote } from './pages/NewInterviewNote';
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
            <Route path="/applications/:companyId" element={<Applications />} />
            <Route path="/application/:applicationId" element={<ApplicationDetail />} />
            <Route path="/applications/:applicationId/notes/new" element={<NewInterviewNote />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
