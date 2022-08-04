import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MovieList, Pagination } from '..';
import { useGetMoviesQuery } from '../../services/TMDB';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const changePage = (event, value) => {
    setPage(value);
  };

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
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages > 500 ? 500 : data.total_pages} />
      {/* <Pagination count={data.total_pages > 500 ? 500 : data.total_pages} page={page} onChange={changePage} /> */}
    </div>
  );
}

export default Movies;
