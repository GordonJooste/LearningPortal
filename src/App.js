import React from 'react';
import { pdfjs } from "react-pdf";
import { useEffect } from 'react';
import SinglePage from './components/singlepage';
import Canvas from './components/Canvas';
import FileUpload from './components/fileUpload';
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
        <Canvas />
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
