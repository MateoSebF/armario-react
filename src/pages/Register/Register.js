import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import apiClient from '../../services/apiClient';
import Swal from 'sweetalert2';
import './Register.css';
import { ThreeDots } from 'react-loader-spinner';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        ClothCraft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

// This component is used to register a new user.
export default function SignUp() {

  const [loading, setLoading] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nullError, setNullError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleNullValidation = (value) => {
    if (value === '') {
      setNullError('This field is required');
      return false;
    } else {
      setNullError('');
      return true;
    }
  }

  const handleEmailValidation = (email) => {
    if (!validateEmail(email)) {
      setEmailError('Insert a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handlePasswordValidation = (password) => {
    if (!validatePassword(password)) {
      setPasswordError('The password must contain at least 6 characters, one uppercase letter and one special character');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');


    // Validar el Email y la Password por separado
    const resultNullValidationFirstName = handleNullValidation(firstName);
    const resultNullValidationUserName = handleNullValidation(username);
    const resultEmailValidation = handleEmailValidation(email);
    const resultPasswordValidation = handlePasswordValidation(password);

    // Si hay errores en la validación, detener el proceso de registro
    if (resultEmailValidation === false || resultPasswordValidation === false || resultNullValidationUserName === false || resultNullValidationFirstName === false) {
      setLoading(false);
      return;
    }
    await apiClient.post(`/user/create`, {
      name: (data.get('firstName') + ' ' + data.get('lastName')),
      email: data.get('email'),
      password: data.get('password'),
      username: ("@" + data.get('username'))
    })
      .then((response) => {
        Swal.fire({
          title: 'Your account has been created successfully!',
          text: 'A verification email has been sent to your email address. Please verify your account to continue.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.response.data,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.error('Error al enviar la solicitud:', error.response.data);
      });
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className={loading ? 'blur-background' : ''}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#733800' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  error={!!nullError}
                  helperText={nullError}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required={false}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={!!nullError}
                  helperText={nullError}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {loading ? (
              <div className="fullscreen-loader">
                <ThreeDots color="#86654B" height={100} width={100} />
                <div className="loader-message">Processing your request, please wait..</div>
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
