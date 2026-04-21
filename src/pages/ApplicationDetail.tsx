import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import '../components/shared.css';
import { STRINGS } from '../../constants/strings';

interface InterviewNote {
  id: number;
  note: string;
  nextStep: string;
}

interface ApplicationDetail {
  id: number;
  title: string;
  company: string;
  status: string;
  dateApplied: string;
  notes: InterviewNote[];
}

export function ApplicationDetail() {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);

  useEffect(() => {
    if (!applicationId) return;

    fetch(`/api/applications/${applicationId}`)
      .then((res) => res.json())
      .then((data) => setApplication(data));
  }, [applicationId]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        {application?.title ?? 'Application Details'}
      </Typography>

      <nav style={{ marginBottom: '16px' }}>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/companies">Companies</Link>
      </nav>

      <Button
        component={Link}
        to={`/applications/${applicationId}/notes/new`}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
      >
        Add Interview Note
      </Button>

      {application ? (
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                <strong>Company:</strong> {application.company}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {application.status}
              </Typography>
              <Typography variant="body1">
                <strong>Date Applied:</strong> {application.dateApplied}
              </Typography>
            </CardContent>
          </Card>

          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {STRINGS.notesTitle}
            </Typography>

            {application.notes.map((noteItem) => (
              <Card
                key={noteItem.id}
                sx={{
                  mb: 2,
                  background:
                    'linear-gradient(135deg, rgba(144,202,249,0.12), rgba(244,143,177,0.08))',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">
                          {noteItem.note}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <IconButton aria-label="edit note" color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete note" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Divider sx={{ borderColor: '#b0e0e6' }} />

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700 }}
                    >
                      Next Step: {noteItem.nextStep || 'No next step provided'}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      ) : (
        <Typography>{STRINGS.loading}</Typography>
      )}
    </Container>
  );
}