import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Divider,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  serialPortsListener,
  connectPort,
  disconnectPort,
  emitConsoleConnect,
} from 'slice/data';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { LoadingButton } from '@mui/lab';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/ConnectOperation';

function ConnectOperation({
  connected,
  setConnected,
  connectPort,
  disconnectPort,
  serialPortsListener,
  emitConsoleConnect,
  connectionStatus,
}) {
  const [ports, setPorts] = useState([]);
  const [portPath, setPortPath] = useState('');
  const [disable, setDisable] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [connectLoading, setConnectLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [flsDscConfirming, setFlsDstConfirming] = useState(false);

  useEffect(() => {
    serialPortsListener((rawPorts) => {
      const temp = rawPorts?.map((rawPort) => (rawPort?.path || 'invalid port')) || [];
      setPorts(temp);
    });
  }, []);

  useEffect(() => {
    setDisable(portPath === '');
  }, [portPath]);

  useEffect(() => {
    const condition = connected && portPath && !ports.toString().includes(portPath);
    if (condition) {
      setPortPath('');
      setConnected(false);
    }
  }, [ports]);
  const handlePortPathChange = (e) => {
    setPortPath(e.target.value);
  };

  const handleConnect = () => {
    if (connectionStatus.isFlashConnected) {
      setFlsDstConfirming(true);
      return;
    }
    setConnectLoading(true);
    connectPort({ path: portPath }).then((res) => {
      if (res.error) {
        setErrorMsg(res.error.message);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
        });
      } else {
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
        });
        setConnected(true);
      }
    }).finally(() => {
      setConnectLoading(false);
    });
  };

  const handleDisconnect = () => {
    setConnectLoading(true);
    disconnectPort().then((res) => {
      if (res.error) {
        setErrorMsg(res.error.message);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarError} />, severity: 'error',
        });
      } else {
        setConnected(false);
        setSnackbar({
          children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success',
        });
      }
    }).finally(() => {
      setConnectLoading(false);
    });
  };

  const handleConnectOnClick = () => {
    if (connected) handleDisconnect();
    else handleConnect();
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  useEffect(() => {
    emitConsoleConnect({ isConsoleConnected: connected });
  }, [connected]);

  useEffect(() => {
    if (connectionStatus?.isConsoleDisconnectConfirmed) handleDisconnect();
  }, [connectionStatus]);

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <FormControl sx={{ width: '75%' }}>
            <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
            <div style={{ display: 'flex' }}>
              <Select
                size="small"
                onChange={handlePortPathChange}
                value={portPath}
                sx={{ minWidth: '300px' }}
                disabled={connected}
              >
                {
                  ports.map((option) => (
                    <MenuItem
                      key={option?.value || option}
                      value={option?.label ? option.value : option}
                    >
                      {option?.label || option}
                    </MenuItem>
                  ))
                }
              </Select>
              <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />
              <LoadingButton
                variant="contained"
                sx={{ minWidth: '75px' }}
                disabled={disable}
                onClick={handleConnectOnClick}
                loading={connectLoading}
              >
                {
                  connected
                    ? <FormattedMessage {...messages.disconnectButton} />
                    : <FormattedMessage {...messages.connectButton} />
                }
              </LoadingButton>
            </div>
          </FormControl>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage={errorMsg}
        onClose={() => { setErrorMsg(null); }}
        isErrorModalOpen={!!errorMsg}
      />
      <ConfirmDialog
        isOpen={flsDscConfirming}
        onClose={() => { setFlsDstConfirming(false); }}
        handleConfirmCb={() => {
          setFlsDstConfirming(false);
          emitConsoleConnect({ isFlashDisconnectConfirmed: true });
        }}
        content={<FormattedMessage {...messages.flashDisconnectConfirm} />}
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
  const { connectionStatus } = state.credentialAndConfig;
  return { connectionStatus };
};

export default connect(mapStateToProps, {
  serialPortsListener,
  connectPort,
  disconnectPort,
  emitConsoleConnect,
})(ConnectOperation);
