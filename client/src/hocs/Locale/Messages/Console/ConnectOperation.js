import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.console.connectOperation';

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
  timeout: {
    id: `${scope}.timeout`,
    defaultMessage: 'Connection Timeout',
  },
  flashDisconnectConfirm: {
    id: `${scope}.flashDisconnectConfirm`,
    defaultMessage: 'This port is connected in flash section, you need to confirm to disconnect the port in flash before open the connection here',
  },
  consoleDisconnectConfirm: {
    id: `${scope}.consoleDisconnectConfirm`,
    defaultMessage: 'This port is connected in console section, you need to confirm to disconnect the port in flash before open the connection here',
  },
});
