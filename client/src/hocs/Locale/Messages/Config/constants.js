import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.config.constants';

export default defineMessages({
  aliyun: {
    id: `${scope}.aliyun`,
    defaultMessage: 'Aliyun',
  },
  configVersion: {
    id: `${scope}.configVersion`,
    defaultMessage: 'Configuration Version',
  },
  autoUpdate: {
    id: `${scope}.autoUpdate`,
    defaultMessage: 'Firmware Auto Update',
  },
  enable: {
    id: `${scope}.enable`,
    defaultMessage: 'Enable',
  },
  disable: {
    id: `${scope}.disable`,
    defaultMessage: 'Disable',
  },
  periodicalRestart: {
    id: `${scope}.periodicalRestart`,
    defaultMessage: 'Periodical Restart',
  },
  disconnectedRestart: {
    id: `${scope}.disconnectedRestart`,
    defaultMessage: 'Restart After Internet Disconnected',
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Type',
  },
  registerMessage: {
    id: `${scope}.registerMessage`,
    defaultMessage: 'Register Message',
  },
  heartbeat: {
    id: `${scope}.heartbeat`,
    defaultMessage: 'HeartBeat Message',
  },
  heartbeatInterval: {
    id: `${scope}.heartbeatInterval`,
    defaultMessage: 'HeartBeat Message Frequency',
  },
  host: {
    id: `${scope}.host`,
    defaultMessage: 'Host',
  },
  port: {
    id: `${scope}.port`,
    defaultMessage: 'Port',
  },
  autoPollInterval: {
    id: `${scope}.autoPollInterval`,
    defaultMessage: 'Interval Between Data Auto Polling',
  },
  regionId: {
    id: `${scope}.regionId`,
    defaultMessage: 'Region ID',
  },
  subscribeTopic: {
    id: `${scope}.subscribeTopic`,
    defaultMessage: 'Subscribe Topic',
  },
  publishTopic: {
    id: `${scope}.publishTopic`,
    defaultMessage: 'Publish Topic',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  baudrate: {
    id: `${scope}.baudrate`,
    defaultMessage: 'Baudrate',
  },
  dataBit: {
    id: `${scope}.dataBit`,
    defaultMessage: 'Data Bit',
  },
  parityMode: {
    id: `${scope}.parityMode`,
    defaultMessage: 'Parity Mode',
  },
  stopBit: {
    id: `${scope}.stopBit`,
    defaultMessage: 'Stop Bit',
  },
  numberOfRetry: {
    id: `${scope}.numberOfRetry`,
    defaultMessage: 'Number Of Retries',
  },
  timeout: {
    id: `${scope}.timeout`,
    defaultMessage: 'Timeout',
  },
  period: {
    id: `${scope}.period`,
    defaultMessage: 'Period',
  },
  slaveId: {
    id: `${scope}.slaveId`,
    defaultMessage: 'Slave ID',
  },
  functionCode: {
    id: `${scope}.functionCode`,
    defaultMessage: 'Function Code',
  },
  registerOffset: {
    id: `${scope}.registerOffset`,
    defaultMessage: 'Register Offset',
  },
  numberOfRegisters: {
    id: `${scope}.numberOfRegisters`,
    defaultMessage: 'Number Of Registers',
  },
  readCoilStatus: {
    id: `${scope}.readCoilStatus`,
    defaultMessage: '0x01 Read Coil Status',
  },
  readInputStatus: {
    id: `${scope}.readInputStatus`,
    defaultMessage: '0x02 Read Input Status',
  },
  readHoldingRegisters: {
    id: `${scope}.readHoldingRegisters`,
    defaultMessage: '0x03 Read Holding Registers',
  },
  readInputRegisters: {
    id: `${scope}.readInputRegisters`,
    defaultMessage: '0x04 Read Input Registers',
  },
  request: {
    id: `${scope}.request`,
    defaultMessage: 'Request',
  },
  decimal: {
    id: `${scope}.decimal`,
    defaultMessage: 'decimal',
  },
  hexadecimal: {
    id: `${scope}.hexadecimal`,
    defaultMessage: 'hexadecimal',
  },
  crc: {
    id: `${scope}.crc`,
    defaultMessage: 'CRC',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  addTooltip: {
    id: `${scope}.addTooltip`,
    defaultMessage: 'Add',
  },
  editTooltip: {
    id: `${scope}.editTooltip`,
    defaultMessage: 'Edit',
  },
  deleteTooltip: {
    id: `${scope}.deleteTooltip`,
    defaultMessage: 'Delete',
  },
  propertyName: {
    id: `${scope}.propertyName`,
    defaultMessage: 'Property Name',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  dataType: {
    id: `${scope}.dataType`,
    defaultMessage: 'Data Type',
  },
  ratio: {
    id: `${scope}.ratio`,
    defaultMessage: 'Ratio',
  },
  deviation: {
    id: `${scope}.deviation`,
    defaultMessage: 'Deviation',
  },
  dataSource: {
    id: `${scope}.dataSource`,
    defaultMessage: 'Data Source',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: 'Order',
  },
  qos: {
    id: `${scope}.qos`,
    defaultMessage: 'qos',
  },
  retain: {
    id: `${scope}.retain`,
    defaultMessage: 'retain',
  },
  lwtMessage: {
    id: `${scope}.lwtMessage`,
    defaultMessage: 'lwtMessage',
  },
  cleanSession: {
    id: `${scope}.cleanSession`,
    defaultMessage: 'cleanSession',
  },
  keepalive: {
    id: `${scope}.keepalive`,
    defaultMessage: 'keepalive',
  },
  propertyKey: {
    id: `${scope}.propertyKey`,
    defaultMessage: 'Key',
  },
  propertyValue: {
    id: `${scope}.propertyValue`,
    defaultMessage: 'Value',
  },
  propertyType: {
    id: `${scope}.propertyType`,
    defaultMessage: 'Property Data Type',
  },
  string: {
    id: `${scope}.string`,
    defaultMessage: 'Text',
  },
  number: {
    id: `${scope}.number`,
    defaultMessage: 'Number',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  object: {
    id: `${scope}.object`,
    defaultMessage: 'Object',
  },
  array: {
    id: `${scope}.array`,
    defaultMessage: 'Array',
  },
  mappingProperty: {
    id: `${scope}.mappingProperty`,
    defaultMessage: 'Mapping Property',
  },
  registerType: {
    id: `${scope}.registerType`,
    defaultMessage: 'Register Type',
  },
  applyProductSecret: {
    id: `${scope}.applyProductSecret`,
    defaultMessage: 'Apply ProductSecret',
  },
  applyDeviceSecret: {
    id: `${scope}.applyDeviceSecret`,
    defaultMessage: 'Apply DeviceSecret',
  },
  second: {
    id: `${scope}.second`,
    defaultMessage: 'second',
  },
  millisecond: {
    id: `${scope}.millisecond`,
    defaultMessage: 'millisecond',
  },
  minute: {
    id: `${scope}.minute`,
    defaultMessage: 'minute',
  },
  method: {
    id: `${scope}.method`,
    defaultMessage: 'Method',
  },
  url: {
    id: `${scope}.url`,
    defaultMessage: 'URL',
  },
  requestType: {
    id: `${scope}.requestType`,
    defaultMessage: 'Request Type',
  },
  contentType: {
    id: `${scope}.contentType`,
    defaultMessage: 'Content Type',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Header',
  },
  basicUser: {
    id: `${scope}.basicUser`,
    defaultMessage: 'Basic Auth Username',
  },
  basicPass: {
    id: `${scope}.basicPass`,
    defaultMessage: 'Basic Auth Password',
  },
  restartScheduleHelper: {
    id: `${scope}.restartScheduleHelper`,
    defaultMessage: 'Enter 0 to disable',
  },
  tag: {
    id: `${scope}.tag`,
    defaultMessage: 'tag',
  },
  cmdStr: {
    id: `${scope}.cmdStr`,
    defaultMessage: 'Modbus Command',
  },
  idScope: {
    id: `${scope}.idScope`,
    defaultMessage: 'ID Scope',
  },
  deviceId: {
    id: `${scope}.deviceId`,
    defaultMessage: 'Device ID',
  },
  primaryKey: {
    id: `${scope}.primaryKey`,
    defaultMessage: 'Primary Key',
  },
  secondaryKey: {
    id: `${scope}.secondaryKey`,
    defaultMessage: 'Secondary Key',
  },
  accessToken: {
    id: `${scope}.accessToken`,
    defaultMessage: 'Access Token',
  },
});
