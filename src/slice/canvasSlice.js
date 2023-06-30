import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clearCanvas: false,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    ToggleClear: (state) => {
      console.log('ClearCanvas:');
      if(state.clearCanvas){
        state.clearCanvas = false;
      }
      else{
        state.clearCanvas = true;
      }
    },
  },
});

export const { ToggleClear } = canvasSlice.actions;
export const selectCanvas = (state) => state;

export default canvasSlice.reducer;
