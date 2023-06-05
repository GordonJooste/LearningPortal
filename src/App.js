import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect } from 'react';
import SinglePage from './singlepage';
import AllPages from './allpages';
import samplePDF from "./Welcome.pdf";

const App = () => {
  useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;});

  return (
    <div className="App">
      <h4>Single Page</h4>
      <SinglePage pdf={samplePDF} />
    </div>
  );
}

export default App;
