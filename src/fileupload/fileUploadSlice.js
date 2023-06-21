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
      state.uploadedFile = action.payload;
    },
  },
});

export const { uploadFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
