import React, { memo } from "react";
import { Document, Page } from "react-pdf";

const pdfViewer = memo(({ pdf, pageNumber, onDocumentLoadSuccess }) => {
  return (
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
  );
});

export default pdfViewer;