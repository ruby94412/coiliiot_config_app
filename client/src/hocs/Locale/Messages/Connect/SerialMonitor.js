import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.connect.serialMonitor';

export default defineMessages({
  serialMonitorLabel: {
    id: `${scope}.serialMonitorLabel`,
    defaultMessage: 'Serial Monitor',
  },
  applyConfigButton: {
    id: `${scope}.applyConfigButton`,
    defaultMessage: 'Apply Config',
  },
  resetConfigButton: {
    id: `${scope}.resetConfigButton`,
    defaultMessage: 'Reset Config',
  },
  restartConsoleButton: {
    id: `${scope}.restartConsoleButton`,
    defaultMessage: 'Restart Console',
  },
  notConnectedHint: {
    id: `${scope}.notConnectedHint`,
    defaultMessage: 'No Device Connected Yet, No logs',
  },
});
