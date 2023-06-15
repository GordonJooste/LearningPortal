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
      const data = new FormData()
      data.append('file', action.payload)
    axios.post("http://localhost:8000/upload", data, { 
       // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
     console.log(res.statusText)
    })
    },
  },
});

export const { uploadFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
