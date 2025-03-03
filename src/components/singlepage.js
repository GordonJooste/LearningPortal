import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import Canvas from "./gateCanvas";
import Countdown from "./countdown";
import Stopwatch from "./stopwatch";
import PDFViewer from "./pdfViewer"; 
import '../App.css';

// Memoize the Document and Page components to prevent unnecessary re-renders

export default function SinglePage(props) {
  const [selectedColor, setSelectedColor] = useState('red');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [pdfHeight, setPdfHeight] = useState(0);
  const [penSize, setPenSize] = useState(5);
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

  const increasePenSize = useCallback(() => {
    setPenSize(prev => Math.min(prev + 2, 50)); // Max size of 50
  }, []);

  const decreasePenSize = useCallback(() => {
    setPenSize(prev => Math.max(prev - 2, 1)); // Min size of 1
  }, []);

  // Memoize the page change handlers
  const previousPage = useCallback(() => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }, []);

  const nextPage = useCallback(() => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  }, [numPages]);

  useEffect(() => {
    const updateDimensions = () => {
      const pdfElement = document.querySelector('.pdf-page');
      if (pdfElement) {
        setPdfHeight(pdfElement.scrollHeight);
        console.log('PDF height:', pdfElement.scrollHeight);
      }
    };
  
    // Create an observer to watch for changes in the PDF element
    const observer = new MutationObserver((mutations) => {
      updateDimensions();
    });
  
    // Start observing the PDF container
    const pdfContainer = document.querySelector('.pdf-container');
    if (pdfContainer) {
      observer.observe(pdfContainer, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [pageNumber]);

  // Handle erase button click
  const handleErase = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.erase(); // Call the erase function via ref
    }
  }, []);

  const toggleEraser = useCallback(() => {
    setIsEraser(prev => !prev);
  }, []);

  // Memoize the PDF options to prevent re-renders
  const pdfOptions = useMemo(() => ({ workerSrc: "/pdf.worker.js" }), []);

  const { pdf } = props;
  const colors = useMemo(() => [
    { name: 'R', value: 'red' },
    { name: 'B', value: 'blue' },
    { name: 'G', value: 'green' },
    { name: 'B', value: 'black' }
  ], []);

  return (
    <div className="SinglePage">
      <div className="pdf-scroll-container">
        <div className="pdf-container" style={{ position: 'relative' }}>
          <PDFViewer
            pdf={pdf}
            pageNumber={pageNumber}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
          <Canvas 
            ref={canvasRef} 
            color={selectedColor}
            width={document.querySelector('.pdf-container')?.clientWidth}
            height={pdfHeight}
            isEraser={isEraser}
            penSize={penSize}
            />
        </div>
      </div>
      <div className="controls form-group">
        
        <div className="button-group">
          
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
          <div className="pen-controls">
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
            <div className="pen-size-controls" style={{ display: 'inline-block', margin: '0 10px' }}>
              <button
                className="btn btn-primary"
                onClick={increasePenSize}
                style={{ margin: '0 5px' }}
              >
                +
              </button>
              <span style={{ margin: '0 5px' }}>Size: {penSize}</span>
              <button
                className="btn btn-primary"
                onClick={decreasePenSize}
                style={{ margin: '0 5px' }}
              >
                -
              </button>
            </div>
            <button
              className={`btn ${isEraser ? 'btn-warning' : 'btn-secondary'}`}
              onClick={toggleEraser}
            >
              {isEraser ? 'Drawing Mode' : 'Eraser Mode'}
            </button>
            <button
              className="btn btn-danger"
              onClick={handleErase}
            >
              Clear All
            </button>
          </div>
          <div className = "page-controls">
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
          </div>
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
