import { useState } from 'react';
import { Box } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';
import FileSelect from './FileTable';
import UpdateFirmware from './UpdateFirmware';

function Flash() {
  const [espProps, setEspProps] = useState({
    device: null,
    transport: null,
    chip: null,
    esploader: null,
    version: '',
  });
  const [fileArray, setFileArray] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [terminalData, setTerminalData] = useState('');
  const [expanded, setExpanded] = useState('auto');
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <ConnectOperation
        espProps={espProps}
        setEspProps={setEspProps}
        setTerminalData={setTerminalData}
      />
      <UpdateFirmware
        expanded={expanded}
        handleExpandChange={handleExpandChange}
        espProps={espProps}
      />
      <FileSelect
        expanded={expanded}
        handleExpandChange={handleExpandChange}
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
