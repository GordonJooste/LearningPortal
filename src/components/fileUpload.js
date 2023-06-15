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

  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      
    </div>
  );
}

export default FileUploader;
