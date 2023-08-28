import { useState } from 'react';
import { Box } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';
import FileSelect from './FileTable';

function Flash() {
  const [espProps, setEspProps] = useState({
    device: null,
    transport: null,
    chip: null,
    esploader: null,
  });
  const [fileArray, setFileArray] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [terminalData, setTerminalData] = useState('');
  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <ConnectOperation
        espProps={espProps}
        setEspProps={setEspProps}
        setTerminalData={setTerminalData}
      />
      <FileSelect
        espProps={espProps}
        fileArray={fileArray}
        setFileArray={setFileArray}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
      />
      <SerialMonitor
        espProps={espProps}
        terminalData={terminalData}
      />
    </Box>
  );
}

export default Flash;
