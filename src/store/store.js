import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../counter/counterSlice';
import fileUploadReducer from '../slice/fileUploadSlice';
import canvasSlice from '../slice/canvasSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    fileUpload: fileUploadReducer,
    canvas: canvasSlice,
  },
});