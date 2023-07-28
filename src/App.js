import React, {useState} from 'react';
import { pdfjs } from "react-pdf";
import { useEffect } from 'react';
import SinglePage from './components/Singlepage';
import Canvas from './components/Canvas.js';
import FileUpload from './components/FileUpload';
import samplepdf from './backend/public/ChiCV.pdf'
import Timer from './components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { selectCanvas, ToggleClear } from './slice/canvasSlice';
import Sidebar from './components/Sidebar';

const App = () => {
  useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;});
  const dispatch = useDispatch();
  const uploadedFile = useSelector((state) => state.fileUpload.uploadedFile);
  
  // only want Fileupload to display when no pdf is selected.
  // Singlepage and canvas should then display when pdf is selected
  const thunk = () =>{
    console.log('thunking');
    dispatch(ToggleClear());
  }  

  const test = true;
  if(uploadedFile){
    return (
      <div className="App">
        <h4>PDFDisplay</h4>
        
        <Canvas />
        <SinglePage pdf = {uploadedFile} />
      </div>
    );
  }
  else if(test){
    return (
      <div className="App">
        <h4>PDFDisplay</h4>
        <Sidebar />
        <Canvas />
        <SinglePage pdf = {samplepdf} />
        
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <h4>UploadPage</h4>
        <FileUpload />
      </div>
    );  
  }
}

export default App;
