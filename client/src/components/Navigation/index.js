import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Box,
  Badge,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { updateListener } from 'slice/data';
import { FormattedMessage } from 'react-intl';
import Logo from 'components/common/Logo';
import messages from 'hocs/Locale/Messages/Navigation';
import SettingDrawer from './SettingDrawer';

function Navigation({
  setThemeMode,
  setLocale,
  locale,
  themeMode,
  setPageIndex,
  updateListener,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElDrawer, setAnchorElDrawer] = useState('right');
  const [updateInfo, setUpdateInfo] = useState();

  useEffect(() => {
    updateListener((info) => {
      setUpdateInfo(info);
    });
  }, []);
  const toggleDrawer = (open, anchor = '') => (event) => {
    if (anchor) setAnchorElDrawer(anchor);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => { setPageIndex(0); }}
              >
                <ListItemText primary={<FormattedMessage {...messages.configText} />} />
              </ListItemButton>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => { setPageIndex(1); }}
              >
                <ListItemText primary={<FormattedMessage {...messages.consoleText} />} />
              </ListItemButton>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => { setPageIndex(2); }}
              >
                <ListItemText primary={<FormattedMessage {...messages.flashText} />} />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(true, 'right')}
            >
              <Badge color="error" variant="dot" invisible={!updateInfo?.updateAvailable}>
                <SettingsIcon />
              </Badge>
            </IconButton>
          </Box>
          <SettingDrawer
            anchor={anchorElDrawer}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            setThemeMode={setThemeMode}
            setLocale={setLocale}
            locale={locale}
            themeMode={themeMode}
            updateInfo={updateInfo}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
  updateListener,
})(Navigation);
