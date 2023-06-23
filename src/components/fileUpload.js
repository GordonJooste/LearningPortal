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
    
  }

  

  return (
    <div className='container'>
      <form className='form-group' >
        <input id="file" name="file" type="file" onChange={handleFileChange} />
        <button className='btn btn-primary' type='submit' >Upload</button>
      </form>      
    </div>
  );
}

export default FileUploader;
