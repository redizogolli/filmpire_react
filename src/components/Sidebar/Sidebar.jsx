import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListTiemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();

  return (
    <Link to="/" className="imageLink" />
  );
}

export default Sidebar;
