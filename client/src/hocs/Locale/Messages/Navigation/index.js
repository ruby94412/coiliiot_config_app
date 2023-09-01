import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.navigation';

export default defineMessages({
  logoutLabel: {
    id: `${scope}.logoutLabel`,
    defaultMessage: 'Logout',
  },
  logoutConfirmation: {
    id: `${scope}.logoutConfirmation`,
    defaultMessage: 'Please Confirm To Logout',
  },
  consoleText: {
    id: `${scope}.consoleText`,
    defaultMessage: 'Connect',
  },
  configText: {
    id: `${scope}.configText`,
    defaultMessage: 'Configure',
  },
  flashText: {
    id: `${scope}.flashText`,
    defaultMessage: 'Flash',
  },
  consoleConnected: {
    id: `${scope}.consoleConnected`,
    defaultMessage: 'Console Connected',
  },
  flashConnected: {
    id: `${scope}.flashConnected`,
    defaultMessage: 'Flash Connected',
  },
  noPortsConnected: {
    id: `${scope}.noPortsConnected`,
    defaultMessage: 'No Ports Connected',
  },
});
