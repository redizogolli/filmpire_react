import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Sidebar.css';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];
const demoCategories = [
  {
    label: 'Comedy',
    value: 'comedy',
  },
  {
    label: 'Drama',
    value: 'drama',
  },
  {
    label: 'Action',
    value: 'action',
  },
  {
    label: 'Adventure',
    value: 'adventure',
  },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  return (
    <>
      <Link to="/" className="imageLink">
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire Logo"
          className="image"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className="links" to="/" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt="Logo"
                  className="genreImages"
                  height={30}
                  style={{ filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)' }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className="links" to="/" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt="Logo"
                  className="genreImages"
                  height={30}
                  style={{ filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)' }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
