import { useState, type SyntheticEvent } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CreateInterviewNoteRequest {
  note: string;
  nextStep: string;
}

export function NewInterviewNote() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateInterviewNoteRequest>({
    note: '',
    nextStep: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange =
    (field: keyof CreateInterviewNoteRequest) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    if (!applicationId) {
      setErrorMessage('Application id is missing.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/applications/${applicationId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create interview note.');
      }

      navigate(`/application/${applicationId}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Button
            component={RouterLink}
            to={applicationId ? `/application/${applicationId}` : '/applications'}
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{ mb: 2 }}
          >
            Back to Application
          </Button>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Add Interview Note
          </Typography>

          <Typography color="text.secondary">
            Record interview feedback, reminders, and the next step for this application.
          </Typography>
        </Box>

        <Card
          sx={{
            background:
              'linear-gradient(135deg, rgba(144,202,249,0.12), rgba(244,143,177,0.08))',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

                <TextField
                  label="Note"
                  value={formData.note}
                  onChange={handleChange('note')}
                  fullWidth
                  required
                  multiline
                  minRows={5}
                />

                <TextField
                  label="Next Step"
                  value={formData.nextStep}
                  onChange={handleChange('nextStep')}
                  fullWidth
                />

                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Note'}
                  </Button>

                  <Button
                    component={RouterLink}
                    to={applicationId ? `/application/${applicationId}` : '/applications'}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}