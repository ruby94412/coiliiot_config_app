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

export const enableUpdate = createAsyncThunk(
  'data/enableUpdate',
  async () => {
    const res = await dataService.enableUpdate();
    return res;
  },
);

export const downloadUpdate = createAsyncThunk(
  'data/downloadUpdate',
  async () => {
    const res = await dataService.downloadUpdate();
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
              return ({ ...state, appSetting: JSON.parse(action.payload) });
            case 'credential':
              return ({ ...state, credential: JSON.parse(action.payload) });
            case 'config':
            default:
              return ({ ...state, ...JSON.parse(action.payload) });
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
              return ({ ...state, ...data });
          }
        },
      );
  },
});

const { reducer } = dataSlice;
export default reducer;
