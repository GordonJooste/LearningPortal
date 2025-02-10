import React from 'react';
import { pdfjs } from "react-pdf";
import { useEffect } from 'react';
import SinglePage from './components/singlepage';
import Canvas from './components/Canvas.js';
import FileUpload from './components/fileUpload.js';
import Countdown from './components/countdown.js';
import { useSelector } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
  }, []);
  const uploadedFile = useSelector((state) => state.fileUpload.uploadedFile);
  
  // only want Fileupload to display when no pdf is selected.
  // Singlepage and canvas should then display when pdf is selected
  
  if(uploadedFile){
    return (
      <div className="App">
        <h4>PDFDisplay</h4>
        <SinglePage pdf = {uploadedFile} />
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
