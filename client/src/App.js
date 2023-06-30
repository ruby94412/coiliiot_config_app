import { connect } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import Connect from 'components/Connect';
import Config from 'components/Config';
import Navigation from 'components/Navigation';
import withTheme from 'hocs/Theme';
import withLocale from 'hocs/Locale';
import 'App.css';

function App({
  userInfo,
  setThemeMode,
  theme,
  setLocale,
  themeMode,
  locale,
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [<Connect />, <Config />];
  return (
    <div className="App" style={{ backgroundColor: theme.palette.darker.main }}>
      <Navigation
        setThemeMode={setThemeMode}
        setLocale={setLocale}
        locale={locale}
        themeMode={themeMode}
        setPageIndex={setPageIndex}
      />
      {pages[pageIndex]}
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
