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
}) {
  const [port, setPort] = useState(null);
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    setDisable(port === null);
  }, [port]);
  const handlePortChange = (e) => {
    setPort(e.target.value);
  };
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <FormControl sx={{ width: '60%' }}>
          <FormLabel><FormattedMessage {...messages.portSelectLabel} /></FormLabel>
          <div style={{ display: 'flex' }}>
            <Select
              size="small"
              onChange={handlePortChange}
              value={port}
              sx={{ minWidth: '200px' }}
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
            <Button variant="contained" sx={{ minWidth: '75px' }} disabled={disable}>
              <FormattedMessage {...messages.connectButton} />
            </Button>
          </div>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ConnectOperation;
