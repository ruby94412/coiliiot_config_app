import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  ButtonGroup,
  Button,
  LinearProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { connect } from 'react-redux';
import {
  HighlightOff,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { writeLocalData, downloadUpdate } from 'slice/data';
import { FormattedMessage, useIntl } from 'react-intl';
import ErrorModal from 'components/common/ErrorModal';
import messages from '../../hocs/Locale/Messages/Navigation/SettingDrawer';

function SettingDrawer({
  writeLocalData,
  toggleDrawer,
  isDrawerOpen,
  setThemeMode,
  setLocale,
  locale,
  themeMode,
  anchor,
  updateInfo,
  downloadUpdate,
}) {
  const [appSetting, setAppSetting] = useState({});
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [version, setVersion] = useState('');
  const [latest, setLatest] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const intl = useIntl();
  useEffect(() => {
    setAppSetting({ locale, mode: themeMode });
  }, [locale, themeMode]);
  const handleModeChange = (mode) => () => {
    setThemeMode(mode);
    writeLocalData({ data: { ...appSetting, mode }, fileName: 'appSetting' });
  };
  const handleLocaleChange = (locale) => () => {
    setLocale(locale);
    writeLocalData({ data: { ...appSetting, locale }, fileName: 'appSetting' });
  };
  const boxStyle = anchor === 'right' ? { width: 300 } : {};

  useEffect(() => {
    if (updateInfo?.type === 'progress') {
      setDownloadProgress(updateInfo.percent);
    }
    if (updateInfo?.type === 'info') {
      setLatest((prev) => (updateInfo?.version || prev));
      setVersion(updateInfo?.currentVersion?.version);
      setUpdateAvailable(updateInfo?.updateAvailable);
    }
    if (updateInfo?.type === 'downloaded') {
      setTimeout(() => {
        setDownloaded(true);
        setDownloading(false);
        setDownloadProgress(0);
      }, 2000);
    }
  }, [updateInfo]);

  const handleDownload = () => {
    setDownloading(true);
    downloadUpdate()
      .catch((err) => {
        setErrMsg(JSON.stringify(err));
      })
      .finally(() => {
        setTimeout(() => {
          setDownloading(false);
          setDownloadProgress(0);
        }, 2000);
      });
  };

  const renderDownload = () => (
    <>
      <LoadingButton
        loading={downloading}
        onClick={handleDownload}
        variant="contained"
        style={{ width: '100%' }}
      >
        <FormattedMessage {...messages.downloadUpdate} />
      </LoadingButton>
      {downloading && (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={downloadProgress} color="primary" />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="caption">
            {`${Math.round(downloadProgress)}%`}
          </Typography>
        </Box>
      </Box>
      )}
    </>
  );

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
        <Box sx={{ p: 2 }}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
          >
            <FormattedMessage {...messages.versionTitle} />
            {`  v${version}`}
          </Typography>
          <Typography
            color={updateAvailable && 'error'}
            variant="caption"
            display="block"
            gutterBottom
          >
            {
              updateAvailable
                ? `${intl.formatMessage(messages.updateReminderText)} (v${latest}${downloaded ? ` ${intl.formatMessage(messages.downloaded)}` : ''})`
                : intl.formatMessage(messages.upToDateText)
            }
          </Typography>
          {
            updateAvailable && !downloaded && renderDownload()
          }
          { downloaded && (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
            >
              <FormattedMessage {...messages.updateConfirmedText} />
            </Typography>
          )}
        </Box>
      </Box>
      <ErrorModal
        errorMessage={errMsg}
        isErrorModalOpen={!!errMsg}
        onClose={() => { setErrMsg(null); }}
      />
    </Drawer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  writeLocalData,
  downloadUpdate,
})(SettingDrawer);
