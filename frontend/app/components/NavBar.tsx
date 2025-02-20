'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { logout } from '../api-service/auth';
import { useRouter } from 'next/navigation'
import { useAuthData, useAuthDispatch } from '../context/AuthContext';

const pages_user = [['create label', '/create-label'],['dashboard', '/dashboard']];
const pages_non_user = [['login', '/sign-in'], ['sign up', '/sign-up']];
const settings = [
  {
    name: 'Profile',
    action: () => { return; }
  },
  {
    name: 'Account',
    action: () => { return; }
  },
  {
    name: 'Dashboard',
    action: () => { return; }
  },
  {
    name: 'Logout',
    action: async () => {
      const response = await logout();
      console.log(response);
      sessionStorage.removeItem("care-label-user");
    }
  }
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean | null>(null);
  // const [pages, setPages] = React.useState<[string, string][]>([]);

  const authData = useAuthData()
  const setAuthData = useAuthDispatch();

  // React.useEffect(() => {

  //   if (typeof window !== "undefined") {
  //     setIsUserLoggedIn(sessionStorage.getItem('care-label-user') !== null);
  //   }

  //   if(authData.user){
  //     setPages([['create label', '/create-label']])
  //   }
  //   else if (authData.user === null){
  //     setPages([])
  //   }
  //   else{
  //     setPages([['login', '/sign-in'], ['sign up', '/sign-up']])
  //   }
  // }, [authData])

  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #000 30%, #444444 100%)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ReceiptLongIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EZ-LABEL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {authData.user && pages_user.map((page) => (
                <MenuItem component='a' key={page[0]} onClick={handleCloseNavMenu} href={page[1]}>
                  <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
                </MenuItem>
              ))}

              {!authData.user && authData.user !== null && pages_non_user.map((page) => (
                <MenuItem component='a' key={page[0]} onClick={handleCloseNavMenu} href={page[1]}>
                  <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ReceiptLongIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EZ-LABEL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {authData.user && pages_user.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page[1]}
              >
                {page[0]}
              </Button>
            ))}

            {!authData.user && authData.user !== null && pages_non_user.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page[1]}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
          { authData.user &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://media.licdn.com/dms/image/v2/D5603AQG_loVKxtclfQ/profile-displayphoto-shrink_800_800/B56ZSQpjs8HQAc-/0/1737593608312?e=1743033600&v=beta&t=O_IUwfVmLmXBamRpEBU_0V4PgJZXdHTvNnNoZgccsNw" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.action();
                    if (setting.name === 'Logout') {
                      setAuthData({ user: false });
                      router.push('/')
                    }
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;