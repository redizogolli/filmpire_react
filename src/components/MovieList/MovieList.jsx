import React from 'react';
import './MovieList.css';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '..';

// custom components are styled with styled()
const MoviesContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
function MovieList({ movies, numberOfMovies }) {
  return (
    <MoviesContainer container className="moviesContainer">
      {movies.results.slice(0, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </MoviesContainer>
  );
}

export default MovieList;
