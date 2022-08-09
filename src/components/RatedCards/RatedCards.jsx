import React from 'react';
import { Typography, Box } from '@mui/material';
import { Movie } from '..';

import './RatedCards.css';

function RatedCards({ title, data }) {
  return (
    <Box className="rated-cards">
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" className="container">
        {data?.results.map((movie, index) => (
          <Movie key={movie.id} movie={movie} index={index} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
