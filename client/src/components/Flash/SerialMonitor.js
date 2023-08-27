import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  GridRowModes,
} from '@mui/x-data-grid';
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
} from 'slice/data';
import { LoadingButton } from '@mui/lab';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/SerialMonitor';
import otherMessages from 'hocs/Locale/Messages/Flash/ConnectOperation';

const serialTextStyle = {
  fontSize: 14,
  whiteSpace: 'pre-line',
  lineHeight: '15px',
  fontFamily: 'Lucida Console, Courier, monospace',
};
function SerialMonitor({
  serialDataListener,
  espProps,
  setEspProps,
  fileArray,
  setFileArray,
  setRowModesModel,
}) {
  const boxStyle = {
    display: 'flex', alignItems: 'start', flexDirection: 'column',
  };

  const monitorStyle = {
    height: '200px', overflowY: 'scroll', py: 0, wordWrap: 'break-word',
  };
  const [logs, setLogs] = useState('');
  const logsEndRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [loadings, setLoadings] = useState({ erase: false, flash: false, add: false });

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const handleAddFile = () => {
    const id = Math.random().toString();
    setFileArray((oldRows) => [...oldRows, {
      id, address: '', data: '', file: null, status: 0, isNew: true,
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'address' },
    }));
  };

  const handleProgram = () => {
    const temp = fileArray.map((file) => ({ address: file.address, data: file.data }));
    console.log(temp);
  };

  const handleErase = async () => {
    setLoadings((pre) => ({ ...pre, erase: true }));
    try {
      await espProps.esploader.erase_flash();
      setSnackbar({
        children: <FormattedMessage {...otherMessages.snackBarSuccess} />, severity: 'success',
      });
    } catch (e) {
      setErrorMsg(e.message);
      setSnackbar({
        children: <FormattedMessage {...otherMessages.snackBarError} />, severity: 'error',
      });
    } finally {
      setTimeout(() => {
        setLoadings((pre) => ({ ...pre, erase: false }));
      }, 2000);
    }
  };
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ marginTop: '10px' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ width: '60%' }}
            justifyContent="flex-start"
          >
            <Grid item xs={3}>
              <Box sx={boxStyle}>
                <LoadingButton
                  variant="contained"
                  disabled={!espProps.device || (loadings.erase || loadings.flash || loadings.add)}
                  loading={loadings.apply}
                  sx={{ width: '80%', mb: 2 }}
                  onClick={handleAddFile}
                >
                  <FormattedMessage {...otherMessages.addButton} />
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  disabled={!espProps.device || (loadings.erase || loadings.flash || loadings.add)}
                  loading={loadings.flash}
                  sx={{ width: '80%', mb: 2 }}
                  onClick={handleProgram}
                >
                  <FormattedMessage {...otherMessages.flashButton} />
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  disabled={!espProps.device || (loadings.erase || loadings.flash || loadings.add)}
                  loading={loadings.reboot}
                  sx={{ width: '80%', mb: 2 }}
                  onClick={handleErase}
                >
                  <FormattedMessage {...otherMessages.eraseButton} />
                </LoadingButton>
                <Button
                  variant="contained"
                  onClick={handleClear}
                  sx={{ width: '80%', mb: 2 }}
                >
                  <FormattedMessage {...messages.clearLogsButton} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Card sx={{ width: '100%' }}>
                <CardHeader
                  subheader={(
                    <Typography sx={{ fontSize: 16 }} color={`text.${espProps.device ? 'primary' : 'secondary'}`}>
                      <FormattedMessage {...messages.serialMonitorLabel} />
                    </Typography>
                  )}
                />
                <CardContent sx={monitorStyle}>
                  <Typography
                    sx={serialTextStyle}
                    color={`text.${espProps.device ? 'primary' : 'secondary'}`}
                  >
                    {logs || <FormattedMessage {...messages.noLogsHint} />}
                  </Typography>
                  <div ref={logsEndRef} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
})(SerialMonitor);
