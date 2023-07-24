import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useSelector, useDispatch } from 'react-redux';
import '../App.css';
import { PrevPage, SetPages, selectNumPages, selectPage,NextPage, SetInitialPage } from "../slice/canvasSlice";

//import "react-pdf/dist/esm/Page/TextLayer.css";

export default function SinglePage(props) {
  const dispatch = useDispatch();
  const numPages = useSelector(selectNumPages);
  const pageNumber = useSelector(selectPage);
  let currentPage = 1;
  useEffect(() => {
    if (numPages === null) {
      // If numPages is not set yet, fetch the value from the PDF document
      fetchNumPages();
    }
  }, [numPages]);

  function fetchNumPages() {
    const { pdf } = props;
    const loadingTask = pdf && pdf.numPages ? Promise.resolve({ numPages: pdf.numPages }) : null;

    if (loadingTask) {
      loadingTask.then(({ numPages }) => {
        dispatch(SetPages(numPages));
      });
    }
  }
  function onDocumentLoadSuccess({ numPages: NumberOfPages }) {
    dispatch(SetInitialPage(1));
    console.log(NumberOfPages);
    console.log(pageNumber);
    dispatch(SetPages(NumberOfPages));
  }


  //function changePage(offset) {
  //  setPageNumber(prevPageNumber => prevPageNumber + offset);
  //}

  function previousPage() {
    dispatch(PrevPage());
  }

  function nextPage() {
    dispatch(NextPage());
  }

  const { pdf } = props;

  return (
    <div className="SinglePage">
      
      <Document
        className="Document"
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page className = "Page" pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
      <div className="form-group">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button className="btn btn-primary" type="button"  onClick={previousPage}>
          Previous
        </button>
        <button
        className="btn btn-primary"
          type="button"
          
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}