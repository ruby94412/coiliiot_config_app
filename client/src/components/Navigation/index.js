import { useState } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  // Container,
  // Avatar,
  // Button,
  // Tooltip,
  // Drawer,
} from '@mui/material';
import {
  Settings as SettingsIcon,
} from '@mui/icons-material';
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
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElDrawer, setAnchorElDrawer] = useState('right');

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
                <ListItemText primary={<FormattedMessage {...messages.connectText} />} />
              </ListItemButton>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => { setPageIndex(1); }}
              >
                <ListItemText primary={<FormattedMessage {...messages.configText} />} />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(true, 'right')}
            >
              <SettingsIcon />
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
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {})(Navigation);
