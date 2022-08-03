import { Box, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector, unsetUser } from '../../features/auth';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];
  // if (!user || !user.id) {
  //   return <Navigate to="/" />;
  // }
  const logout = () => {
    // clear the state
    dispatch(unsetUser());
    // redirect to home
    navigate('/');
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? <Typography variant="h5">Add favorites or watchlist some movies to see them here</Typography>
        : (
          <Box>
            Favorite Movies
          </Box>
        )}
    </Box>
  );
}

export default Profile;
