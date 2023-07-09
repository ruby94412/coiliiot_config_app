import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  readLocalData,
  writeLocalData,
  serialPortsListener,
  connectPort,
} from 'slice/data';
import { Button, Box, Grid } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';

const testPorts = ['port1', 'port2'];
const testContent = '';

function Connect({
  serialPortsListener,
  connectPort,
}) {
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    serialPortsListener((rawPorts) => {
      const temp = rawPorts?.map((rawPort) => (rawPort?.path || 'invalid port')) || [];
      setPorts(temp);
    });
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <ConnectOperation ports={ports} connectPort={connectPort} />
      <SerialMonitor content={testContent} />
    </Box>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  serialPortsListener,
  connectPort,
})(Connect);
