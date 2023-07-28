import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clearCanvas: false,
  pageNumber: 1,
  numPages: null,
  color: '#FF0000',
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
    NextPage: (state) => {
      console.log('Nextpage');
      if (state.pageNumber + 1 <= state.numPages) {
        state.pageNumber = state.pageNumber + 1;
      } else {
        state.pageNumber = 1; // If reached last page, go back to the first page
      }
    },
    PrevPage: (state) => {
      console.log('Prevpage');
      if (state.pageNumber - 1 >= 1) {
        state.pageNumber = state.pageNumber - 1;
      } else {
        state.pageNumber = state.numPages; // If on the first page, go to the last page
      }
    },
    
    SetPage: (state,action) =>{
      console.log('Initial Page Set');
      state.pageNumber = action.payload.data;
    },
    SetPages: (state,action) =>{
      console.log('Page total set');
      state.numPages = action.payload;
    },
    SetColor: (state, action) => {
      console.log('Color set');
      state.color = action.payload.data;
    }
    

  },
});

export const { ToggleClear, NextPage, PrevPage, SetPages, SetPage, SetColor } = canvasSlice.actions;
export const selectCanvas = (state) => state;
export const selectPage = (state) => state.pageNumber;
export const selectNumPages = (state) => state.numPages;
export const selectColor = (state) => state.color;

export default canvasSlice.reducer;
