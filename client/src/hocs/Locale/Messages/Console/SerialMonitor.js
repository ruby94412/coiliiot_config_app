import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.console.serialMonitor';

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
  clearLogsButton: {
    id: `${scope}.clearLogsButton`,
    defaultMessage: 'Clear Logs',
  },
  noLogsHint: {
    id: `${scope}.noLogsHint`,
    defaultMessage: 'No Device Connected Yet, No logs',
  },
});
