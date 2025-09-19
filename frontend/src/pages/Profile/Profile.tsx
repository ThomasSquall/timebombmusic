import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { changePassword } from "../../services/user.service";
import { useAuth } from "../../contexts/jwt-provider";

export const Profile: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const { getAccessTokenSilently } = useAuth();

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setSnackbarMessage("Tutti i campi sono obbligatori.");
      setSnackbarSeverity("error");
    } else if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("Le password non coincidono.");
      setSnackbarSeverity("error");
    } else {
      try {
        const accessToken = await getAccessTokenSilently();
        // Replace 'your_access_token' with the real access token
        const response = await changePassword({
          accessToken,
          currentPassword,
          newPassword,
          confirmNewPassword,
        });

        if (response.error) {
          setSnackbarMessage(
            `Errore durante il cambio password: ${JSON.stringify(
              response.error
            )}`
          );
          setSnackbarSeverity("error");
        } else {
          setSnackbarMessage("La password è stata cambiata con successo.");
          setSnackbarSeverity("success");
          // reset the fields
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
      } catch (err) {
        setSnackbarMessage("Un errore è occorso durante il cambio password.");
        setSnackbarSeverity("error");
      }
    }
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3 }}>
        <Typography variant="h1">Profilo utente</Typography>
        <Box sx={{ pt: 3 }}>
          <Typography variant="h5" mb={4}>
            Cambia Password
          </Typography>
          <form>
            <TextField
              label="Password corrente"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="Nuova Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Conferma Nuova Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ color: "white" }}
              onClick={handlePasswordChange}
            >
              Cambia
            </Button>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
