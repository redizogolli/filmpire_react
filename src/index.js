import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import ToogleColorModeProvider from './utils/ToogleColorMode';
import App from './components/App';
import store from './app/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToogleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToogleColorModeProvider>
  </Provider>,
);
