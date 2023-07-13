import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Collapse } from '@mui/material';
import Logo from 'components/common/LogoWithAnimation';
import Connect from 'components/Connect';
import Config from 'components/Config';
import Navigation from 'components/Navigation';
import withTheme from 'hocs/Theme';
import withLocale from 'hocs/Locale';
import 'App.css';

function MainContent({
  setThemeMode,
  setLocale,
  themeMode,
  locale,
}) {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <>
      <Navigation
        setThemeMode={setThemeMode}
        setLocale={setLocale}
        locale={locale}
        themeMode={themeMode}
        setPageIndex={setPageIndex}
      />
      <Collapse in={pageIndex === 0} sx={{ width: '100%' }}>
        <Connect />
      </Collapse>
      <Collapse in={pageIndex === 1} sx={{ width: '100%' }}>
        <Config />
      </Collapse>
    </>
  );
}

function App({
  setThemeMode,
  theme,
  setLocale,
  themeMode,
  locale,
}) {
  const contentStyle = {
    backgroundColor: theme.palette.darker.main,
    color: theme.palette.primary.spanColor,
  };
  const [logoIn, setLogoIn] = useState(true);
  const mainContentProps = {
    setThemeMode,
    setLocale,
    themeMode,
    locale,
  };
  useEffect(() => {
    setTimeout(() => {
      setLogoIn(false);
    }, 4000);
  }, []);

  return (
    <div className="App" style={contentStyle}>
      <Collapse in={logoIn} sx={{ width: '100%' }}><Logo theme={theme} themeMode={themeMode} /></Collapse>
      <Collapse in={!logoIn} sx={{ width: '100%' }}><MainContent {...mainContentProps} /></Collapse>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {},
)(
  withLocale(withTheme(App)),
);
