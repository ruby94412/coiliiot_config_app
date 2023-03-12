import {connect} from 'react-redux';
// import ControlPanel from './ components/ControlPanel';
import ConfigPanel from './components/ConfigPanel';
import Login from './components/Login';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
const theme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: 'rgb(78 70 212)',
    //   contrastText: 'white',
    // }
  }
});
const App = ({
  userInfo,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {userInfo?.isLoggedIn && <Route path="/mainPanel" element={<ConfigPanel />} />}
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  const {userInfo} = state;
  return {userInfo};
};
export default connect(mapStateToProps, {})(App);
