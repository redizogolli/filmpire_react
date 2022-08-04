import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { MovieList } from '..';
import { useGetActorQuery, useGetActorMoviesQuery } from '../../services/TMDB';

import './Actor.css';
import { flexbox } from '@mui/system';

function Actors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorQuery({ id });
  const page = 1;
  const { data: actorMovies, error: actorMoviesError } = useGetActorMoviesQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Button startIcon={<ArrowBack />} onClick={() => { navigate(-1); }}>
          Something went wrong. Click here to go back to the home page.
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3} className="actor">
        <Grid item lg={5} xl={4}>
          <img className="actor__image" src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt={data.name} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" className="actor__name" gutterBottom>{data.name}</Typography>
          <Typography variant="h5" className="actor__birthday" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body2" className="actor__name" align="justify" paragraph>{data?.biography || 'Sorry no bio yet.'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => { navigate(-1); }} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {actorMovies && (
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        <MovieList movies={actorMovies} numberOfMovies={12} />
      </Box>
      )}
    </>
  );
}

export default Actors;
