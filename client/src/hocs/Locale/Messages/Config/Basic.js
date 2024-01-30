import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.basic';

export default defineMessages({
  wifiDivider: {
    id: `${scope}.wifiDivider`,
    defaultMessage: 'Wifi Credential',
  },
  period: {
    id: `${scope}.period`,
    defaultMessage: 'Period',
  },
  delay: {
    id: `${scope}.delay`,
    defaultMessage: 'Restart wait after disconnect',
  },
});
