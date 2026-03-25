/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Grid,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { Token } from '../../utils/Token';

const AuthPage = () => {
    const [signInData, setSignInData] = useState({ identification: '', password: '' });
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log(signInData);
        try {
            const res = await UserService.SignIn(signInData);
            Token.AddToken("authUser", res.data.token);
            Token.AddToken("user", JSON.stringify(res.data.user));
            setSignInData({ identification: '', password: '' });
            window.location.href = "/admin";
        } catch(error: any) {
            setError(true);
            setMessage(error.response?.data?.message || "Une erreur s'est produite");
            console.error("Mot de passe ou login incorrect");
        }
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
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    Système de gestion de centre de santé
                </Typography>
                {error && (
                    <Alert sx={{ mt: 2 }} severity="error">
                        {message}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email ou Nom d'utilisateur"
                        autoComplete="email"
                        autoFocus
                        value={signInData.identification}
                        onChange={(e) => setSignInData({...signInData, identification: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mot de passe"
                        type="password"
                        autoComplete="current-password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({...signInData, password: e.target.value})}
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
                        Se connecter
                    </Button>
                </Box>
                <Grid container justifyContent="center">
                    <Grid>
                        <Link to="/forgot" style={{ textDecoration: 'none', color: '#00796b' }}>
                            Mot de passe oublié ?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AuthPage;
