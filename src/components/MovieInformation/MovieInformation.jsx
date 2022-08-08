import React, { useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MovieList } from '..';

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
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
    display: 'flex',
    marginBottom: '30px',
    // height: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '100%',
    height: '350px',
    marginBottom: '30px',
  },
}));

const CustomButtonsControllerDiv = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: { flexDirection: 'column' },
}));

function MovieInformation() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery({ id });
  const { data: recomandations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });

  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

  // event handlers
  const addToFavorites = () => {
  };
  const addToWatchlist = () => {
  };

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

  return (
    <CustomGrid container className="containerSpaceAround">
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
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
          <Typography variant="h6" align="center" gutterBottom>
            {`${data?.runtime}min | Language: ${data?.spoken_languages[0].name}`}
          </Typography>
        </CustomGrid>
        <Grid />
        <Grid className="genresContainer">
          {data?.genres.map((genre, index) => (
            <Link
              className="genreLink"
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              key={index}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  padding: '0.5rem 1rem',
                } }}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="Logo"
                className="genreImage"
                height={30}
                style={{ filter: theme.palette.mode === 'dark' && 'invert(1)' }}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, index) => (
            character.profile_path && (
            <Grid key={index} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} className="castImage" />
              <Typography color="textPrimary" align="center">
                {character.name}
              </Typography>
              <Typography color="textSecondary" align="center">
                {character.character.split('/')[0]}
              </Typography>
            </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <CustomButtonsControllerDiv className="buttonsContainer">
            <Grid item xs={12} sm={6} className="buttonsContainer" sx={{ [theme.breakpoints.down('sm')]: { flexDirection: 'column' } }}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  WEBSITE
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                {data?.videos?.results?.length > 0 && (
                <Button onClick={() => { setOpen(true); }} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
                )}
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className="buttonsContainer" sx={{ [theme.breakpoints.down('sm')]: { flexDirection: 'column' } }}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'UnFavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </CustomButtonsControllerDiv>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You May Also Like
        </Typography>
        {recomandations
          ? <MovieList movies={recomandations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found</Box>}
      </Box>
      {data?.videos?.results?.length > 0 && (
      <Modal closeAfterTransition className="modal" open={open} onClose={() => { setOpen(false); }}>
        <iframe
          autoPlay
          className="video"
          frameBorder={0}
          title="trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow="autoplay"
          style={{ [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '90%',
          } }}
        />
      </Modal>
      )}
    </CustomGrid>
  );
}

export default MovieInformation;
