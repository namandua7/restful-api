import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Projects(props) {
  const [projects, setProjects] = useState([]);
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
      const response = await axios.get(`http://localhost:3000/api/v1/users/${props.user.id}/projects`);
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
          {projects.map((project) => (
            <div className="card" style="width: 18rem;">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          ))}
        </ul>
      )} 
    </>
  )
}
