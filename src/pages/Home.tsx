// src/pages/HomePage.tsx
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkIcon from '@mui/icons-material/Work';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { STRINGS } from '../../constants/strings'
import heroImage from '../assets/hero.png'
import buildMomentumImage from '../assets/homepage_build_momentum.png'
import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, marginBottom: 3 }}>
            { STRINGS.appTitle }
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
            { STRINGS.homeBlurb }
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <img 
            src={heroImage} 
            alt="Job Tracker Hero" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px',
              display: 'block'
            }} 
          />
        </Box>

        

        <Card elevation={0} sx={{ border: '1px solid', borderColor: '#b0e0e6' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#b0e0e6' }}>
              { STRINGS.homeBlurb2Title }
            </Typography>

            <Typography color="text.secondary">
              { STRINGS.homeBlurb2 }
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <BusinessOutlinedIcon sx={{ color: '#b0e0e6' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {STRINGS.manageCompanies}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    {STRINGS.manageCompaniesBlurb}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to="/companies" size="small">
                  View Companies
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <WorkIcon sx={{ color: '#b0e0e6' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {STRINGS.trackApplications}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    {STRINGS.trackApplicationsBlurb}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to="/applications" size="small">
                  View Applications
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <NoteAltOutlinedIcon sx={{ color: '#b0e0e6' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {STRINGS.saveInterviewNotes}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    {STRINGS.saveInterviewNotesBlurb}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to="/dashboard" size="small">
                  Go to Dashboard
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <img 
            src={buildMomentumImage} 
            alt="Build Momentum" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px',
              display: 'block'
            }} 
          />
        </Box>

        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(144,202,249,0.12), rgba(244,143,177,0.08))',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <HomeWorkOutlinedIcon sx={{ color: '#b0e0e6' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {STRINGS.buildMomentum}
                </Typography>
              </Stack>

              <Typography color="text.secondary">
                {STRINGS.buildMomentumBlurb}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button component={RouterLink} to="/dashboard" variant="contained">
                  Open Dashboard
                </Button>
                <Button component={RouterLink} to="/companies" variant="outlined">
                  Browse Companies
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}