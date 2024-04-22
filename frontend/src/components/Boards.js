import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Boards(props) {

  const projectId = JSON.parse(localStorage.getItem('project')).id;
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards`
        );
        setBoards(response.data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, [projectId, user_id]);

  return (
    <>
      <Link to={`/projects/${projectId}/boards/new`}>
        <button type="button" className="mx-3 my-4 mr-5 btn btn-primary">+ New</button>
      </Link>
      <div className="row mx-4">
        {boards.map(board => (
          <div className={`col-md-${Math.floor(12 / boards.length)}`} key={board.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">{board.status}</h3>
                <p className="card-text">{board.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
