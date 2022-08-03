import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useGetMovieQuery } from '../../services/TMDB';

import './MovieInformation.css';

// Styled Components
const CustomGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px 0 !important',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));
const CustomPosterImage = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64,64,70)',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '100%',
    height: '350px',
    marginBottom: '30px',
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
    height: '350px',
  },
}));

function MovieInformation() {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery({ id });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Link to="/">
          Something went wrong. Click here to go back to the home page.
        </Link>
      </Box>
    );
  }
  console.log(data);
  return (
    <CustomGrid container className="containerSpaceAround">
      <Grid item sm={12} lg={4}>
        <CustomPosterImage className="poster" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <CustomGrid item className="containerSpaceAround">
          <Box display="flex" align="center">
            <Rating value={data?.vote_average / 2} readOnly />
            <Typography variant="subtitle1" align="center" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average.toFixed(2)} / 10
            </Typography>
          </Box>
        </CustomGrid>
        <Grid />
      </Grid>
    </CustomGrid>
  );
}

export default MovieInformation;
