import { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Divider,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Connect/ConnectOperation';

function ConnectOperation({
  ports,
  connectPort,
}) {
  const [portPath, setPortPath] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(portPath === '');
  }, [portPath]);

  const handlePortPathChange = (e) => {
    setPortPath(e.target.value);
  };

  const handleConnect = () => {
    console.log(connectPort);

    connectPort({ path: portPath }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <FormControl sx={{ width: '60%' }}>
          <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
          <div style={{ display: 'flex' }}>
            <Select
              size="small"
              onChange={handlePortPathChange}
              value={portPath}
              sx={{ minWidth: '300px' }}
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
            <Button
              variant="contained"
              sx={{ minWidth: '75px' }}
              disabled={disable}
              onClick={handleConnect}
            >
              <FormattedMessage {...messages.connectButton} />
            </Button>
          </div>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ConnectOperation;
