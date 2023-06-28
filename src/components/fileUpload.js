import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../fileupload/fileUploadSlice';
import axios from 'axios';

export default class FileUpload extends Component {
  constructor(props) {
      super(props);
      this.onFileChange = this.onFileChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
          lessonPDF: ''
      }
  }

  mapDispatchToProps = () => ({ 
    uploadFile,
    });
  
  onFileChange(e) {
      this.setState({ lessonPDF: e.target.files[0] })
  }
  onSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      //dispatch(uploadFile(this.state.lessonPDF));
      formData.append('lessonPDF', this.state.lessonPDF)
      axios.post("http://localhost:4000/api/user-profile", formData, {
      }).then(res => {
          console.log(res)
      })
  }

  render() {
      return (
          <div className="container">
              <div className="row">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <input type="file" onChange={this.onFileChange} />
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary" type="submit">Upload</button>
                      </div>
                  </form>
              </div>
          </div>
      )
  }
}