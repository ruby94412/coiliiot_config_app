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
  Button,
} from '@mui/material';
import {
  flashConnect,
  serialPortsListener,
} from 'slice/data';
import { LoadingButton } from '@mui/lab';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Console/ConnectOperation';

function Flash({
  flashConnect,
  serialPortsListener,
}) {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [connected, setConnected] = useState(false);
  const [disable, setDisable] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  useEffect(() => {
    serialPortsListener((rawPorts) => {
      setPorts(rawPorts);
    });
  }, []);

  useEffect(() => {
    const condition = connected
      && selectedPort
      && !ports.includes((p) => (p.path === selectedPort.path));
    if (condition) {
      setSelectedPort('');
      setConnected(false);
    }
  }, [ports]);
  useEffect(() => {
    setDisable(selectedPort === '');
  }, [selectedPort]);
  const handleConnect = () => {
    const { vendorId, productId, path } = selectedPort;
    console.log(vendorId, productId);
    setConnectLoading(true);
    flashConnect({ vendorId, productId, path }).then((res) => {
      if (res.error) {
        console.log('failure');
      } else {
        console.log('success');
      }
    }).finally(() => {
      setConnectLoading(false);
    });
  };
  const handlePortPathChange = (e) => {
    setSelectedPort(ports.find((port) => (port.path === e.target.value)));
  };
  return (
    <div>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <FormControl sx={{ width: '60%' }}>
            <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
            <div style={{ display: 'flex' }}>
              <Select
                size="small"
                onChange={handlePortPathChange}
                value={selectedPort?.path || ''}
                sx={{ minWidth: '300px' }}
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
              <LoadingButton
                variant="contained"
                sx={{ minWidth: '75px' }}
                disabled={disable}
                onClick={handleConnect}
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
      <Button onClick={handleConnect}>Connect</Button>
      <Button>Choose File</Button>
      <Button>Erase</Button>
      <Button>Program</Button>
      <Button>Reset</Button>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  flashConnect,
  serialPortsListener,
})(Flash);
