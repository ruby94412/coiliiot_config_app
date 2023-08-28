import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
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
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/SerialMonitor';

const serialTextStyle = {
  fontSize: 14,
  whiteSpace: 'pre-line',
  lineHeight: '15px',
  fontFamily: 'Lucida Console, Courier, monospace',
};
function SerialMonitor({
  espProps,
  terminalData,
}) {
  const monitorStyle = {
    height: '150px', overflowY: 'scroll', py: 0, wordWrap: 'break-word',
  };
  const [logs, setLogs] = useState('');
  const logsEndRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setLogs((pre) => (`${pre}${pre && terminalData?.switchLine ? '\n' : ''}${terminalData?.data || ''}`));
  }, [terminalData]);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleClear = () => {
    setLogs('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
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
            <Grid item xs={12}>
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
