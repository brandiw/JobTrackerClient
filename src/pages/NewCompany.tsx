import { useState, type SyntheticEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

interface CreateCompanyRequest {
  name: string;
  locationCity: string;
  locationState: string;
  website: string;
}

export function NewCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: '',
    locationCity: '',
    locationState: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange =
    (field: keyof CreateCompanyRequest) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create company.');
      }

      navigate('/companies');
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
            to="/companies"
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{ mb: 2 }}
          >
            Back to Companies
          </Button>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Add Company
          </Typography>

          <Typography color="text.secondary">
            Create a new company so you can track applications and interviews for it.
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
                {errorMessage ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}

                <TextField
                  label="Company Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  fullWidth
                  required
                />

                <TextField
                  label="City"
                  value={formData.locationCity}
                  onChange={handleChange('locationCity')}
                  fullWidth
                />

                <TextField
                  label="State"
                  value={formData.locationState}
                  onChange={handleChange('locationState')}
                  fullWidth
                />

                <TextField
                  label="Website"
                  value={formData.website}
                  onChange={handleChange('website')}
                  fullWidth
                  type="url"
                  placeholder="https://example.com"
                />

                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Company'}
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/companies"
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