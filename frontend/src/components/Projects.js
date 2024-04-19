import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Projects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (props.token) {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${props.user.id}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <>
     {projects.length === 0 ? (
        <h1 className={`my-5 text-${props.mode === 'light' ? 'dark' : 'light'} text-center`}>No projects found</h1>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      )} 
    </>
  )
}
