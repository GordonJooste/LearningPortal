import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import Canvas from "./Canvas";
import '../App.css';

//import "react-pdf/dist/esm/Page/TextLayer.css";

export default function SinglePage(props) {
  const [selectedColor, setSelectedColor] = useState('red');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  

  const handleColorChange = (newColor) => {
    console.log('Color change requested to:', newColor);
    setSelectedColor(newColor);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(+1);
  }

  const { pdf } = props;
  const colors = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Black', value: 'black' }
  ];

  return (
    <div className="SinglePage">
      <Canvas color={selectedColor} />
      <div className="pdf-container">
        <div className="pdf-page canvas-container">
            <Document
              className="Document"
              file={pdf}
              options={{ workerSrc: "/pdf.worker.js" }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page className="Page" pageNumber={pageNumber} renderTextLayer={false} />
            </Document>
            
          </div>
      </div>
      <div className=" controls form-group">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button className="btn btn-primary" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
        className="btn btn-primary"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        <div className="color-controls">
          {colors.map((color) => (
            <button
              key={color.value}
              className="btn btn-primary color-btn"
              style={{
                backgroundColor: color.value,
                margin: '0 5px'
              }}
              onClick={() => handleColorChange(color.value)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}