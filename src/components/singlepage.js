import React, { useState, useCallback, useRef, useMemo } from "react";
import { Document, Page } from "react-pdf";
import Canvas from "./Canvas";
import Countdown from "./countdown";
import Stopwatch from "./stopwatch";
import '../App.css';

// Memoize the Document and Page components to prevent unnecessary re-renders
const MemoizedDocument = React.memo(Document);
const MemoizedPage = React.memo(Page);

export default function SinglePage(props) {
  const [selectedColor, setSelectedColor] = useState('red');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const canvasRef = useRef(null);

  // Memoize the color change handler
  const handleColorChange = useCallback((newColor) => {
    console.log('Color change requested to:', newColor);
    setSelectedColor(newColor);
  }, []);

  // Memoize the document load success handler
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  // Memoize the page change handlers
  const previousPage = useCallback(() => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }, []);

  const nextPage = useCallback(() => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  }, [numPages]);

  // Handle erase button click
  const handleErase = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.erase(); // Call the erase function via ref
    }
  }, []);

  // Memoize the PDF options to prevent re-renders
  const pdfOptions = useMemo(() => ({ workerSrc: "/pdf.worker.js" }), []);

  const { pdf } = props;
  const colors = useMemo(() => [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Black', value: 'black' }
  ], []);

  return (
    <div className="SinglePage">
      <Canvas ref={canvasRef} color={selectedColor} />
      <div className="pdf-container">
        <div className="pdf-page canvas-container">
          <MemoizedDocument
            className="Document"
            file={pdf}
            options={pdfOptions}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <MemoizedPage className="Page" pageNumber={pageNumber} renderTextLayer={false} />
          </MemoizedDocument>
        </div>
      </div>
      <div className="controls form-group">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <div className="button-group">
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
          <button
            className="btn btn-secondary"
            onClick={() => setShowCountdown(!showCountdown)}
          >
            {showCountdown ? "Hide Countdown" : "Show Countdown"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowStopwatch(!showStopwatch)}
          >
            {showStopwatch ? "Hide Stopwatch" : "Show Stopwatch"}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleErase}
          >
            Erase
          </button>
          </div>
      </div>
      <div className={`countdown-sidebar ${showCountdown ? '' : 'hidden'}`}>
        <Countdown key="countdown" /> {}
      </div>
      <div className={`stopwatch-sidebar ${showStopwatch ? '' : 'hidden'}`}>
        <Stopwatch key="stopwatch" />
      </div>
    </div>
  );
}