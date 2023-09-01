import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Box,
  Badge,
  Chip,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Terminal as TerminalIcon,
  Bolt as FlashIcon,
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
  connectionStatus,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElDrawer, setAnchorElDrawer] = useState('right');
  const [updateInfo, setUpdateInfo] = useState();

  useEffect(() => {
    updateListener((info) => {
      setUpdateInfo(info);
    });
  }, []);

  const renderChip = () => {
    if (connectionStatus?.isConsoleConnected) return (<Chip label={<FormattedMessage {...messages.consoleConnected} />} size="small" color="success" icon={<TerminalIcon />} />);
    if (connectionStatus?.isFlashConnected) return (<Chip label={<FormattedMessage {...messages.flashConnected} />} size="small" color="warning" icon={<FlashIcon />} />);
    return (<Chip label={<FormattedMessage {...messages.noPortsConnected} />} sx={{ backgroundColor: '#626363', color: 'white' }} size="small" />);
  };

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
              {renderChip()}
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

const mapStateToProps = (state) => {
  const { connectionStatus } = state.credentialAndConfig;
  return { connectionStatus };
};
export default connect(mapStateToProps, {
  updateListener,
})(Navigation);
