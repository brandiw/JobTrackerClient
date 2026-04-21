import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CreateApplicationRequest {
  title: string;
  status: number;
  roleType: number;
  url: string;
  companyId: string;
  dateApplied: string;
}

const statusOptions = [
  'Applied',
  'Initial Screen',
  'Code Test',
  'Interviewing',
  'Closed',
  'Rejected',
  'Offer',
];

const roleTypeOptions = ['Remote', 'Hybrid', 'Onsite'];

const statusMap: Record<string, number> = {
  'Applied': 1,
  'Initial Screen': 2,
  'Code Test': 3,
  'Interviewing': 4,
  'Closed': 5,
  'Rejected': 6,
  'Offer': 7,
};

const roleTypeMap: Record<string, number> = {
  'Remote': 1,
  'Hybrid': 2,
  'Onsite': 3,
};

const reverseStatusMap: Record<number, string> = Object.fromEntries(
  Object.entries(statusMap).map(([k, v]) => [v, k])
);

const reverseRoleTypeMap: Record<number, string> = Object.fromEntries(
  Object.entries(roleTypeMap).map(([k, v]) => [v, k])
);

export function NewApplication() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateApplicationRequest>({
    title: '',
    status: 1,
    roleType: 1,
    url: '',
    companyId: companyId || '',
    dateApplied: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange =
    (field: keyof CreateApplicationRequest) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const getStatusLabel = (statusNum: number): string => {
    return reverseStatusMap[statusNum] || 'Applied';
  };

  const getRoleTypeLabel = (roleTypeNum: number): string => {
    return reverseRoleTypeMap[roleTypeNum] || 'Remote';
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();

    if (!companyId) {
      setErrorMessage('Company id is missing.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log('bad response', await response.text());
        throw new Error('Failed to create application.');
      }

      navigate(`/applications`);
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
            to={companyId ? `/companies/${companyId}` : '/companies'}
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{ mb: 2 }}
          >
            Back to Company
          </Button>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Add New Application
          </Typography>

          <Typography color="text.secondary">
            Create a new job application for this company.
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
                  label="Job Title"
                  value={formData.title}
                  onChange={handleChange('title')}
                  fullWidth
                  required
                />

                <TextField
                  label="Status"
                  value={formData.status}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      status: parseInt(e.target.value, 10),
                    }));
                  }}
                  fullWidth
                  select
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={statusMap[status]}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Role Type"
                  value={formData.roleType}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      roleType: parseInt(e.target.value, 10),
                    }));
                  }}
                  fullWidth
                  select
                >
                  {roleTypeOptions.map((roleType) => (
                    <MenuItem key={roleType} value={roleTypeMap[roleType]}>
                      {roleType}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Job Posting URL"
                  value={formData.url}
                  onChange={handleChange('url')}
                  fullWidth
                />

                <TextField
                    label="Date Applied"
                    value={formData.dateApplied}
                    onChange={handleChange('dateApplied')}
                    type="date"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                        shrink: true,
                        },
                    }}
                    />

                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Application'}
                  </Button>

                  <Button
                    component={RouterLink}
                    to={companyId ? `/companies/${companyId}` : '/companies'}
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