import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Divider,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
  Box,
  Grid,
} from '@mui/material';
import {
  flashConnect,
  serialPortsListener,
} from 'slice/data';
import { LoadingButton } from '@mui/lab';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/ConnectOperation';
import { ESPLoader, Transport } from 'esptool-js';

function ConnectOperation({
  serialPortsListener,
  espProps,
  setEspProps,
}) {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [connected, setConnected] = useState(false);
  const [disable, setDisable] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    serialPortsListener((rawPorts) => {
      setPorts(rawPorts);
    });
  }, []);

  useEffect(() => {
    const condition = connected
      && selectedPort
      && !ports.find((p) => (p.path === selectedPort.path));
    if (condition) {
      setSelectedPort('');
      setConnected(false);
    }
  }, [ports]);

  useEffect(() => {
    setDisable(selectedPort === null);
  }, [selectedPort]);

  const espLoaderTerminal = {
    clean() {

    },
    writeLine(data) {
      console.log(data);
    },
    write(data) {
      console.log(data);
    },
  };

  const handleConnect = async () => {
    const filters = [{
      usbVendorId: parseInt(selectedPort.vendorId, 16),
      usbProductId: parseInt(selectedPort.productId, 16),
    }];
    setConnectLoading(true);
    const device = await navigator.serial.requestPort({ filters });
    const transport = new Transport(device);
    try {
      const esploader = new ESPLoader({
        transport,
        baudrate: 115200,
        terminal: espLoaderTerminal,
      });
      const chip = await esploader.main_fn();
      setEspProps({
        device, esploader, transport, chip,
      });
      setConnected(true);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setConnectLoading(false);
    }
  };

  const clearUp = () => {
    setEspProps({
      device: null, esploader: null, transport: null, chip: null,
    });
  };

  const handleDisconnect = async () => {
    if (espProps.transport) {
      try {
        setConnectLoading(true);
        await espProps.transport.disconnect();
        setConnected(false);
        clearUp();
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setConnectLoading(false);
      }
    } else setConnected(false);
  };

  const handlePortPathChange = (e) => {
    setSelectedPort(ports.find((port) => (port.path === e.target.value)));
  };

  const handleConnectOnClick = () => {
    if (connected) handleDisconnect();
    else handleConnect();
  };
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ marginBottom: '10px' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ width: '60%' }}
            justifyContent="flex-start"
          >
            <Grid item xs={6}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
                <div style={{ display: 'flex' }}>
                  <Select
                    size="small"
                    onChange={handlePortPathChange}
                    value={selectedPort?.path || ''}
                    sx={{ width: '100%' }}
                    disabled={connected}
                  >
                    {
                      ports.map((port) => (
                        <MenuItem
                          key={port.path}
                          value={port.path}
                        >
                          {port.path}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end' }}>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage={errorMsg}
        onClose={() => { setErrorMsg(null); }}
        isErrorModalOpen={!!errorMsg}
      />
    </>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  flashConnect,
  serialPortsListener,
})(ConnectOperation);
