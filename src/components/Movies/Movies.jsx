import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MovieList } from '..';

import { useGetMoviesQuery } from '../../services/TMDB';

function Movies() {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          Error fetching movies.
          <br />
          Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}

export default Movies;
