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

const dataSlice = createSlice({
  name: 'credentialAndConfig',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        readLocalData.fulfilled,
        (state, action) => {
          const { fileName } = action.meta.arg;
          if (fileName === 'credential') return ({ ...state, credential: JSON.parse(action.payload) });
          return ({ ...state, ...JSON.parse(action.payload) });
        },
      );
  },
});

const { reducer } = dataSlice;
export default reducer;
