import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import { Typography, Button } from '@mui/material';

import './Pagination.css';

function Pagination({ currentPage, setPage, totalPages }) {
  if (totalPages === 0) { return null; }

  const theme = useTheme();

  // event handlers
  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="pagination">
      <Button onClick={handlePrev} className="pagination__button" variant="contained" color="primary" type="button" disabled={currentPage === 1}>Prev</Button>
      <Typography variant="h4" className="pagination_pageNumber" style={{ color: theme.palette.text.primary }}>{currentPage}</Typography>
      <Button onClick={handleNext} className="pagination__button" variant="contained" color="primary" type="button" disabled={currentPage === totalPages}>Next</Button>
    </div>
  );
}

export default Pagination;
