import React, { memo,useMemo, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";


const PDFViewer = memo(({ pdf, pageNumber, onDocumentLoadSuccess }) => {
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(".pdf-page.canvas-container");
      if (container) {
        console.log("Container width:", container.clientWidth); // Debugging
        setContainerWidth(container.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const pdfOptions = useMemo(() => ({ workerSrc: "/pdf.worker.js" }), []);

  return (
    <div className="pdf-page canvas-container">
      <Document
        className="Document"
        file={pdf}
        options={pdfOptions}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          key={`page-${pageNumber}-${containerWidth}`} // Force re-render
          className="Page"
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={Number(containerWidth)} // Ensure it's a number
        />
      </Document>
    </div>
  );
});

export default PDFViewer;
