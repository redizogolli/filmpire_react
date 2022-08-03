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
import { Sidebar, Search } from '..';
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
                setMobileOpen((prev) => !prev);
              }}
            >
              <Menu />
            </CustomIconButton>
          )}
          <IconButton color="inherit" onClick={() => {}} sx={{ ml: 1 }}>
            {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && <Search />}
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
          {isMobile && <Search />}
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
