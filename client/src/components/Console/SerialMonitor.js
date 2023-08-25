import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  serialDataListener,
  sendMsgToPort,
  restartPort,
} from 'slice/data';
import { LoadingButton } from '@mui/lab';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/SerialMonitor';
import otherMessages from 'hocs/Locale/Messages/Console/ConnectOperation';

const serialTextStyle = {
  fontSize: 14,
  whiteSpace: 'pre-line',
  lineHeight: '15px',
  fontFamily: 'Lucida Console, Courier, monospace',
};
function SerialMonitor({
  credential,
  config,
  connected,
  serialDataListener,
  sendMsgToPort,
  restartPort,
}) {
  const [logs, setLogs] = useState('');
  const logsEndRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [loadings, setLoadings] = useState({ apply: false, reset: false, reboot: false });

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const monitorStyle = {
    height: '300px', overflowY: 'scroll', py: 0, wordWrap: 'break-word',
  };

  useEffect(() => {
    serialDataListener((data) => {
      setLogs((pre) => (`${pre}${pre ? '\n' : ''}${data}`));
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleClear = () => {
    setLogs('');
  };

  const handleApply = () => {
    setLoadings((pre) => ({ ...pre, apply: true }));
    sendMsgToPort({ type: 1, data: { config, credential } })
      .then((res) => {
        const err = res.error;
        if (err) {
          setErrorMsg(err.error.message);
          setSnackbar({
            children: <FormattedMessage {...otherMessages.snackBarError} />, severity: 'error',
          });
        } else {
          setSnackbar({
            children: <FormattedMessage {...otherMessages.snackBarSuccess} />, severity: 'success',
          });
        }
      }).finally(() => {
        setTimeout(() => {
          setLoadings((pre) => ({ ...pre, apply: false }));
        }, 2000);
      });
  };

  const handleReset = () => {
    setLoadings((pre) => ({ ...pre, reset: true }));
    sendMsgToPort({ type: 2 })
      .then((res) => {
        const err = res.error;
        if (err) {
          setErrorMsg(err.error.message);
          setSnackbar({
            children: <FormattedMessage {...otherMessages.snackBarError} />, severity: 'error',
          });
        } else {
          setSnackbar({
            children: <FormattedMessage {...otherMessages.snackBarSuccess} />, severity: 'success',
          });
        }
      }).finally(() => {
        setTimeout(() => {
          setLoadings((pre) => ({ ...pre, reset: false }));
        }, 2000);
      });
  };

  const handleReboot = () => {
    setLoadings((pre) => ({ ...pre, reboot: true }));
    restartPort().then((res) => {
      if (res.error) {
        setErrorMsg(res.error.message);
        setSnackbar({
          children: <FormattedMessage {...otherMessages.snackBarError} />, severity: 'error',
        });
      } else {
        setSnackbar({
          children: <FormattedMessage {...otherMessages.snackBarSuccess} />, severity: 'success',
        });
      }
    }).finally(() => {
      setTimeout(() => {
        setLoadings((pre) => ({ ...pre, reboot: false }));
      }, 2000);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Card sx={{ width: '60%' }}>
            <CardHeader
              subheader={(
                <Typography sx={{ fontSize: 16 }} color={`text.${connected ? 'primary' : 'secondary'}`}>
                  <FormattedMessage {...messages.serialMonitorLabel} />
                </Typography>
              )}
            />
            <CardContent sx={monitorStyle}>
              <Typography
                sx={serialTextStyle}
                color={`text.${connected ? 'primary' : 'secondary'}`}
              >
                {logs || <FormattedMessage {...messages.noLogsHint} />}
              </Typography>
              <div ref={logsEndRef} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '60%' }}>
            <LoadingButton
              variant="contained"
              sx={{ mr: 2 }}
              disabled={!connected || (loadings.apply || loadings.reboot || loadings.reset)}
              onClick={handleApply}
              loading={loadings.apply}
            >
              <FormattedMessage {...messages.applyConfigButton} />
            </LoadingButton>
            <LoadingButton
              variant="contained"
              sx={{ mr: 2 }}
              disabled={!connected || (loadings.apply || loadings.reboot || loadings.reset)}
              onClick={handleReset}
              loading={loadings.reset}
            >
              <FormattedMessage {...messages.resetConfigButton} />
            </LoadingButton>
            <LoadingButton
              variant="contained"
              sx={{ mr: 2 }}
              disabled={!connected || (loadings.apply || loadings.reboot || loadings.reset)}
              onClick={handleReboot}
              loading={loadings.reboot}
            >
              <FormattedMessage {...messages.restartConsoleButton} />
            </LoadingButton>
            <Button variant="contained" onClick={handleClear}>
              <FormattedMessage {...messages.clearLogsButton} />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage={errorMsg}
        onClose={() => { setErrorMsg(null); }}
        isErrorModalOpen={!!errorMsg}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { credential, ...other } = state.credentialAndConfig;
  return { credential, config: other };
};

export default connect(mapStateToProps, {
  serialDataListener,
  sendMsgToPort,
  restartPort,
})(SerialMonitor);
