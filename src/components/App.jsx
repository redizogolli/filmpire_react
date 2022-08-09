import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Profile, Navbar, Movies, ProtectedRoute } from './index';
import useAlanAI from './AlanAI/AlanAI';
import './App.css';

function App() {
  const alanBtnContainer = useRef();

  useAlanAI();

  return (
    <div className="root">
      <CssBaseline />
      <Navbar />
      <main className="content">
        <div className="toolbar" />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/profile/:id" element={(<Profile />)} />
          </Route>
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<Actors />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
