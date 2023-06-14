import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../fileupload/fileUploadSlice';

function FileUploader() {
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const filePath = URL.createObjectURL(file); // Generate a URL for the file
    dispatch(uploadFile(filePath));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploader;
