import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Boards() {
  const projectId = JSON.parse(localStorage.getItem('project')).id;
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();
  const [currentBoardId, setCurrentBoardId] = useState(null);

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

  const handleSubmit = async (e, boardId) => {
    e.preventDefault();
    if (!currentBoardId) return;
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${currentBoardId}/tasks`,
        { title, description, board_id: currentBoardId, created_by: JSON.parse(localStorage.getItem('user')).name }
      );
      console.log(response.data);
      setShowModal(false);
      setTitle('');
      setDescription('');
      history.push(`/projects/${projectId}/boards`);
      window.location.reload();
    } catch (error) {
      console.error(`Error deleting board ${currentBoardId}:`, error);
    }
  };

  useEffect(() => {
    const fetchTasksForBoard = async (boardId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${boardId}/tasks`
        );
        const updatedBoards = boards.map(board => {
          if (board.id === boardId) {
            return { ...board, tasks: response.data };
          }
          return board;
        });
        setBoards(updatedBoards);
      } catch (error) {
        console.error(`Error fetching tasks for board ${boardId}:`, error);
      }
    };

    boards.forEach(board => {
      if (!board.tasks) {
        fetchTasksForBoard(board.id);
      }
    });
  }, [boards, projectId, user_id]);

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
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!showModal}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <form onSubmit={(e) => handleSubmit(e, board.id)}>
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Task</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" value={title}onChange={(e) => setTitle(e.target.value)} required />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" value={description}onChange={(e) => setDescription(e.target.value)} required></textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary">Create Task</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="plus_container mb-2">
                  <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setCurrentBoardId(board.id)}></button>
                </div>
                {board.tasks && (
                  <div className="overflow-auto">
                    {board.tasks.map(task => (
                      <div className="card mb-3" key={task.id}>
                        <div className="card-header">{task.title}</div>
                        <div className="card-body">
                          <blockquote className="blockquote mb-0">
                            <p>{task.description.split(' ').slice(0, 6).join(' ')}...</p>
                            <footer className="blockquote-footer">{task.created_by}</footer>
                          </blockquote>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
