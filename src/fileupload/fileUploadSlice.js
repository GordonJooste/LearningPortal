// fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  uploadedFile: null,
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    uploadFile: (state, action) => {
      console.log('in slice:')
      console.log(action.payload);
      state.uploadedFile = action.payload;
    },
  },
});

export const { uploadFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
