import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SinglePage from './components/singlepage';
import samplePDF from "./Welcome.pdf";
import Canvas from './components/Canvas';
import FileUpload from './components/fileUpload';
import { Counter } from './counter/counter';
import { useSelector } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;});
  const uploadedFile = useSelector((state) => state.fileUpload.uploadedFile);
  // only want Fileupload to display when no pdf is selected.
  // Singlepage and canvas should then display when pdf is selected

  if(uploadedFile){
    return (
      <div className="App">
        <h4>PDFDisplay</h4>
        <SinglePage />
        <Canvas />
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
