import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SinglePage from './components/singlepage';
import samplePDF from "./Welcome.pdf";
import Canvas from './components/Canvas';
import FileUpload from './components/fileUpload';
import { Counter } from './counter/counter';

const App = () => {
  useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;});

  return (
    <div className="App">
      <h4>Single Page</h4>      
      
      <Counter/>
    </div>



  );
}

export default App;
