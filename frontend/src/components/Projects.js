import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProjects();
    } else {
      navigate('/login');
    }
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${user_id}/projects`, {
        params: {
          page: currentPage,
          per_page: projectsPerPage
        }
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${user_id}/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleUpdate = (id) => {
    axios.get(`http://localhost:3000/api/v1/users/${user_id}/projects/${id}`)
      .then(response => {
        localStorage.setItem('project', JSON.stringify(response.data));
        navigate(`/projects/${id}/edit`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleView = (id) => {
    axios.get(`http://localhost:3000/api/v1/users/${user_id}/projects/${id}`)
      .then(response => {
        localStorage.setItem('project', JSON.stringify(response.data));
        navigate(`/projects/${id}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <>
      <Link to={"/projects/new"}>
        <button type="button" className="mx-3 my-4 mr-5 btn btn-primary">+ New</button>
      </Link>
      {currentProjects.length === 0 ? (
        <h1 style={{ position: "relative" }} className={`text-${props.mode === 'light' ? 'dark' : 'light'} text-center`}>No projects found</h1>
      ) : (
        <table className={`my-4 table table-${props.mode === "dark" ? "" : "borderless"} table-${props.mode === 'dark' ? 'dark' : 'light'}`}>
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {currentProjects.map((project, index) => (
              <tr key={project.id}>
                <th scope="row">{indexOfFirstProject + index + 1}</th>
                <td>{project.name}</td>
                <td>{project.description.split(' ').slice(0, 11).join(' ')}...</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleView(project.id)}>View</button>
                  <button className="mx-3 btn btn-secondary" onClick={() => handleUpdate(project.id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {projects.length > projectsPerPage && (
        <nav className="pagination-container">
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => setCurrentPage(index + 1)} className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
