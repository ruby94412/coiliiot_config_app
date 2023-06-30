import { configureStore } from '@reduxjs/toolkit';
import dataReducer from 'slice/data';

const reducer = {
  data: dataReducer,
};
export default configureStore({
  reducer,
  devTools: true,
});
