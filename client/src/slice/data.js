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

export const serialPortsListener = createAsyncThunk(
  'data/serialPortsListener',
  (cb) => {
    dataService.serialPortsListener(cb);
  },
);

const dataSlice = createSlice({
  name: 'deviceInfo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(writeLocalData.fulfilled, (state, action) => ({ ...action.payload }));
  },
});

const { reducer } = dataSlice;
export default reducer;
