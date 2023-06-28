import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../fileupload/fileUploadSlice';
import axios from 'axios';

export default function FileUpload() {
    const [fileState,setFileState] = useState({lessonPDF: ''});
    const dispatch = useDispatch();

    const onFileChange = (e) => {
      setFileState({ lessonPDF: e.target.files[0] })
    }
    const onSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      
      formData.append('lessonPDF', fileState.lessonPDF)
      axios.post("http://localhost:4000/api/user-profile", formData, {
      }).then(res => {
          console.log(res)
          dispatch(uploadFile(res.data.userCreated));
      })
    }

    return (
          <div className="container">
              <div className="row">
                  <form onSubmit={onSubmit}>
                      <div className="form-group">
                          <input type="file" onChange={onFileChange} />
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary" type="submit">Upload</button>
                      </div>
                  </form>
              </div>
          </div>
    )
}