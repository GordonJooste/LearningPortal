import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../counter/counterSlice';
import fileUploadReducer from '../fileupload/fileUploadSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    fileUpload: fileUploadReducer,
  },
});