// fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedFilePath: null,
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    uploadFile: (state, action) => {
      state.uploadedFilePath = action.payload;
    },
  },
});

export const { uploadFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
