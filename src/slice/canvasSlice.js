import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clearCanvas: false,
  pageNumber: 1,
  numPages: null,
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
    SetInitialPage: (state,action) =>{
      console.log('Initial Page Set');
      state.pageNumber = action.payload;
    },
    SetPages: (state,action) =>{
      console.log('Page total set');
      state.numPages = action.payload;
    }
    

  },
});

export const { ToggleClear, NextPage, PrevPage, SetPages, SetInitialPage } = canvasSlice.actions;
export const selectCanvas = (state) => state;
export const selectPage = (state) => state.pageNumber;
export const selectNumPages = (state) => state.numPages;

export default canvasSlice.reducer;
