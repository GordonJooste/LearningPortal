import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../fileupload/fileUploadSlice';
import axios from 'axios';

function FileUploader() {
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    dispatch(uploadFile(file));
    
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const form = event.currentTarget;
    
    const url = new URL(form.action);
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);
    console.log(formData);
    /** @type {Parameters<fetch>[1]} */
    const fetchOptions = {
      method: form.method,
    };
    
    if (form.method.toLowerCase() === 'post') {
      if (form.enctype === 'multipart/form-data') {
        fetchOptions.body = formData;
      } else {
        fetchOptions.body = searchParams;
      }
    } else {
      url.search = searchParams;
    }
    console.log(fetchOptions);
    console.log(url);
    fetch(url, fetchOptions);

    event.preventDefault();


    /*const file = event.target.files[0];

    const data = new FormData()
    data.append('file', file)
    axios.post("http://localhost:8000/upload", data, { 
       // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
     console.log(res.statusText)
    })*/
  }

  

  return (
    <div>
      <form action="/api" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label for="file">File</label>
        <input id="file" name="file" type="file" onChange={handleFileChange} />
        <button>Upload</button>
      </form>      
    </div>
  );
}

export default FileUploader;
