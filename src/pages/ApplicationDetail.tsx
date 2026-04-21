import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!applicationId) return;

    fetch(`/api/applications/${applicationId}`)
      .then((res) => res.json())
      .then((data) => setApplication(data));
  }, [applicationId]);

  const handleDeleteNote = async () => {
    if (!applicationId || noteToDelete === null || !application) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/applications/${applicationId}/notes/${noteToDelete}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete note.');
      }

      setApplication({
        ...application,
        notes: application.notes.filter((note) => note.id !== noteToDelete),
      });

      setNoteToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

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
                        <IconButton
                          aria-label="delete note"
                          color="error"
                          onClick={() => setNoteToDelete(noteItem.id)}
                        >
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
      <Dialog
  open={noteToDelete !== null}
  onClose={() => {
    if (!isDeleting) {
      setNoteToDelete(null);
    }
  }}
>
  <DialogTitle>Delete Interview Note</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this note? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => setNoteToDelete(null)}
        disabled={isDeleting}
      >
        Cancel
      </Button>
      <Button
        onClick={handleDeleteNote}
        color="error"
        variant="contained"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </DialogActions>
  </Dialog>
    </Container>
  );
}