import React, { useState } from 'react'
import {fileUploading} from '../helpers'

export default function index() {

  const [file, setFile] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fileUploading(file);
    } catch (error: any) {
      console.error('Error submitting form:', error);
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <button type="button" className="mx-5 my-5 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
       + FileUploader
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Understood</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
