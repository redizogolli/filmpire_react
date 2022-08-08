import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { searchMovie } from '../../features/currentGenreOrCategory';
import './Search.css';

// custom styling
const CustomDivContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const CustomInput = styled(TextField)(({ theme }) => ({
  color: theme.palette.mode === 'light' && 'black',
  filter: theme.palette.mode === 'light' && 'invert(1)',
  [theme.breakpoints.down('sm')]: {
    marginTop: '-10px',
    marginBottom: '10px',
  },
}));

function Search() {
  const { searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();
  const [query, setQuery] = useState(searchQuery);

  // update query in store when user changes input
  useEffect(
    () => {
      setQuery(searchQuery);
    },
    [searchQuery],
  );
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <CustomDivContainer className="searchContainer">
      <CustomInput
        onKeyPress={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </CustomDivContainer>
  );
}

export default Search;
