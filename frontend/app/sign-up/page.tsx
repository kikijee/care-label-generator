'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
//import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { signUpUser } from '../api-service/user';
//import { GoogleIcon } from '../components/CustomIcons';
//import { signUpUser, signInUser, LoginSignUpGoogle } from '../apiService';
import Notification from '../components/Notification';
//import { useNavigate } from 'react-router-dom';
//import { AuthDispatchContext } from '../context/AuthContext';
//import { useGoogleLogin } from '@react-oauth/google';
//import { useRouter } from 'next/navigation'

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

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  // const [websiteError, setWebsiteError] = React.useState(false);
  // const [websiteErrorMessage, setWebsiteErrorMessage] = React.useState('');

  // const [companyError, setCompanyError] = React.useState(false);
  // const [companyErrorMessage, setCompanyErrorMessage] = React.useState('');

  // const [rnError, setRnError] = React.useState(false);
  // const [rnErrorMessage, setRnErrorMessage] = React.useState('');

  const [notification, setNotification] = React.useState(false);
  const [notificationStatus,setNotificationStatus] = React.useState(false);
  const [notificationMessage,setNotificationMessage] = React.useState("");

  const [signUpDisabled] = React.useState(false);

  //const router = useRouter()


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement | null;
    const password = document.getElementById('password') as HTMLInputElement | null;
    const name = document.getElementById('name') as HTMLInputElement | null;

    let isValid = true;

    if (!email || !email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || !password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name || !name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const response = await signUpUser({
      Email: data.get('email'),
      Name: data.get('name'),
      Password: data.get('password'),
      Website: data.get('website') !== "" ? data.get('website') : null,
      RnNumber: data.get('rn-number') !== "" ? data.get('rn-number') : null,
      Address: data.get('address') !== "" ? data.get('address') : null,
      Role: "User"
    });
    console.log(response)
    if (response.status === 201) {
      console.log("account creation success!", response.data)
      form.reset();
      setNotificationStatus(true)
      setNotification(true)
      setNotificationMessage("Account successfully created")
      //router.push('/sign-in')
    }
    else {
      console.error("error in account creation", response.data.message)
      setNotificationStatus(false)
      setNotification(true)
      setNotificationMessage(response.data.message)
    }
  };

  const handleCloseNotification = () => {
    setNotification(false)
  }

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (codeResponse) => {
//       const response = await LoginSignUpGoogle(codeResponse.access_token)
//       if (response.status === 200) {
//         console.log("sign in success!", response.data)
//         sessionStorage.setItem('user', JSON.stringify(response.data))  // save basic user data in session storage for easy access
//         authDispatch({ type: 'change', payload: response.data })           // setting context provider use state
//         console.log(JSON.parse(sessionStorage.getItem('user')))
//         navigate('/')
//       }
//       else {
//         console.error("error in account creation", response.response)
//         setNotificationStatus(false)
//         setNotification(true)
//         setNotificationMessage(response.response.data.detail)
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed:', error)
//       setNotificationMessage("Error during google login")
//       setNotificationStatus(false)
//       setNotification(true)
//     }
//   });

  return (
    <>
      <CssBaseline />
      <Stack
        sx={{
          justifyContent: 'center',
          alignContent:'center',
          minHeight: '100vh',
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
            Sign up
          </Typography>
          {signUpDisabled &&
          <Box
            sx={{
              backgroundColor: '#ffeb3b',
              color: '#000',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Hello! Our web application is currently under going testing by a select
            number of users. Signing up is temporarily disabled. If you would like
            to become a tester, please contact one of our team members in the about
            us page. Hope to see you soon!
            <br />
            <strong>- PELE team</strong>
          </Box>
          }
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                disabled={signUpDisabled}
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                disabled={signUpDisabled}
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
                disabled={signUpDisabled}
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="website">Company Website {"(optional)"}</FormLabel>
              <TextField
                disabled={signUpDisabled}
                autoComplete="website"
                name="website"
                //required
                fullWidth
                id="website"
                placeholder="your website"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rn-number">Company RN number {"(optional)"}</FormLabel>
              <TextField
                disabled={signUpDisabled}
                autoComplete="rn-number"
                name="rn-number"
                //required
                fullWidth
                id="rn-number"
                placeholder="your RN number"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Company Address {"(optional)"}</FormLabel>
              <TextField
                disabled={signUpDisabled}
                autoComplete="address"
                name="address"
                //required
                fullWidth
                id="address"
                placeholder="your address"
              />
            </FormControl>
            {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                /> */}
            <Button
              disabled={signUpDisabled}
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
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link
                  href="/sign-in"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </Stack>

      {notification &&
        <Notification message={notificationMessage} status={notificationStatus} close={handleCloseNotification} />
      }
    </>
  );
}
