import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Movie.css';
import { Link } from 'react-router-dom';

function Movie({ movie, index }) {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="movie">
      <Grow in key={index} timeout={(index + 1) * 250}>
        <Link className="movie__links" to={`/movie/${movie.id}`} sx={{ [theme.breakpoints.up('xs')]: { display: 'flex', flexDirection: 'column' } }}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://fillmurray.com/200/300'
            }
            alt={movie.title}
            className="movie__image"
          />
          <Typography
            className="movie__title"
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              textOverflow: 'ellipsis',
              width: '230px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginTop: '10px',
              marginBottom: 0,
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip title={`${movie.vote_average}/10`} disableTouchListener>
            <div className="movie__ratingContainer">
              <Rating readOnly value={movie.vote_average / 2} size="small" precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
