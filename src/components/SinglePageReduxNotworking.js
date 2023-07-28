import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useSelector, useDispatch } from 'react-redux';
import '../App.css';
import { PrevPage, SetPages, selectNumPages, selectPage,NextPage, SetInitialPage, selectCanvas, SetPage } from "../slice/canvasSlice";

//import "react-pdf/dist/esm/Page/TextLayer.css";

export default function SinglePage(props) {
  const dispatch = useDispatch();
  const numPages = useSelector(selectNumPages);
  const pageNumber = useSelector(selectPage);
  let currentPage = 1;
  console.log(`pageNumber ${pageNumber} and currentPage ${currentPage}`);
  useEffect(() => {
    if (numPages === null) {
      // If numPages is not set yet, fetch the value from the PDF document
      console.log('useEffect');
      fetchNumPages();
    }
  }, [numPages]);

  function fetchNumPages() {
    const { pdf } = props;
    const loadingTask = pdf && pdf.numPages ? Promise.resolve({ numPages: pdf.numPages }) : null;
    console.log('fetchingNumPages');
    if (loadingTask) {
      loadingTask.then(({ numPages }) => {
        console.log('dispatching');
        dispatch(SetPages(numPages));
      });
    }
  }
  function onDocumentLoadSuccess({ numPages: NumberOfPages }) {
    dispatch(SetPage({data:1}));
    currentPage = 1;
    console.log(NumberOfPages);
    console.log(pageNumber);
    dispatch(SetPages(NumberOfPages));
  }


  //function changePage(offset) {
  //  setPageNumber(prevPageNumber => prevPageNumber + offset);
  //}

  function previousPage() {
    dispatch(SetPage({data: currentPage-1}));
    currentPage = currentPage-1;
  }

  function nextPage() {
    dispatch(SetPage({data: currentPage+1}));
    currentPage = currentPage+1;
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
        <Page className = "Page" pageNumber={currentPage} renderTextLayer={false} />
      </Document>
      <div className="form-group">
        <p>
          Page {currentPage || (numPages ? 1 : "--")} of {numPages || "--"}
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