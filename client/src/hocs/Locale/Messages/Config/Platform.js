import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.platform';

export default defineMessages({
  networkIdLabel: {
    id: `${scope}.networkIdLabel`,
    defaultMessage: 'Network Channel ID',
  },
  serialIdLabel: {
    id: `${scope}.serialIdLabel`,
    defaultMessage: 'Serial Channel ID',
  },
  platformTypeLabel: {
    id: `${scope}.platformTypeLabel`,
    defaultMessage: 'Platform Type',
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
  networkFields: {
    id: `${scope}.networkFields`,
    defaultMessage: 'Network Fields',
  },
  dataTransmissionFields: {
    id: `${scope}.dataTransmissionFields`,
    defaultMessage: 'Data Transmission Fields',
  },
  transmissionTypeLabel: {
    id: `${scope}.transmissionTypeLabel`,
    defaultMessage: 'Transmission Data Type',
  },
  transmissionTypeOptionModbus: {
    id: `${scope}.transmissionTypeOptionModbus`,
    defaultMessage: 'Modbus Command',
  },
  transmissionTypeOptionJson: {
    id: `${scope}.transmissionTypeOptionJson`,
    defaultMessage: 'Json',
  },
  transmissionPeriodRadioLabel: {
    id: `${scope}.transmissionPeriodRadioLabel`,
    defaultMessage: 'When To Transmit',
  },
  transmissionPeriodOptionChange: {
    id: `${scope}.transmissionPeriodLabel`,
    defaultMessage: 'Transmit When Data Change',
  },
  transmissionPeriodOptionPeriod: {
    id: `${scope}.transmissionPeriodOptionPeriod`,
    defaultMessage: 'Transmit Periodically',
  },
  transmissionPeriodInputLabel: {
    id: `${scope}.transmissionPeriodInputLabel`,
    defaultMessage: 'Transmit Period',
  },
});
