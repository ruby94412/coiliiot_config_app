import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Connect/SerialMonitor';

function SerialMonitor({
  content,
}) {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Card sx={{ width: '60%' }}>
          <CardHeader subheader={<FormattedMessage {...messages.serialMonitorLabel} />} />
          <CardContent sx={{ maxHeight: '300px', minHeight: '200px' }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {content || (<FormattedMessage {...messages.notConnectedHint} />)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '60%' }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <FormattedMessage {...messages.applyConfigButton} />
          </Button>
          <Button variant="contained" sx={{ mr: 2 }}>
            <FormattedMessage {...messages.resetConfigButton} />
          </Button>
          <Button variant="contained">
            <FormattedMessage {...messages.restartConsoleButton} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SerialMonitor;
