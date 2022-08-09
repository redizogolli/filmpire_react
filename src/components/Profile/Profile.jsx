import { Box, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector, unsetUser } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchListMovies, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

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
      {!favoriteMovies?.results?.length && !watchListMovies?.results?.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see them here</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchListMovies} />
          </Box>
        )}
    </Box>
  );
}

export default Profile;
