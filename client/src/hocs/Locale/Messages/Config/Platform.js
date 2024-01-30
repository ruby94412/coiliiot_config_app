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
  transmissionDataTypeLabel: {
    id: `${scope}.transmissionDataTypeLabel`,
    defaultMessage: 'Transmission Data Type',
  },
  transmissionDataTypeOptionModbus: {
    id: `${scope}.transmissionDataTypeOptionModbus`,
    defaultMessage: 'Modbus Command',
  },
  transmissionDataTypeOptionJson: {
    id: `${scope}.transmissionDataTypeOptionJson`,
    defaultMessage: 'Json',
  },
  transmissionTypeLabel: {
    id: `${scope}.transmissionTypeLabel`,
    defaultMessage: 'When To Transmit',
  },
  transmissionTypeOptionChange: {
    id: `${scope}.transmissionTypeOptionChange`,
    defaultMessage: 'Transmit When Data Changes',
  },
  transmissionTypeOptionPeriod: {
    id: `${scope}.transmissionTypeOptionPeriod`,
    defaultMessage: 'Transmit Periodically',
  },
  transmissionPeriodLabel: {
    id: `${scope}.transmissionPeriodLabel`,
    defaultMessage: 'Transmit Period',
  },
  multiSelectLabel: {
    id: `${scope}.multiSelectLabel`,
    defaultMessage: 'Command Data',
  },
  multiSelectHelper: {
    id: `${scope}.multiSelectHelper`,
    defaultMessage: 'The returned data of these commands from sensors will be transmitted to cloud',
  },
  detailButton: {
    id: `${scope}.detailButton`,
    defaultMessage: 'Show Data Source',
  },
  dataSourceTitle: {
    id: `${scope}.dataSourceTitle`,
    defaultMessage: 'Data Source',
  },
  dataSourceHelper: {
    id: `${scope}.dataSourceHelper`,
    defaultMessage: 'The responses of the commands above are the data source, in this section, the data sources are supposed to be configured either in its original data form or into json, so that data can be uploaded into cloud',
  },
  addRecordButton: {
    id: `${scope}.addRecordButton`,
    defaultMessage: 'Add Record',
  },
  dataTypeHelperModbus: {
    id: `${scope}.dataTypeHelperModbus`,
    defaultMessage: 'The data will be transmitted in form of Modbus command byte array. e.g.[0x01, 0x03, 0x00, 0x00, 0x00, 0x0A, 0xC5, 0xCD]',
  },
  dataTypeHelperJson: {
    id: `${scope}.dataTypeHelperJson`,
    defaultMessage: 'The data will be transmitted in form of Json Object. e.g.{"temperature": 20.5, "humidity": 79.1}',
  },
  emptyCmdErr: {
    id: `${scope}.emptyCmdErr`,
    defaultMessage: 'Modbus command(data source) cannot be empty.',
  },
  emptyPropErr: {
    id: `${scope}.emptyPropErr`,
    defaultMessage: 'Property name cannot be empty.',
  },
  dupPropErr: {
    id: `${scope}.dupPropErr`,
    defaultMessage: 'Property name already exists.',
  },
  disconnectedRestart: {
    id: `${scope}.disconnectedRestart`,
    defaultMessage: 'Restart After Platform Disconnected',
  },
});
