import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.console.serialMonitor';

export default defineMessages({
  serialMonitorLabel: {
    id: `${scope}.serialMonitorLabel`,
    defaultMessage: 'Serial Monitor',
  },
  readConfigButton: {
    id: `${scope}.readConfigButton`,
    defaultMessage: 'Read Config',
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
  readConfigSuccess: {
    id: `${scope}.readConfigSuccess`,
    defaultMessage: 'Read Configuration From Device Successfully, Click Import To Apply Data To [Conguration] Section',
  },
  readConfigFailure: {
    id: `${scope}.readConfigFailure`,
    defaultMessage: 'Failed To Read Valid Configuration',
  },
  importButton: {
    id: `${scope}.importButton`,
    defaultMessage: 'Import',
  },
  configData: {
    id: `${scope}.configData`,
    defaultMessage: 'Configuration Data',
  },
});
