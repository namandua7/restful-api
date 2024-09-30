import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditProject(props) {

  const [name, setname] = useState(localStorage.getItem('project') ? JSON.parse(localStorage.getItem('project')).name : '');
  const [description, setDescription] = useState(localStorage.getItem('project') ? JSON.parse(localStorage.getItem('project')).description : '');
  const id = localStorage.getItem('project') ? JSON.parse(localStorage.getItem('project')).id : null;
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/users/${user_id}/projects/${id}`,
        { name, description, user_id }
      );
      console.log(response.data);
      localStorage.removeItem('project');
      navigate('/projects');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
    <div className="container my-5">
      <form className={`text-${props.mode === 'light' ? 'dark' : 'light'}`} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Name</label>
          <textarea  style={{height:"20px"}} className="form-control" id="exampleFormControlTextarea1" rows="3" value={name}onChange={(e) => setname(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description}onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    </>
  )
}
