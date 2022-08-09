import React, { useState, createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

function ToogleColorMode({ children }) {
  const localStorageTheme = localStorage.getItem('theme') ?? 'light';
  const [mode, setMode] = useState(localStorageTheme);
  const toogleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toogleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToogleColorMode;
