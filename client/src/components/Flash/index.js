import { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import ConnectOperation from './ConnectOperation';
import SerialMonitor from './SerialMonitor';
import FileSelect from './FileSelect';

function Flash() {
  const [espProps, setEspProps] = useState({
    device: null,
    transport: null,
    chip: null,
    esploader: null,
  });
  const [fileArray, setFileArray] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <ConnectOperation espProps={espProps} setEspProps={setEspProps} />
      <Collapse in={fileArray.length > 0}>
        <FileSelect
          fileArray={fileArray}
          setFileArray={setFileArray}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
        />
      </Collapse>
      <SerialMonitor
        espProps={espProps}
        setEspProps={setEspProps}
        fileArray={fileArray}
        setFileArray={setFileArray}
        setRowModesModel={setRowModesModel}
      />
    </Box>
  );
}

export default Flash;
