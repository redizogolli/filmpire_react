import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { userSelector, setUser } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToogleColorMode';
import './Navbar.css';

// Styling components
const CustomToolBar = styled(Toolbar)(({ theme }) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '240px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    flexWrap: 'wrap',
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '240px',
    flexShrink: 0,
  },
}));

function Navbar() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const { toogleColorMode } = useContext(ColorModeContext);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const location = useLocation();

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          if (sessionId) {
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
            dispatch(setUser(userData));
          }
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <CustomToolBar>
          {isMobile && (
            <CustomIconButton
              color="inherit"
              edge="start"
              onClick={() => {
                setMobileOpen((prev) => !prev);
              }}
            >
              <Menu />
            </CustomIconButton>
          )}
          <IconButton color="inherit" onClick={() => { toogleColorMode(); }} sx={{ ml: 1 }}>
            {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && location.pathname === '/' && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className="linkButton"
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  style={{ width: 30, height: 30 }}
                />
              </Button>
            )}
          </div>
          {isMobile && location.pathname === '/' && <Search />}
        </CustomToolBar>
      </AppBar>
      <div>
        <nav className="drawer">
          {isMobile ? (
            <CustomDrawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((previousState) => !previousState)}
              classes={{ paper: 'drawerPaper' }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </CustomDrawer>
          ) : (
            <CustomDrawer variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </CustomDrawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
