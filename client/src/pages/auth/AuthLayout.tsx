import { CssBaseline, Paper, Grid } from '@mui/material';
import Image from '../../assets/Logo_transparent_1.png';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
        
      <CssBaseline />

      <Grid
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Outlet />
      </Grid>

      <Grid
        sx={{
          display: { xs: 'none', sm: 'block' },
          flexGrow: 1,
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#e0f7fa',
        }}
      />
    </Grid>
  );
};

export default AuthLayout;
