import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  HighlightOff,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import messages from '../../hocs/Locale/Messages/Navigation/SettingDrawer';

function SettingDrawer({
  toggleDrawer,
  isDrawerOpen,
  setThemeMode,
  setLocale,
  locale,
  themeMode,
  anchor,
}) {
  const handleModeChange = (mode) => () => {
    setThemeMode(mode);
    localStorage.setItem('mode', mode);
  };
  const handleLocaleChange = (locale) => () => {
    setLocale(locale);
    localStorage.setItem('locale', locale);
  };
  const boxStyle = anchor === 'right' ? { width: 300 } : {};
  return (
    <Drawer
      anchor={anchor}
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box sx={boxStyle}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6"><FormattedMessage {...messages.settingTitle} /></Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            onClick={toggleDrawer(false)}
          >
            <HighlightOff />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="h8"><FormattedMessage {...messages.modeTitle} /></Typography>
          <ButtonGroup style={{ width: '100%', marginTop: '10px' }}>
            <Button
              startIcon={<LightMode />}
              style={{ width: '100%' }}
              onClick={handleModeChange('light')}
              variant={themeMode === 'light' ? 'contained' : 'outlined'}
            >
              <FormattedMessage {...messages.modeLight} />
            </Button>
            <Button
              startIcon={<DarkMode />}
              style={{ width: '100%' }}
              onClick={handleModeChange('dark')}
              variant={themeMode === 'dark' ? 'contained' : 'outlined'}
            >
              <FormattedMessage {...messages.modeDark} />
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h8"><FormattedMessage {...messages.languageTitle} /></Typography>
          <ButtonGroup style={{ width: '100%', marginTop: '10px' }}>
            <Button
              style={{ width: '100%' }}
              onClick={handleLocaleChange('zh')}
              variant={locale === 'zh' ? 'contained' : 'outlined'}
            >
              🇨🇳 中文
            </Button>
            <Button
              style={{ width: '100%' }}
              onClick={handleLocaleChange('en')}
              variant={locale === 'en' ? 'contained' : 'outlined'}
            >
              🇺🇸 English
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

    </Drawer>
  );
}

export default SettingDrawer;
