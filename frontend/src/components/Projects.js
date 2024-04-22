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
      <Link to={"/projects/new"}>
        <button type="button" className="mx-3 my-4 mr-5 btn btn-primary">+ New</button>
      </Link>
      {projects.length === 0 ? (
        <h1 style={{ position: "relative" }} className={`text-${props.mode === 'light' ? 'dark' : 'light'} text-center`}>No projects found</h1>
      ) : (
        <table className={`my-2 table table-${props.mode === "dark" ? "" : "borderless"} table-${props.mode === 'dark' ? 'dark' : 'light'}`}>
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {projects.map((project, index) => (
              <tr key={project.id}>
                <th scope="row">{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
