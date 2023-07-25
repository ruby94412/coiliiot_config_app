import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.productType';

export default defineMessages({
  espDTUTitle: {
    id: `${scope}.espDTUTitle`,
    defaultMessage: 'WIFI/Ethernet DTU',
  },
  espIOTitle: {
    id: `${scope}.espIOTitle`,
    defaultMessage: 'IO Controller',
  },
});
