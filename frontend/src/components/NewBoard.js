import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewBoard(props) {

  const navigate = useNavigate();
  const [status, setstatus] = useState('');
  const [description, setDescription] = useState('');
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const projectId = JSON.parse(localStorage.getItem('project')).id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/users/${user_id}/projects/${projectId}/boards`,
        { status, description, project_id: projectId }
      );
      console.log(response.data);
      navigate(`/projects/${projectId}/boards`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
    <div className={`container mt-5 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Status</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" value={status} onChange={(e) => setstatus(e.target.value)} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
    </>
  )
}
