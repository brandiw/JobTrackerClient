import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Chip,
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { STRINGS } from '../../constants/strings';
import '../components/shared.css';

interface ApplicationRow {
  id: number;
  title: string;
  status: string;
  roleType: string;
  url: string | null;
  companyId: number;
  companyName: string;
}

export function AllApplications() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch('/api/applications');

        if (!response.ok) {
          throw new Error('Failed to load applications.');
        }

        const data: ApplicationRow[] = await response.json();
        setApplications(data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Something went wrong.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadApplications();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        All Applications
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        View and manage all of your job applications in one place.
      </Typography>

      {errorMessage ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Posting</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>{STRINGS.loading}</TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>{STRINGS.noApplicationsFound}</TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow
                  key={application.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/application/${application.id}`}
                      underline="hover"
                    >
                      {application.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/companies/${application.companyId}`}
                      underline="hover"
                    >
                      {application.companyId}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={application.status}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>{application.roleType}</TableCell>

                  <TableCell>
                    {application.url ? (
                      <Link
                        href={application.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        View Posting
                      </Link>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}