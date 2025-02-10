import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../fileupload/fileUploadSlice';

export default function FileUpload() {
    const [fileState, setFileState] = useState({lessonPDF: ''});
    const dispatch = useDispatch();

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFileState({ lessonPDF: file });
        
        // Create URL for the file
        const fileUrl = URL.createObjectURL(file);
        dispatch(uploadFile(fileUrl));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="form-group">
                    <input type="file" accept=".pdf" onChange={onFileChange} />
                </div>
            </div>
        </div>
    )
}
