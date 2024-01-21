import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.serial';

export default defineMessages({
  serialIdLabel: {
    id: `${scope}.serialIdLabel`,
    defaultMessage: 'Serial Channel',
  },
  statusLabel: {
    id: `${scope}.statusLabel`,
    defaultMessage: 'Status',
  },
  statusOptionEnable: {
    id: `${scope}.statusOptionEnable`,
    defaultMessage: 'Enable',
  },
  statusOptionDisable: {
    id: `${scope}.statusOptionDisable`,
    defaultMessage: 'Disable',
  },
  autoPollStatusLabel: {
    id: `${scope}.autoPollStatusLabel`,
    defaultMessage: 'Autopoll Status',
  },
  serialFields: {
    id: `${scope}.serialFields`,
    defaultMessage: 'Serial Fields',
  },
  autoPollFields: {
    id: `${scope}.autoPollFields`,
    defaultMessage: 'AutoPoll Fields',
  },
  commandLabel: {
    id: `${scope}.commandLabel`,
    defaultMessage: 'Command',
  },
  commandsIntervalLabel: {
    id: `${scope}.commandsIntervalLabel`,
    defaultMessage: 'Interval Between Commands',
  },
  commandHelperText: {
    id: `${scope}.commandHelperText`,
    defaultMessage: 'E.g: 01 04 00 00 00 01 31 CA',
  },
  commandGeneratorButton: {
    id: `${scope}.commandGeneratorButton`,
    defaultMessage: 'Add Command',
  },
});
