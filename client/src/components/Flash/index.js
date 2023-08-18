import { useState } from 'react';
import { Button } from '@mui/material';
import ConnectOperation from 'components/Console/ConnectOperation';

function Flash() {
  const [connected, setConnected] = useState(false);
  return (
    <div>
      <ConnectOperation
        connected={connected}
        setConnected={setConnected}
        isFlash={true}
      />
      <Button>Connect</Button>
      <Button>Choose File</Button>
      <Button>Erase</Button>
      <Button>Program</Button>
      <Button>Reset</Button>
    </div>
  );
}

export default Flash;
