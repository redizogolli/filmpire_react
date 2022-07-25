import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

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
  outline: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isAuthenticated = true;
  return (
    <>
      <AppBar position="fixed">
        <CustomToolBar>
          {isMobile && (
            <CustomIconButton
              color="inherit"
              edge="start"
              onClick={() => {
                setMobileOpen(!mobileOpen);
              }}
            >
              <Menu />
            </CustomIconButton>
          )}
          <IconButton color="inherit" onClick={() => {}} sx={{ ml: 1 }}>
            {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/123"
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
          {isMobile && 'Search...'}
        </CustomToolBar>
      </AppBar>
      <div>
        <nav className="drawer">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              className="drawerBackground"
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar />
            </Drawer>
          ) : (
            <Drawer />
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
