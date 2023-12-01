import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Config/constants';
import {
  DeleteForever as DeleteIcon,
  Add as AddIcon, Edit as EditIcon,
  Save as SaveIcon, Close as CancelIcon,
} from '@mui/icons-material';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { Tooltip, InputAdornment } from '@mui/material';

export const networkIds = [0, 1, 2, 3, 4, 5, 6, 7];

export const networkOptions = [
  { label: 'Socket', value: 0 },
  { label: 'MQTT', value: 2 },
  { label: 'HTTP', value: 3 },
  { label: 'Azure', value: 4 },
  { label: <FormattedMessage {...messages.aliyun} />, value: 1 },
];

export const basicFields = [
  {
    label: <FormattedMessage {...messages.configVersion} />,
    propertyName: 'config_version',
    datatype: 'number',
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.autoUpdate} />,
    propertyName: 'autoUpdateEnabled',
    datatype: 'boolean',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.enable} />, value: true },
      { label: <FormattedMessage {...messages.disable} />, value: false },
    ],
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.periodicalRestart} />,
    propertyName: 'restartSchedule',
    datatype: 'number',
    layout: { xs: 12, md: 6 },
    helperText: <FormattedMessage {...messages.restartScheduleHelper} />,
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.minute} /></InputAdornment>,
    inputProps: { min: 0, max: 1440, step: 15 },
  },
  {
    label: <FormattedMessage {...messages.disconnectedRestart} />,
    propertyName: 'disconnectedRestart',
    datatype: 'number',
    helperText: <FormattedMessage {...messages.restartScheduleHelper} />,
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.minute} /></InputAdornment>,
    layout: { xs: 12, md: 6 },
    inputProps: { min: 0, max: 5, step: 0.5 },
  },
];

export const credentialFields = [
  {
    label: 'SSID',
    propertyName: 'ssid',
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.password} />,
    propertyName: 'password',
    layout: { xs: 12, md: 6 },
  },
];

export const socketFields = [
  {
    label: <FormattedMessage {...messages.type} />,
    propertyName: 'socketType',
    fieldType: 'radioGroup',
    radioOptions: [{ label: 'TCP', value: 0 }, { label: 'UDP', value: 1 }],
  },
  { label: <FormattedMessage {...messages.host} />, propertyName: 'host', datatype: 'text' },
  { label: <FormattedMessage {...messages.port} />, propertyName: 'port', datatype: 'number' },
  { label: <FormattedMessage {...messages.registerMessage} />, propertyName: 'registerMessage', datatype: 'text' },
  { label: <FormattedMessage {...messages.heartbeat} />, propertyName: 'heartbeat', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.heartbeatInterval} />,
    propertyName: 'heartbeatInterval',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.second} /></InputAdornment>,
  },
];

export const aliyunFields = [
  { label: <FormattedMessage {...messages.regionId} />, propertyName: 'regionId', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.registerType} />,
    propertyName: 'registerType',
    datatype: 'number',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.applyDeviceSecret} />, value: 0 },
      { label: <FormattedMessage {...messages.applyProductSecret} />, value: 1 },
    ],
  },
  { label: 'ProductKey', propertyName: 'productKey', datatype: 'text' },
  { label: 'ProductSecret', propertyName: 'productSecret', datatype: 'text' },
  { label: 'DeviceSecret', propertyName: 'deviceSecret', datatype: 'text' },
  { label: 'DeviceName', propertyName: 'deviceName', datatype: 'text' },
  { label: <FormattedMessage {...messages.subscribeTopic} />, propertyName: 'subscribeTopic', datatype: 'text' },
  { label: <FormattedMessage {...messages.publishTopic} />, propertyName: 'publishTopic', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.qos} />,
    propertyName: 'qos',
    datatype: 'number',
    fieldType: 'radioGroup',
    radioOptions: [0, 1, 2],
  },
  {
    label: <FormattedMessage {...messages.retain} />,
    propertyName: 'retain',
    datatype: 'number',
    fieldType: 'radioGroup',
    radioOptions: [0, 1],
  },
  {
    label: <FormattedMessage {...messages.cleanSession} />,
    propertyName: 'cleanSession',
    datatype: 'boolean',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.enable} />, value: true },
      { label: <FormattedMessage {...messages.disable} />, value: false },
    ],
  },
  { label: <FormattedMessage {...messages.lwtMessage} />, propertyName: 'lwtMessage', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.keepalive} />,
    propertyName: 'keepalive',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.second} /></InputAdornment>,
  },
];

export const mqttFields = [
  { label: <FormattedMessage {...messages.host} />, propertyName: 'host', datatype: 'text' },
  { label: <FormattedMessage {...messages.port} />, propertyName: 'port', datatype: 'number' },
  { label: <FormattedMessage {...messages.username} />, propertyName: 'username', datatype: 'text' },
  { label: <FormattedMessage {...messages.password} />, propertyName: 'password', datatype: 'text' },
  { label: 'ClientID', propertyName: 'clientId', datatype: 'text' },
  { label: <FormattedMessage {...messages.subscribeTopic} />, propertyName: 'subscribeTopic', datatype: 'text' },
  { label: <FormattedMessage {...messages.publishTopic} />, propertyName: 'publishTopic', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.qos} />,
    propertyName: 'qos',
    datatype: 'number',
    fieldType: 'radioGroup',
    radioOptions: [0, 1, 2],
  },
  {
    label: <FormattedMessage {...messages.retain} />,
    propertyName: 'retain',
    datatype: 'number',
    fieldType: 'radioGroup',
    radioOptions: [0, 1],
  },
  {
    label: <FormattedMessage {...messages.cleanSession} />,
    propertyName: 'cleanSession',
    datatype: 'boolean',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.enable} />, value: true },
      { label: <FormattedMessage {...messages.disable} />, value: false },
    ],
  },
  { label: <FormattedMessage {...messages.lwtMessage} />, propertyName: 'lwtMessage', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.keepalive} />,
    propertyName: 'keepalive',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.second} /></InputAdornment>,
  },
  { label: <FormattedMessage {...messages.heartbeat} />, propertyName: 'heartbeat', datatype: 'text' },
  {
    label: <FormattedMessage {...messages.heartbeatInterval} />,
    propertyName: 'heartbeatInterval',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.second} /></InputAdornment>,
  },
];

export const httpFields = [
  {
    label: <FormattedMessage {...messages.method} />,
    propertyName: 'method',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: 'GET', value: 0 },
      { label: 'POST', value: 1 },
    ],
  },
  {
    label: <FormattedMessage {...messages.url} />,
    propertyName: 'url',
  },
  // {
  //   label: <FormattedMessage {...messages.requestType} />,
  //   propertyName: 'requestType',
  //   fieldType: 'radioGroup',
  //   radioOptions: ['body', 'param'],
  // },
  {
    label: <FormattedMessage {...messages.contentType} />,
    propertyName: 'contentType',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: 'urlencode', value: 0 },
      { label: 'text/plain', value: 1 },
      { label: 'octet-stream', value: 2 },
    ],
  },
  // {
  //   label: <FormattedMessage {...messages.header} />,
  //   propertyName: 'header',
  // },
  {
    label: <FormattedMessage {...messages.basicUser} />,
    propertyName: 'basicUser',
  },
  {
    label: <FormattedMessage {...messages.basicPass} />,
    propertyName: 'basicPass',
  },
];

export const azureFields = [];
export const serialFields = [
  {
    label: <FormattedMessage {...messages.baudrate} />,
    propertyName: 'baudrate',
    fieldType: 'select',
    selectOptions: [1200, 2400, 4800, 9600, 14400,
      19200, 28800, 57600, 115200, 230400, 460800, 921600],
  },
  {
    label: <FormattedMessage {...messages.dataBit} />,
    propertyName: 'dataBit',
    fieldType: 'radioGroup',
    radioOptions: [7, 8],
  },
  {
    label: <FormattedMessage {...messages.stopBit} />,
    propertyName: 'stopBit',
    fieldType: 'radioGroup',
    radioOptions: [1, 2],
  },
  {
    label: <FormattedMessage {...messages.parityMode} />,
    propertyName: 'parityMode',
    fieldType: 'radioGroup',
    layout: { xs: 12, md: 8 },
    radioOptions: [{ label: 'UART.PAR_EVEN', value: 0 }, { label: 'UART.PAR_ODD', value: 1 },
      { label: 'UART.PAR_NONE', value: 2 }],
  },
];

export const autoPollFields = [
  {
    label: <FormattedMessage {...messages.autoPollInterval} />,
    propertyName: 'delay',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.millisecond} /></InputAdornment>,
  },
  {
    label: <FormattedMessage {...messages.numberOfRetry} />,
    propertyName: 'numberOfRetry',
    datatype: 'number',
  },
  {
    label: <FormattedMessage {...messages.timeout} />,
    propertyName: 'timeout',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.millisecond} /></InputAdornment>,
  },
  {
    label: <FormattedMessage {...messages.period} />,
    propertyName: 'period',
    datatype: 'number',
    endAdornment: <InputAdornment position="end"><FormattedMessage {...messages.second} /></InputAdornment>,
  },
];

export const commandGeneratorFields = [
  {
    label: <FormattedMessage {...messages.tag} />,
    propertyName: 'tag',
  },
  {
    label: <FormattedMessage {...messages.slaveId} />,
    propertyName: 'slaveId',
    datatype: 'number',
  },
  {
    label: <FormattedMessage {...messages.functionCode} />,
    propertyName: 'functionCode',
    datatype: 'number',
    fieldType: 'select',
    selectOptions: [
      { label: <FormattedMessage {...messages.readCoilStatus} />, value: 1 },
      { label: <FormattedMessage {...messages.readInputStatus} />, value: 2 },
      { label: <FormattedMessage {...messages.readHoldingRegisters} />, value: 3 },
      { label: <FormattedMessage {...messages.readInputRegisters} />, value: 4 },
    ],
  },
  {
    label: <FormattedMessage {...messages.registerOffset} />,
    propertyName: 'registerOffset',
    datatype: 'number',
  },
  {
    label: <FormattedMessage {...messages.numberOfRegisters} />,
    propertyName: 'numberOfRegisters',
    datatype: 'number',
  },
];

export const dataMappingFields = [
  {
    label: <FormattedMessage {...messages.propertyName} />,
    propertyName: 'propertyName',
  },
  {
    label: <FormattedMessage {...messages.address} />,
    propertyName: 'address',
    datatype: 'number',
  },
  {
    label: <FormattedMessage {...messages.dataType} />,
    propertyName: 'dataType',
    datatype: 'number',
    fieldType: 'select',
    selectOptions: [
      { label: 'SHORT', value: 0 },
      { label: 'LONG', value: 1 },
      { label: 'FLOAT', value: 2 },
      { label: 'DOUBLE', value: 3 },
    ],
  },
  {
    label: <FormattedMessage {...messages.order} />,
    propertyName: 'order',
    datatype: 'number',
    fieldType: 'select',
    selectOptions: [
      { label: 'ABCD', value: 0 },
      { label: 'DCBA', value: 1 },
    ],
  },
  {
    label: <FormattedMessage {...messages.ratio} />,
    propertyName: 'ratio',
    datatype: 'number',
  },
  {
    label: <FormattedMessage {...messages.deviation} />,
    propertyName: 'deviation',
    datatype: 'number',
  },
];

export const customPropertyFields = [
  {
    label: <FormattedMessage {...messages.propertyType} />,
    propertyName: 'propertyType',
    datatype: 'number',
    fieldType: 'select',
    selectOptions: [
      { label: <FormattedMessage {...messages.string} />, value: 0 },
      { label: <FormattedMessage {...messages.number} />, value: 1 },
      { label: <FormattedMessage {...messages.date} />, value: 2 },
      { label: <FormattedMessage {...messages.object} />, value: 4 },
      { label: <FormattedMessage {...messages.mappingProperty} />, value: 3 },
    ],
  },
  {
    label: <FormattedMessage {...messages.propertyKey} />,
    propertyName: 'propertyKey',
  },
  {
    label: <FormattedMessage {...messages.propertyValue} />,
    propertyName: 'propertyValue',
  },
];

export const getCommandTableColumns = ({
  intl,
  setParams,
  deleteRow,
}) => [
  {
    field: 'tag',
    headerName: intl.formatMessage(messages.tag),
    flex: 1,
    minWidth: 80,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
  },
  {
    field: 'slaveId',
    headerName: intl.formatMessage(messages.slaveId),
    flex: 1,
    minWidth: 80,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
  },
  {
    field: 'functionCode',
    headerName: intl.formatMessage(messages.functionCode),
    flex: 1,
    minWidth: 120,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
  },
  {
    field: 'registerOffset',
    headerName: intl.formatMessage(messages.registerOffset),
    flex: 1,
    minWidth: 120,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
  },
  {
    field: 'numberOfRegisters',
    headerName: intl.formatMessage(messages.numberOfRegisters),
    flex: 1,
    minWidth: 150,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
  },
  {
    field: 'actions',
    headerName: intl.formatMessage(messages.actions),
    type: 'actions',
    flex: 1,
    minWidth: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.editTooltip)}>
            <EditIcon />
          </Tooltip>
        )}
        label="Edit"
        onClick={() => {
          setParams(params?.row);
        }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.deleteTooltip)}>
            <DeleteIcon sx={{ '&:hover': { color: 'red' } }} />
          </Tooltip>
        )}
        label="Delete"
        onClick={() => {
          deleteRow(params?.row);
        }}
      />,
    ],
  },
];

export const getMappingTableColumns = ({
  intl,
  setParams,
  deleteRow,
}) => [
  {
    field: 'propertyName',
    headerName: intl.formatMessage(messages.propertyName),
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'address',
    headerName: intl.formatMessage(messages.address),
    flex: 1,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
    minWidth: 80,
  },
  {
    field: 'dataType',
    headerName: intl.formatMessage(messages.dataType),
    flex: 1,
    minWidth: 80,
    renderCell: (params) => (
      <span>{['SHORT', 'LONG', 'FLOAT', 'DOUBLE'][params.value]}</span>
    ),
  },
  {
    field: 'order',
    headerName: intl.formatMessage(messages.order),
    flex: 1,
    minWidth: 80,
    renderCell: (params) => (
      <span>{['ABCD', 'DCBA', 'BADC', 'CDAB'][params.value]}</span>
    ),
  },
  {
    field: 'ratio',
    headerName: intl.formatMessage(messages.ratio),
    flex: 1,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
    minWidth: 80,
  },
  {
    field: 'deviation',
    headerName: intl.formatMessage(messages.deviation),
    flex: 1,
    headerAlign: 'right',
    type: 'number',
    align: 'right',
    minWidth: 80,
  },
  {
    field: 'actions',
    headerName: intl.formatMessage(messages.actions),
    type: 'actions',
    flex: 1,
    minWidth: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.editTooltip)}>
            <EditIcon />
          </Tooltip>
        )}
        label="Edit"
        onClick={() => {
          setParams(params?.row);
        }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.deleteTooltip)}>
            <DeleteIcon sx={{ '&:hover': { color: 'red' } }} />
          </Tooltip>
        )}
        label="Delete"
        onClick={() => {
          deleteRow(params?.row);
        }}
      />,
    ],
  },
];

export const getCustomTableColumns = ({
  intl,
  setParams,
  deleteRow,
}) => [
  {
    field: 'propertyKey',
    headerName: intl.formatMessage(messages.propertyKey),
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'propertyValue',
    headerName: intl.formatMessage(messages.propertyValue),
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'propertyType',
    headerName: intl.formatMessage(messages.dataType),
    flex: 1,
    minWidth: 80,
    renderCell: (params) => (
      <span>
        {[
          intl.formatMessage(messages.string),
          intl.formatMessage(messages.number),
          intl.formatMessage(messages.date),
          intl.formatMessage(messages.object),
          intl.formatMessage(messages.array),
        ][params.value]}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: intl.formatMessage(messages.actions),
    type: 'actions',
    flex: 1,
    minWidth: 80,
    getActions: (params) => {
      const actions = [
        <GridActionsCellItem
          icon={(
            <Tooltip title={intl.formatMessage(messages.editTooltip)}>
              <EditIcon />
            </Tooltip>
          )}
          label="Edit"
          onClick={() => {
            setParams(params?.row);
          }}
        />,
        <GridActionsCellItem
          icon={(
            <Tooltip title={intl.formatMessage(messages.deleteTooltip)}>
              <DeleteIcon sx={{ '&:hover': { color: 'red' } }} />
            </Tooltip>
          )}
          label="Delete"
          onClick={() => {
            deleteRow(params?.row);
          }}
        />,
      ];
      if (params?.row?.propertyType === 3) {
        actions.unshift(
          <GridActionsCellItem
            icon={(
              <Tooltip title={intl.formatMessage(messages.addTooltip)}>
                <AddIcon />
              </Tooltip>
            )}
            label="Add"
            onClick={() => {
              setParams(params?.row);
            }}
          />,
        );
      }
      return actions;
    },
  },
];

export const getCommandInfoTableColumns = ({
  intl,
}) => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'tag',
    headerName: intl.formatMessage(messages.tag),
    flex: 1,
  },
  {
    field: 'cmdStr',
    headerName: intl.formatMessage(messages.cmdStr),
    flex: 1,
    minWidth: 250,
  },
];

export const getConversionTableColumns = ({
  intl,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
  rowModesModel,
  cmdRows,
}) => [
  {
    field: 'command',
    headerName: intl.formatMessage(messages.cmdStr),
    align: 'center',
    headerAlign: 'center',
    editable: true,
    type: 'singleSelect',
    minWidth: 250,
    flex: 1,
    valueOptions: cmdRows?.map((row) => ({ label: `${row.tag}-${row.cmdStr}`, value: row.id })),
  },
  {
    field: 'propertyName',
    headerName: intl.formatMessage(messages.propertyName),
    minWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'dataType',
    headerName: intl.formatMessage(messages.dataType),
    editable: true,
    flex: 1,
    type: 'singleSelect',
    valueOptions: [
      { label: 'SHORT', value: 0 },
      { label: 'LONG', value: 1 },
      { label: 'FLOAT', value: 2 },
      { label: 'DOUBLE', value: 3 },
    ],
  },
  {
    field: 'order',
    flex: 1,
    headerName: intl.formatMessage(messages.order),
    editable: true,
    type: 'singleSelect',
    valueOptions: [
      { label: 'ABCD', value: 0 },
      { label: 'DCBA', value: 1 },
    ],
  },
  {
    field: 'address',
    headerName: intl.formatMessage(messages.address),
    type: 'number',
    align: 'right',
    flex: 1,
    headerAlign: 'right',
    editable: true,
  },
  {
    field: 'ratio',
    flex: 1,
    headerName: intl.formatMessage(messages.ratio),
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    editable: true,
  },
  {
    field: 'deviation',
    flex: 1,
    headerName: intl.formatMessage(messages.deviation),
    type: 'number',
    align: 'right',
    headerAlign: 'right',
    editable: true,
  },
  {
    field: 'actions',
    flex: 1,
    type: 'actions',
    headerName: intl.formatMessage(messages.actions),
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];
