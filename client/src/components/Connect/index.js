import { useState } from 'react';
import { Box } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';

function Connect() {
  const [connected, setConnected] = useState(false);
  return (
    <Box sx={{ width: '100%' }}>
      <ConnectOperation
        connected={connected}
        setConnected={setConnected}
      />
      <SerialMonitor connected={connected} />
    </Box>
  );
}

export default Connect;
