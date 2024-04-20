import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Projects(props) {
  const [projects, setProjects] = useState([]);
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProjects();
    }
    else {
      navigate('/login');
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${user_id}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <>
    <Link to={"/projects/new"}><button type="button" style={{position:"absolute"}} className="my-4 mx-5 btn btn-primary">+ New</button></Link>
     {projects.length === 0 ? (
        <h1 className={`my-5 text-${props.mode === 'light' ? 'dark' : 'light'} text-center`}>No projects found</h1>
      ) : (
        <ul>
          {}
        </ul>
      )} 
    </>
  )
}
