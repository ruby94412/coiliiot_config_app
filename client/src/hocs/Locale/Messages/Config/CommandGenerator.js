import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.commandGenerator';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Command Generator',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  enableJson: {
    id: `${scope}.enableJson`,
    defaultMessage: 'Convert To Json',
  },
  enable: {
    id: `${scope}.enable`,
    defaultMessage: 'Enable',
  },
  disable: {
    id: `${scope}.disable`,
    defaultMessage: 'Disable',
  },
  commandDetail: {
    id: `${scope}.commandDetail`,
    defaultMessage: 'Command Detail',
  },
  convertDetail: {
    id: `${scope}.convertDetail`,
    defaultMessage: 'Convert Detail',
  },
  networkIdLabel: {
    id: `${scope}.networkIdLabel`,
    defaultMessage: 'Network Channel ID',
  },
});
