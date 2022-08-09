import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../../utils/ToogleColorMode';
import { fetchToken } from '../../utils';
import { unsetUser } from '../../features/auth';

const useAlanAI = () => {
  const { setMode } = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALANAI_SKD_KEY,
      onCommand: ({ command, mode }) => {
        if (command === 'changeMode') {
          console.log('Changing mode to: ', mode);
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          // clear the state
          dispatch(unsetUser());
          // redirect to home
          navigate('/');
        }
      },
    });
  }, []);
};

export default useAlanAI;
