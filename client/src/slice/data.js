import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataService from 'services/dataService';

const initialState = {};

export const readLocalData = createAsyncThunk(
  'data/readLocalData',
  async (data) => {
    const res = await dataService.readLocalData(data);
    return res;
  },
);

export const writeLocalData = createAsyncThunk(
  'data/writeLocalData',
  async (data) => {
    const res = await dataService.writeLocalData(data);
    return res;
  },
);

export const connectPort = createAsyncThunk(
  'data/connectPort',
  async (data) => {
    const res = await dataService.connectPort(data);
    return res;
  },
);

export const fetchFirmwareVersion = createAsyncThunk(
  'data/fetchFirmwareVersion',
  async (data) => {
    const res = await dataService.fetchFirmwareVersion(data);
    return res;
  },
);

export const flashConnect = createAsyncThunk(
  'data/flashConnect',
  async (data) => {
    const res = await dataService.flashConnect(data);
    return res;
  },
);

export const disconnectPort = createAsyncThunk(
  'data/disconnectPort',
  async (data) => {
    const res = await dataService.disconnectPort(data);
    return res;
  },
);

export const sendMsgToPort = createAsyncThunk(
  'data/sendMsgToPort',
  async (data) => {
    const res = await dataService.sendMsgToPort(data);
    return res;
  },
);

export const restartPort = createAsyncThunk(
  'data/restartPort',
  async (data) => {
    const res = await dataService.restartPort(data);
    return res;
  },
);

export const downloadFirmware = createAsyncThunk(
  'data/downloadFirmware',
  async (data) => {
    const res = await dataService.downloadFirmware(data);
    return res;
  },
);

export const getFlashingFile = createAsyncThunk(
  'data/getFlashingFile',
  async (data) => {
    const res = await dataService.getFlashingFile(data);
    return res;
  },
);

export const enableUpdate = createAsyncThunk(
  'data/enableUpdate',
  async () => {
    const res = await dataService.enableUpdate();
    return res;
  },
);

export const downloadAppUpdate = createAsyncThunk(
  'data/downloadUpdate',
  async () => {
    const res = await dataService.downloadAppUpdate();
    return res;
  },
);

export const fetchLatestFirmwareInfo = createAsyncThunk(
  'data/fetchLatestFirmwareInfo',
  async () => {
    const res = await dataService.fetchLatestFirmwareInfo();
    return res;
  },
);

export const openExternalLink = createAsyncThunk(
  'data/openExternalLink',
  async (data) => {
    const res = await dataService.openExternalLink(data);
    return res;
  },
);

export const serialPortsListener = createAsyncThunk(
  'data/serialPortsListener',
  (cb) => {
    dataService.serialPortsListener(cb);
  },
);

export const serialDataListener = createAsyncThunk(
  'data/serialDataListener',
  (cb) => {
    dataService.serialDataListener(cb);
  },
);

export const updateListener = createAsyncThunk(
  'data/updateListener',
  (cb) => {
    dataService.updateListener(cb);
  },
);

export const firmwareDownloadListener = createAsyncThunk(
  'data/firmwareDownloadListener',
  (cb) => {
    dataService.firmwareDownloadListener(cb);
  },
);

export const emitConsoleConnect = createAsyncThunk(
  'data/emitConsoleConnect',
  (connectOperation) => (connectOperation),
);

export const emitFlashConnect = createAsyncThunk(
  'data/emitFlashConnect',
  (connectOperation) => (connectOperation),
);

export const setDeviceConfig = createAsyncThunk(
  'data/setDeviceConfig',
  (deviceConfig) => (deviceConfig),
);

const dataSlice = createSlice({
  name: 'credentialAndConfig',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        readLocalData.fulfilled,
        (state, action) => {
          const { fileName } = action.meta.arg;
          switch (fileName) {
            case 'appSetting':
              return ({ ...state, appSetting: action?.payload || null });
            case 'credential':
              return ({ ...state, credential: action?.payload || null });
            case 'config':
            default:
              return ({ ...state, config: action?.payload });
          }
        },
      )
      .addCase(
        writeLocalData.fulfilled,
        (state, action) => {
          const { fileName, data } = action.meta.arg;
          switch (fileName) {
            case 'appSetting':
              return ({ ...state, appSetting: data });
            case 'credential':
              return ({ ...state, credential: data });
            case 'config':
            default:
              return ({ ...state, config: data });
          }
        },
      )
      .addCase(
        emitConsoleConnect.fulfilled,
        (state, action) => ({ ...state, connectionStatus: { ...action.payload } }),
      )
      .addCase(
        emitFlashConnect.fulfilled,
        (state, action) => ({ ...state, connectionStatus: { ...action.payload } }),
      )
      .addCase(
        setDeviceConfig.fulfilled,
        (state, action) => ({ ...state, deviceConfig: { ...action.payload } }),
      )
      .addCase(
        fetchLatestFirmwareInfo.fulfilled,
        (state, action) => ({ ...state, latestFirmware: { ...action.payload } }),
      )
      .addCase(
        fetchFirmwareVersion.fulfilled,
        (state, action) => ({ ...state, firmwareVersion: action.payload }),
      );
  },
});

const { reducer } = dataSlice;
export default reducer;
