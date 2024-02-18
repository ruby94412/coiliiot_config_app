import {
  Box,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  Button,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  CardContent,
  CardActions,
} from 'components/common/StyledCard';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import {
  openExternalLink,
  downloadFirmware,
  fetchLatestFirmwareInfo,
  firmwareDownloadListener,
  getFlashingFile,
} from 'slice/data';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/Flash/UpdateFirmware';
import ErrorModal from 'components/common/ErrorModal';
import CryptoJS from 'crypto-js';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
function niceBytes(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) n /= 1024;
  return (`${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`);
}

function UpdateFirmware({
  expanded,
  handleExpandChange,
  openExternalLink,
  downloadFirmware,
  fetchLatestFirmwareInfo,
  firmwareDownloadListener,
  latestFirmware,
  espProps,
  getFlashingFile,
}) {
  const intl = useIntl();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [flashProgress, setFlashProgress] = useState(0);
  const [snackbar, setSnackbar] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [enables, setEnables] = useState({
    downloaded: false,
    install: false,
    downloadAndInstall: false,
  });

  const [loadings, setLoadings] = useState({
    download: false,
    install: false,
  });

  useEffect(() => {
    firmwareDownloadListener((data) => {
      setDownloadProgress((data?.percentage || 0) / 2);
    });
  }, []);

  useEffect(() => {
    fetchLatestFirmwareInfo();
  }, []);

  useEffect(() => {
    if (espProps?.version) {
      if (latestFirmware.name === espProps.version) {
        setEnables({ install: false, downloaded: false, downloadAndInstall: false });
      } else if (latestFirmware.downloaded) {
        setEnables({ install: true, downloaded: true, downloadAndInstall: false });
      } else {
        setEnables({ install: false, downloaded: false, downloadAndInstall: true });
      }
    } else {
      setEnables({ install: false, downloaded: false, downloadAndInstall: false });
    }
  }, [espProps]);

  const renderSumText = (eP, lF) => {
    if (eP?.version) {
      const { version } = eP;
      if (version === lF.name) return (` ${intl.formatMessage(messages.upToDate)}`);
      return (` ${intl.formatMessage(messages.currentVersion)}: ${version}`);
    }
    return ('');
  };

  const openLink = () => {
    if (latestFirmware) {
      openExternalLink({ url: latestFirmware.html_url });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const handleFlash = async () => {
    if (enables.install) {
      setLoadings((pre) => ({ ...pre, install: true }));
    }
    try {
      const data = await getFlashingFile({ version: latestFirmware?.name });
      const arr = [{ address: 0x10000, data: data.payload }];
      try {
        const flashOptions = {
          fileArray: arr,
          flashSize: 'keep',
          eraseAll: false,
          compress: true,
          reportProgress: (fileIndex, written, total) => {
            const f = (written / total) * 100;
            setFlashProgress(((f + downloadProgress) * 100) / (100 + downloadProgress));
          },
          calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image)),
        };
        await espProps.esploader.write_flash(flashOptions);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
        });
      } catch (e) {
        setErrorMsg(e.message);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
        });
      }
    } catch (e) {
      setErrorMsg(e);
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
      });
    }
    setFlashProgress(0);
    if (enables.install) {
      setLoadings((pre) => ({ ...pre, install: false }));
    }
    setEnables({
      downloaded: false,
      install: false,
      downloadAndInstall: false,
    });
  };

  const handleDownload = async () => {
    setLoadings({ ...loadings, download: true });
    try {
      await downloadFirmware(latestFirmware.file);
      await handleFlash();
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
      });
    } catch (e) {
      setSnackbar({
        children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
      });
    }
    setLoadings({ ...loadings, download: false });
    setDownloadProgress(0);
  };

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ width: '75%' }}
            justifyContent="flex-start"
          >
            <Grid item xs={12}>
              <Accordion
                expanded={expanded === 'auto'}
                onChange={handleExpandChange('auto')}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <FormattedMessage {...messages.autoHeader} />
                  </Typography>
                  <Box flexGrow={1} />
                  <Typography color="text.secondary" align="center">
                    { renderSumText(espProps, latestFirmware) }
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  { latestFirmware && (
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <FormattedMessage {...messages.latestVersionLabel} />
                        {enables.downloaded && (
                          ` (${intl.formatMessage(messages.downloaded)})`
                        )}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {latestFirmware?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {niceBytes(latestFirmware?.file?.size)}
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                        Coiliiot LLC
                      </Typography>
                      <Typography variant="body2">
                        {latestFirmware?.body}
                      </Typography>
                      <Typography sx={{ mt: 1.5, fontSize: 14 }} color="text.secondary">
                        {latestFirmware?.publishedAt?.split('T')[0]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={openLink} variant="contained">
                        <FormattedMessage {...messages.learnMore} />
                      </Button>
                      {enables.downloadAndInstall && (
                        <LoadingButton
                          size="small"
                          onClick={handleDownload}
                          variant="contained"
                          loading={loadings.download}
                          loadingIndicator={<CircularProgress variant="determinate" color="primary" value={downloadProgress} size={16} />}
                        >
                          <FormattedMessage {...messages.downloadAndInstall} />
                        </LoadingButton>
                      )}
                      {enables.install && (
                        <LoadingButton
                          size="small"
                          onClick={handleFlash}
                          variant="contained"
                          loading={loadings.install}
                          loadingIndicator={<CircularProgress variant="determinate" color="primary" value={flashProgress} size={16} />}
                        >
                          <FormattedMessage {...messages.install} />
                        </LoadingButton>
                      )}
                    </CardActions>
                  </Card>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {!!snackbar && (
      <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
        <Alert {...snackbar} onClose={handleCloseSnackbar} />
      </Snackbar>
      )}
      <ErrorModal
        errorMessage={errorMsg}
        onClose={() => { setErrorMsg(null); }}
        isErrorModalOpen={!!errorMsg}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  const { latestFirmware } = state.credentialAndConfig;
  return { latestFirmware };
};

export default connect(mapStateToProps, {
  openExternalLink,
  downloadFirmware,
  fetchLatestFirmwareInfo,
  firmwareDownloadListener,
  getFlashingFile,
})(UpdateFirmware);
