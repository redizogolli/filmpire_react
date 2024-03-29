import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
const tmdbBaseUrl = process.env.REACT_APP_TMDB_BASE_URL;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: tmdbBaseUrl,
  }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get movies by search
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }
        // Get movies by category | popular | top_rated | upcoming
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }
        // Get movies by genres
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&api_key=${tmdbApiKey}&page=${page}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // Get Movie Details
    getMovie: builder.query({
      query: ({ id }) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    // Get user specific lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
    // Get recommendations
    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
    // Get Actor Details
    getActor: builder.query({
      query: ({ id }) => `person/${id}?api_key=${tmdbApiKey}`,
    }),
    // Get Actor Movies
    getActorMovies: builder.query({
      query: ({ id, page }) => `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorMoviesQuery,
  useGetListQuery,
} = tmdbApi;
