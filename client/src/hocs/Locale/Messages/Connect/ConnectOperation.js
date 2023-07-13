import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.connect.connectOperation';

export default defineMessages({
  portSelectLabel: {
    id: `${scope}.portSelectLabel`,
    defaultMessage: 'Port',
  },
  connectButton: {
    id: `${scope}.connectButton`,
    defaultMessage: 'Connect',
  },
  disconnectButton: {
    id: `${scope}.disconnectButton`,
    defaultMessage: 'Disconnect',
  },
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Operation Success',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Operation Error',
  },
});
