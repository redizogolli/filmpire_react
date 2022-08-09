import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../../utils/ToogleColorMode';

const useAlanAI = () => {
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALANAI_SKD_KEY,
      onCommand: ({ command, mode }) => {
        console.log('Command', command);
        if (command === 'changeMode') {
          console.log('Changing mode to: ', mode);
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        }
      },
    });
  }, []);
};

export default useAlanAI;
