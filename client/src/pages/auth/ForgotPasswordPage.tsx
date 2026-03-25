import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de réinitialisation envoyée pour :', email);
    // Appel de l'API ici
  };

  return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Mot de passe oublié ?
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Adresse e-mail"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: '#00796b',
                        '&:hover': {
                        backgroundColor: '#004d40',
                        },
                    }}
                >
                    Envoyer le lien
                </Button>
                <Grid container justifyContent="center">
                    <Grid>
                        <Link to="/" style={{ textDecoration: 'none', color: '#00796b' }}>
                            Retour à la connexion
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
