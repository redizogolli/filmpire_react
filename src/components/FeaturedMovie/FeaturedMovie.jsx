import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

import './FeaturedMovie.css';

function FeaturedMovie({ movie }) {
  const theme = useTheme();

  if (!movie) {
    return null;
  }
  console.log(`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`);

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className="featuredCardContainer">
      <Card className="card" classes={{ root: 'cardRoot' }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          title={movie.title}
          className="cardMedia"
        />
        <Box padding="20px">
          <CardContent
            className="cardContent"
            classes={{ root: 'cardContentRoot' }}
            sx={{ [theme.breakpoints.down('sm')]: {
              width: '100%',
            } }}
          >
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
