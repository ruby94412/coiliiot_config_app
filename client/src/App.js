import { connect } from 'react-redux';
import { useState } from 'react';
import { Collapse } from '@mui/material';
import Connect from 'components/Connect';
import Config from 'components/Config';
import Navigation from 'components/Navigation';
import withTheme from 'hocs/Theme';
import withLocale from 'hocs/Locale';
import 'App.css';

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
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <div className="App" style={contentStyle}>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};

export default connect(
  mapStateToProps,
  {},
)(
  withLocale(withTheme(App)),
);
