'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from '../components/CustomIcons';
import Notification from '../components/Notification';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [notificationStatus] = React.useState(false);
  const [notificationMessage] = React.useState("");

  const [signUpDisabled] = React.useState(false);


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement | null;
  
    let isValid = true;
  
    if (!email || !email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  
    return isValid;
  };
  

  const handleCloseNotification = () =>{
    setNotification(false);
  }

  // const handleOpenNotification = () =>{
  //   setNotification(true);
  // }  

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const response = await signInUser({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
    
//     if (response.status === 200){
//       console.log("sign in success!",response.data)
//       sessionStorage.setItem('user',JSON.stringify(response.data))  // save basic user data in session storage for easy access
//       authDispatch({type:'change',payload:response.data})           // setting context provider use state
//       console.log(JSON.parse(sessionStorage.getItem('user')))
//       navigate('/')
//     }
//     else{
//       console.error("error during sign in",response)
//       setNotificationMessage(response.response.data.detail)
//       setNotificationStatus(false)
//       handleOpenNotification()
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: async(codeResponse) => {
//       const response = await LoginSignUpGoogle(codeResponse.access_token)
//       if(response.status === 200){
//         console.log("sign in success!",response.data)
//         sessionStorage.setItem('user',JSON.stringify(response.data))  // save basic user data in session storage for easy access
//         authDispatch({type:'change',payload:response.data})           // setting context provider use state
//         console.log(JSON.parse(sessionStorage.getItem('user')))
//         navigate('/')
//       }
//       else{
//         console.error("error during sign in",response)
//         setNotificationMessage(response.response.data.detail)
//         setNotificationStatus(false)
//         handleOpenNotification()
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed:', error)
//       setNotificationMessage("Error during google login")
//       setNotificationStatus(false)
//       handleOpenNotification()
//     }
//   });

  return (
    <>
        <CssBaseline />
          <Stack
            sx={{
              justifyContent: 'center',
              height: '100dvh',
              p: 2,
              mt: {
                xl:4,
                lg:10,
                md:10,
                sm:10,
                xs:10
              }
            }}
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                // onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                  sx={{
                    background: 'linear-gradient(45deg, #2a2d96 30%, #b036c9 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #b036c9 30%, #2a2d96 90%)',
                    },
                    mt: 2
                  }}
                >
                  Sign in
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                  Don&apos;t have an account?{' '}
                  <span>
                    <Link
                      href="/sign-up"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign up
                    </Link>
                  </span>
                </Typography>
              </Box>
              <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
              </Divider>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  disabled={signUpDisabled}
                  type="submit"
                  fullWidth
                  variant="outlined"
                //   onClick={() => googleLogin()}
                  startIcon={<GoogleIcon />}
                  sx={{
                    borderColor: '#2a2d96', // Change this to your preferred outline color
                    color: 'white',       // Optional: Match text color with the outline color
                    '&:hover': {
                      borderColor: '#2a2d96',  // Change this for the hover state
                    },
                  }}
                >
                  Sign in with Google
                </Button>
              </Box>
              
            </Card>
          </Stack>
          { notification &&
          <Notification message={notificationMessage} status={notificationStatus} close={handleCloseNotification}/>
          }
        </>
  );
}

