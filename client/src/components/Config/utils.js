/* eslint-disable camelcase */
import {
  Fragment,
} from 'react';
import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import {
  HelpOutline as HelperIcon,
} from '@mui/icons-material';
import {
  aliyunFields, mqttFields, socketFields, httpFields, azureFields,
} from './constants';

export const renderFields = ({
  label,
  handleChange,
  fieldType,
  datatype,
  value,
  name,
  propertyName,
  ...other
}) => {
  const layout = other.layout || { xs: 12, md: 4 };
  const style = other.style || { width: '80%' };
  const {
    radioOptions, selectOptions, helperText, helperTooltip, ...rest
  } = other;
  switch (fieldType) {
    case 'radioGroup':
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>
              {label}
              { helperTooltip
                && (
                  <Tooltip title={helperTooltip}>
                    <HelperIcon sx={{ fontSize: '15px' }} />
                  </Tooltip>
                )}
            </FormLabel>
            <RadioGroup
              row
              value={value}
              onChange={handleChange}
              name={name}
            >
              {
                radioOptions.map((option) => (
                  <FormControlLabel
                    key={option?.value || option}
                    value={option?.label ? option.value : option}
                    control={<Radio />}
                    label={option?.label || option}
                  />
                ))
              }
            </RadioGroup>
            { helperText && <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>}
          </FormControl>
        </Grid>
      );
    case 'select':
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>
              {label}
              { helperTooltip
                && (
                  <Tooltip title={helperTooltip}>
                    <HelperIcon sx={{ fontSize: '15px' }} />
                  </Tooltip>
                )}
            </FormLabel>
            <Select
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
              {...rest}
            >
              {
                selectOptions.map((option) => (
                  <MenuItem
                    key={option?.value || option}
                    value={option?.label ? option.value : option}
                  >
                    {option?.label || option}
                  </MenuItem>
                ))
              }
            </Select>
            { helperText && <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>}
          </FormControl>
        </Grid>
      );
    case 'blank':
      return (<Grid item {...layout} />);
    case 'OutlinedInput':
    default:
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>
              {label}
              { helperTooltip
                && (
                  <Tooltip title={helperTooltip}>
                    <HelperIcon sx={{ fontSize: '15px' }} />
                  </Tooltip>
                )}
            </FormLabel>
            <OutlinedInput
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
              type={datatype}
              {...rest}
            />
            { helperText && <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>}
          </FormControl>
        </Grid>
      );
  }
};

export const getResetValues = () => {
  const rst = {
    basicConfigs: {}, serialConfigs: [], networkConfigs: [],
  };
  rst.basicConfigs = {
    config_version: 0,
    autoUpdateEnabled: true,
    disconnectedRestart: 0,
    restartSchedule: 720,
    credential: { ssid: '', password: '' },
  };
  for (let i = 0; i < 3; i++) {
    rst.serialConfigs.push({
      serialId: i,
      enabled: false,
      baudrate: 9600,
      dataBit: 8,
      stopBit: 1,
      parityMode: 2,
      autoPollEnabled: false,
      delay: 1000,
      numberOfRetry: 3,
      timeout: 1000,
      period: 5,
      commands: [],
    });
  }
  for (let i = 0; i < 8; i++) {
    rst.networkConfigs.push({
      networkId: i,
      enabled: false,
      type: 0,
      serialId: 0,
      transmissionType: 0,
      transmissionPeriod: 30,
      transmissionDataType: [0, 0, 0],
      socket: {
        registerMessage: '',
        heartbeat: '',
        heartbeatInterval: 30,
        host: '',
        port: 8080,
        socketType: 0,
      },
      aliyun: {
        regionId: 'cn-shanghai',
        productKey: '',
        deviceSecret: '',
        productSecret: '',
        registerType: 0,
        deviceName: '',
        subscribeTopic: '',
        publishTopic: '',
        retain: 0,
        lwtMessage: '',
        qos: 0,
        cleanSession: true,
        keepalive: 300,
      },
      mqtt: {
        host: '',
        port: 8080,
        username: '',
        password: '',
        clientId: '',
        subscribeTopic: '',
        publishTopic: '',
        retain: 0,
        lwtMessage: '',
        qos: 0,
        cleanSession: true,
        keepalive: 300,
        heartbeat: '',
        heartbeatInterval: 30,
      },
      http: {
        method: 0,
        url: '',
        contentType: 0,
        header: '',
        basicUser: '',
        basicPass: '',
      },
      azure: {
        idScope: '',
        deviceId: '',
        primaryKey: '',
        secondaryKey: '',
      },
      conversions: [[], [], []],
      commands: [[], [], []],
    });
  }
  return rst;
};

export const getInitialValues = (originalConfig, originalCredential) => {
  const rst = getResetValues();
  if (originalConfig?.basicConfigs) {
    const origin = originalConfig.basicConfigs;
    const defaultConfig = rst.basicConfigs;
    rst.basicConfigs = { ...defaultConfig, ...origin, credential: { ...originalCredential } };
  }
  originalConfig?.serialConfigs?.forEach((origin) => {
    const index = origin.serialId;
    const defaultConfig = rst.serialConfigs[index];
    rst.serialConfigs[index] = { ...defaultConfig, ...origin };
  });
  originalConfig?.networkConfigs?.forEach((origin) => {
    const index = origin.networkId;
    const defaultConfig = rst.networkConfigs[index];
    const {
      networkId,
      type,
      serialId,
      transmissionType,
      transmissionPeriod,
      transmissionDataType,
      conversions,
      commands,
      ...other
    } = origin;
    rst.networkConfigs[index] = {
      ...defaultConfig,
      networkId,
      type,
      serialId,
      enabled: true,
      transmissionType,
      transmissionPeriod,
      transmissionDataType,
      conversions,
      commands,
    };
    const typeArr = ['socket', 'aliyun', 'mqtt', 'http', 'azure'];
    rst.networkConfigs[index][typeArr[type]] = other;
  });
  return rst;
};

export const getCommandDetail = ({
  slaveId,
  functionCode,
  registerOffset,
  numberOfRegisters,
}) => {
  const dec = [];
  const hex = [];
  const rawDec = [slaveId, functionCode, registerOffset, numberOfRegisters];
  dec.push(Number(slaveId));
  dec.push(Number(functionCode));

  let temp = Number(registerOffset).toString(16);
  while (temp.length < 4) temp = `0${temp}`;
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.push(Number(`0x${temp.substring(2)}`));
  temp = Number(numberOfRegisters).toString(16);
  while (temp.length < 4) temp = `0${temp}`;
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.push(Number(`0x${temp.substring(2)}`));
  let crc = 0xFFFF;
  let odd;
  for (let i = 0; i < dec.length; i++) {
    crc ^= dec[i];
    for (let j = 0; j < 8; j++) {
      odd = crc & 0x0001;
      crc >>= 1;
      if (odd) {
        crc ^= 0xA001;
      }
    }
  }
  rawDec.push(crc);
  temp = crc.toString(16);
  while (temp.length < 4) temp = `0${temp}`;
  dec.push(Number(`0x${temp.substring(2)}`));
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.forEach((num) => {
    let s = num.toString(16);
    while (s.length < 2) s = `0${s}`;
    hex.push(s.toUpperCase());
  });
  const rst = {
    slaveId: { dec: dec[0], hex: hex[0] },
    functionCode: { dec: dec[1], hex: hex[1] },
    registerOffset: {
      dec: registerOffset, decArr: [dec[2], dec[3]], hexArr: [hex[2], hex[3]], hex: hex[2] + hex[3],
    },
    numberOfRegisters: {
      dec: numberOfRegisters,
      decArr: [dec[4], dec[5]],
      hexArr: [hex[4], hex[5]],
      hex: hex[4] + hex[5],
    },
    crc: {
      dec: crc, decArr: [dec[6], dec[7]], hexArr: [hex[6], hex[7]], hex: hex[6] + hex[7],
    },
    hex,
    dec,
    rawDec,
  };
  return rst;
};

export const getUid = (type) => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  switch (type) {
    case 'simple':
      return `${s4()}`;
    case 'user':
      return `${s4() + s4()}-${s4()}-${s4()}`;
    case 'group':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}`;
    case 'device':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    case 'token':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}-${s4()}${s4()}${s4()}${s4()}`;
    default:
      return `${s4()}${s4()}${s4()}${s4()}`;
  }
};

export const convertRawCommands_archived = (autoPollConfig) => {
  if (!autoPollConfig || !autoPollConfig.commands?.length) return [];
  const temp = autoPollConfig.commands?.map((command) => {
    const cmd = command[1].match(/.{1,2}/g).map((s) => (parseInt(s, 16)));
    const defaultCmd = {
      id: command[0],
      enableJson: Boolean(command[2]),
    };
    const convertProps = {
      networkIds: [],
      propertyName: '',
      address: 0,
      dataType: 0,
      order: 0,
      ratio: 1,
      deviation: 0,
    };
    if (command?.length > 3) {
      Object.entries(convertProps).forEach(([k, v], index) => {
        switch (typeof v) {
          case 'boolean':
            convertProps[k] = Boolean(command[index + 3]);
            break;
          case 'number':
            convertProps[k] = Number(command[index + 3]);
            break;
          case 'string':
          default:
            convertProps[k] = command[index + 3];
            break;
        }
      });
    }
    const cmdDetial = {
      slaveId: cmd[0],
      functionCode: cmd[1],
      registerOffset: cmd[2] * 256 + cmd[3],
      numberOfRegisters: cmd[4] * 256 + cmd[5],
    };
    const detail = getCommandDetail(cmdDetial);
    return {
      detail, ...cmdDetial, ...defaultCmd, ...convertProps,
    };
  });
  return temp;
};

/**
 * @brief
 *  this is the function that convert raw modbus commands into table
 */
export const convertRawCommands = (serialConfig) => {
  if (!serialConfig || !serialConfig.commands?.length) return [];
  return serialConfig?.commands?.map((command) => {
    const arr = command.split('-');
    const cmd = arr[2]?.match(/.{1,2}/g).map((s) => (parseInt(s, 16))) || [];
    const defaultCmd = {
      id: arr[0],
      tag: arr[1],
      cmdStr: arr[2],
    };
    const cmdDetial = {
      slaveId: cmd[0],
      functionCode: cmd[1],
      registerOffset: cmd[2] * 256 + cmd[3],
      numberOfRegisters: cmd[4] * 256 + cmd[5],
    };
    const detail = getCommandDetail(cmdDetial);
    return {
      detail, ...cmdDetial, ...defaultCmd,
    };
  });
};

export const renderCommandDetail = ({
  slaveId,
  functionCode,
  registerOffset,
  numberOfRegisters,
}, {
  slaveIdLabel,
  functionCodeLabel,
  registerOffestLabel,
  numberOfRegistersLabel,
  requestLabel,
  decimalLabel,
  hexLabel,
  crcLabel,
}) => {
  const command = getCommandDetail({
    slaveId,
    functionCode,
    registerOffset,
    numberOfRegisters,
  });
  const maxLen = Math.max(
    slaveIdLabel.length,
    functionCodeLabel.length,
    registerOffestLabel.length,
    numberOfRegistersLabel.length,
  );
  const getFlexSpaces = (label, len) => {
    let rst = '';
    while (rst.length + label.length < len) rst = `${rst} `;
    return rst;
  };
  const getSameLen = (label, len) => {
    let rst = label.toString();
    while (rst.length < len) rst = ` ${rst}`;
    return rst;
  };
  const startAddress = [0, 0, 10001, 40001, 30001];
  return `${slaveIdLabel}:${getFlexSpaces(slaveIdLabel, maxLen)} ${getSameLen(command.slaveId.dec, 6)} (${decimalLabel}) |    ${command.slaveId.hex} (${hexLabel})
${functionCodeLabel}:${getFlexSpaces(functionCodeLabel, maxLen)} ${getSameLen(command.functionCode.dec, 6)} (${decimalLabel}) |    ${command.functionCode.hex} (${hexLabel})
${registerOffestLabel}:${getFlexSpaces(registerOffestLabel, maxLen)} ${getSameLen(command.registerOffset.dec, 6)} (${decimalLabel}) |  ${command.registerOffset.hex} (${hexLabel})
${numberOfRegistersLabel}:${getFlexSpaces(numberOfRegistersLabel, maxLen)} ${getSameLen(command.numberOfRegisters.dec, 6)} (${decimalLabel}) |  ${command.numberOfRegisters.hex} (${hexLabel})

${crcLabel}:${getFlexSpaces(crcLabel, maxLen)} ${getSameLen(command.crc.dec, 6)} (${decimalLabel}) |  ${command.crc.hex} (${hexLabel})

${requestLabel}: [${command.slaveId.hex}] [${command.functionCode.hex}] [${command.registerOffset.hex}] [${command.numberOfRegisters.hex}] [${command.crc.hex}]
         |    |    |      |      |-> ${crcLabel} (${command.crc.dec})
         |    |    |      |-> ${numberOfRegistersLabel} (${command.numberOfRegisters.dec})
         |    |    |-> ${registerOffestLabel} (${command.registerOffset.dec} = ${Number(command.registerOffset.dec) + startAddress[command.functionCode.dec]})
         |    |-> ${functionCodeLabel} (${command.functionCode.dec})
         |-> ${slaveIdLabel} (${command.slaveId.dec})`;
};

export const handleFormDataSubmit = (values) => {
  const config = {
    basicConfigs: {},
    serialConfigs: [],
    networkConfigs: [],
    networkSummary: {
      socket: [], aliyun: [], mqtt: [], http: [], azure: [],
    },
  };
  const { credential, ...otherBasics } = values.basicConfigs;
  config.basicConfigs = otherBasics;
  values.serialConfigs.forEach((ele) => {
    if (ele.enabled) config.serialConfigs.push(ele);
  });
  values.networkConfigs.forEach((ele) => {
    if (ele.enabled) {
      const {
        enabled,
        serialId,
        type, networkId,
        transmissionPeriod,
        transmissionType,
        transmissionDataType,
        conversions,
        commands,
      } = ele;
      const typeArr = ['socket', 'aliyun', 'mqtt', 'http', 'azure'];
      const detail = ele[typeArr[type]];
      config.networkSummary[typeArr[type]].push(networkId);
      const temp = {
        networkId,
        enabled,
        type,
        serialId,
        transmissionType,
        transmissionPeriod,
        transmissionDataType,
        ...detail,
        conversions,
        commands,
      };
      Object.keys(temp).forEach((key) => temp[key] === undefined && delete temp[key]);
      config.networkConfigs.push(temp);
    }
  });
  config.config_version = getUid();
  return { config, credential };
};

export const nodeToJson = (node) => {
  if (!node) return null;
  const {
    propertyKey, propertyValue, propertyType, children,
  } = node;
  const rst = {};
  switch (propertyType) {
    case 3: {
      let temp = {};
      if (children?.length) {
        children.forEach((child) => {
          temp = { ...temp, ...nodeToJson(child) };
        });
      }
      rst[propertyKey] = temp;
      break;
    }
    case 2:
      // eslint-disable-next-line no-template-curly-in-string
      rst[propertyKey] = '${Date}';
      break;
    case 0:
    case 1:
    default:
      rst[propertyKey] = propertyValue;
      break;
  }
  return rst;
};

const castStringValueToOrigin = (value) => {
  if (typeof value === 'boolean') return +value;
  if (value === 'true') return 1;
  if (value === 'false') return 0;
  return value;
};

export const simplifyConfig = (config, credential) => {
  const {
    basicConfigs, serialConfigs, networkConfigs, networkSummary, config_version,
  } = config;
  const rst = {
    cred: [], net_sum: [], cfg_v: config_version, basic: [], serial: [], net: [],
  };

  Object.entries(credential).forEach(([, value]) => {
    rst.cred.push(castStringValueToOrigin(value));
  });

  Object.entries(networkSummary).forEach(([, value]) => {
    rst.net_sum.push(castStringValueToOrigin(value));
  });

  Object.entries(basicConfigs).forEach(([, value]) => {
    rst.basic.push(castStringValueToOrigin(value));
  });

  serialConfigs.forEach((cfg) => {
    const temp = [];
    Object.entries(cfg).forEach(([, value], idx) => {
      if (!cfg.autoPollEnabled && idx > 6) return;
      temp.push(castStringValueToOrigin(value));
    });
    rst.serial.push(temp);
  });

  networkConfigs.forEach((cfg) => {
    const temp = [];
    Object.entries(cfg).forEach(([key, value]) => {
      switch (key) {
        case 'transmissionDataType':
          temp.push(value[cfg.serialId]);
          break;
        case 'conversions': {
          if (cfg.transmissionDataType[cfg.serialId] === 0) break;
          const fields = [];
          value[cfg.serialId].forEach((obj) => {
            const arr = [];
            Object.entries(obj).forEach(([k, v]) => {
              if (k !== 'id') arr.push(v);
            });
            fields.push(arr);
          });
          temp.push(fields);
          break;
        }
        case 'commands':
          if (cfg.transmissionDataType[cfg.serialId] === 1) break;
          temp.push(value[cfg.serialId]);
          break;
        default:
          temp.push(castStringValueToOrigin(value));
          break;
      }
    });
    rst.net.push(temp);
  });
  return rst;
};

export const retrieveFromSimpleConfig = (simpleJson) => {
  const rst = getResetValues();

  Object.entries(rst.basicConfigs).forEach(([k, v], idx) => {
    if (k === 'credential') return;
    switch (typeof v) {
      case 'boolean':
        rst.basicConfigs[k] = Boolean(simpleJson.basic[idx]);
        break;
      case 'number':
        rst.basicConfigs[k] = Number(simpleJson.basic[idx]);
        break;
      case 'string':
      default:
        rst.basicConfigs[k] = simpleJson.basic[idx];
        break;
    }
  });

  // eslint-disable-next-line no-unused-vars
  Object.entries(rst.basicConfigs.credential).forEach(([k, v], idx) => {
    rst.basicConfigs.credential[k] = simpleJson.cred[idx].toString();
  });

  rst.serialConfigs.forEach((defaultCfg, idx) => {
    const simpleCfg = simpleJson.serial.find((arr) => (arr[0] === idx));
    if (simpleCfg) {
      Object.entries(rst.serialConfigs[idx]).forEach(([k, v], index) => {
        if (index >= simpleCfg.length) return;
        switch (typeof v) {
          case 'boolean':
            rst.serialConfigs[idx][k] = Boolean(simpleCfg[index]);
            break;
          case 'number':
            rst.serialConfigs[idx][k] = Number(simpleCfg[index]);
            break;
          case 'string':
          default:
            rst.serialConfigs[idx][k] = simpleCfg[index];
            break;
        }
      });
    }
  });

  rst.networkConfigs.forEach((defaultCfg, idx) => {
    const simpleCfg = simpleJson.net.find((arr) => (arr[0] === idx));
    const netTypeArr = ['socket', 'aliyun', 'mqtt', 'http', 'azure'];
    if (!simpleCfg) return;
    Object.entries(rst.networkConfigs[idx]).forEach(([k, v], index) => {
      if (netTypeArr.findIndex((type) => (type === k)) > -1) {
        if (k === netTypeArr[simpleCfg[2]]) {
          Object.entries(rst.networkConfigs[idx][k]).forEach(([k_type, v_type], idx_type) => {
            switch (typeof v_type) {
              case 'boolean':
                rst.networkConfigs[idx][k][k_type] = Boolean(simpleCfg[idx_type + 7]);
                break;
              case 'number':
                rst.networkConfigs[idx][k][k_type] = Number(simpleCfg[idx_type + 7]);
                break;
              case 'string':
              default:
                rst.networkConfigs[idx][k][k_type] = simpleCfg[idx_type + 7];
                break;
            }
          });
        }
      } else {
        switch (k) {
          case 'transmissionDataType': {
            const arr = [0, 0, 0];
            arr[Number(simpleCfg[3])] = Number(simpleCfg[index]);
            rst.networkConfigs[idx][k] = arr;
            break;
          }
          case 'conversions': {
            if (Number(simpleCfg[6]) === 0) break;
            const last_idx = simpleCfg.length - 1;
            const arr = [[], [], []];
            simpleCfg[last_idx]?.forEach((simpleArr) => {
              const defaultConv = {
                command: '',
                propertyName: '',
                address: 0,
                dataType: 0,
                order: 0,
                ratio: 1,
                deviation: 0,
              };
              Object.entries(defaultConv).forEach(([k_type, v_type], idx_type) => {
                switch (typeof v_type) {
                  case 'number':
                    defaultConv[k_type] = Number(simpleArr[idx_type]);
                    break;
                  case 'string':
                  default:
                    defaultConv[k_type] = simpleArr[idx_type];
                    break;
                }
              });
              defaultConv.id = getUid('simple');
              arr[Number(simpleCfg[3])].push(defaultConv);
              rst.networkConfigs[idx][k] = arr;
            });
            break;
          }
          case 'commands': {
            if (Number(simpleCfg[6]) === 1) break;
            const last_idx = simpleCfg.length - 1;
            const arr = [[], [], []];
            arr[Number(simpleCfg[3])] = simpleCfg[last_idx];
            rst.networkConfigs[idx][k] = arr;
            break;
          }
          default:
            switch (typeof v) {
              case 'boolean':
                rst.networkConfigs[idx][k] = Boolean(simpleCfg[index]);
                break;
              case 'number':
                rst.networkConfigs[idx][k] = Number(simpleCfg[index]);
                break;
              case 'string':
              default:
                rst.networkConfigs[idx][k] = simpleCfg[index];
                break;
            }
            break;
        }
      }
    });
  });
  return rst;
};

export const commandRowsToField_archived = (rows) => {
  const rst = [];
  rows?.forEach((row) => {
    const wrap = [row.id, row.detail.hex.join(''), +row.enableJson];
    if (row.enableJson) {
      const otherProps = [row.networkIds, row.propertyName,
        row.address, row.dataType, row.order, row.ratio, row.deviation];
      otherProps.forEach((prop) => { wrap.push(prop); });
    }
    rst.push([...wrap]);
  });
  return rst;
};

/**
 * @brief
 *  this is the function that convert table data into raw command data
 */
export const commandRowsToFields = (rows) => rows?.map((row) => (`${row.id}-${row.tag}-${row.detail.hex.join('')}`));

export const renderNetworkFields = (formikProps) => {
  const { type, aliyun } = formikProps.values;
  let fields;
  let typeName;
  switch (type) {
    case 4:
      fields = azureFields;
      typeName = 'azure';
      break;
    case 3:
      fields = httpFields;
      typeName = 'http';
      break;
    case 2:
      fields = mqttFields;
      typeName = 'mqtt';
      break;
    case 1:
      fields = aliyunFields;
      typeName = 'aliyun';
      break;
    case 0:
    default:
      fields = socketFields;
      typeName = 'socket';
      break;
  }
  const shouldUnmount = (field) => {
    const condition = (
      typeName === 'aliyun'
        && Number(aliyun.registerType) === 0
        && field.propertyName === 'productSecret'
    ) || (
      typeName === 'aliyun'
        && Number(aliyun.registerType) === 1
        && field.propertyName === 'deviceSecret'
    );
    return condition;
  };

  return (
    <>
      {fields.map((field) => (
        <Fragment key={field.propertyName}>
          {
            shouldUnmount(field) ? (<></>)
              : (
                <>
                  {
                    renderFields({
                      value: formikProps.values[typeName][field.propertyName],
                      name: `${typeName}.${field.propertyName}`,
                      handleChange: formikProps.handleChange,
                      ...field,
                    })
                  }
                </>
              )
          }
        </Fragment>
      ))}
    </>
  );
};
