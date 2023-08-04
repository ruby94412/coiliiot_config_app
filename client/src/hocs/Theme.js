import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import dataService from 'services/dataService';

const withTheme = (Child) => function withThemeHook(props) {
  const [themeMode, setThemeMode] = useState('dark');
  useEffect(() => {
    dataService?.readLocalData({ fileName: 'appSetting' })
      ?.then((res) => {
        const setting = res || null;
        setThemeMode(setting?.mode || 'light');
      });
  }, []);
  const getTheme = () => createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'light' ? '#1d4998' : '#90caf9',
        spanColor: themeMode === 'light' ? '#000000de' : '#fff',
      },
      secondary: {
        main: '#ececeb',
      },
      darker: {
        main: themeMode === 'light' ? '#ececeb' : '#222a3a',
      },
    },
  });
  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    setTheme(getTheme());
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <Child {...props} setThemeMode={setThemeMode} theme={theme} themeMode={themeMode} />
    </ThemeProvider>
  );
};

export default withTheme;
