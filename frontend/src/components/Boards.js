import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Boards(props) {
  const projectId = JSON.parse(localStorage.getItem('project')).id;
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [task, setTask] = useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/users'
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (boardId, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${boardId}/tasks/${id}`
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEdit = async (boardId, id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${boardId}/tasks/${id}`,
        { title, description }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentBoardId) return;
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${currentBoardId}/tasks`,
        { title, description, board_id: currentBoardId, created_by: JSON.parse(localStorage.getItem('user')).name }
      );
      console.log(response.data);
      const updateProjectTaskCount = await axios.put(
        `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}`,
        { tasks_count: JSON.parse(localStorage.getItem('project')).tasks_count + 1 }
      )
      localStorage.setItem('project', JSON.stringify(updateProjectTaskCount.data));
      console.log(updateProjectTaskCount.data);
      setShowModal(false);
      setTitle('');
      setDescription('');
      window.location.reload();
    } catch (error) {
      console.error(`Error deleting board ${currentBoardId}:`, error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const task = boards.find(board => board.tasks.some(task => task.id.toString() === draggableId)).tasks.find(task => task.id.toString() === draggableId);
    if (source.droppableId === destination.droppableId) {
      const updatedBoard = boards.find(board => board.id.toString() === source.droppableId);
      const tasks = Array.from(updatedBoard.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      const updatedBoards = boards.map(board => {
        if (board.id.toString() === source.droppableId) {
          return { ...board, tasks };
        }
        return board;
      });
      setBoards(updatedBoards);
    } else {
      try {
        await axios.put(
          `http://localhost:3000/api/v1/users/${user_id}/projects/${projectId}/boards/${destination.droppableId}/tasks/${draggableId}`,
          { board_id: destination.droppableId }
        );
        const sourceBoard = boards.find(board => board.id.toString() === source.droppableId);
        const sourceTasks = Array.from(sourceBoard.tasks);
        const [removed] = sourceTasks.splice(source.index, 1);
        const destinationBoard = boards.find(board => board.id.toString() === destination.droppableId);
        const destinationTasks = Array.from(destinationBoard.tasks);
        destinationTasks.splice(destination.index, 0, { ...task, board_id: destination.droppableId });
        const updatedBoards = boards.map(board => {
          if (board.id.toString() === source.droppableId) {
            return { ...board, tasks: sourceTasks };
          } else if (board.id.toString() === destination.droppableId) {
            return { ...board, tasks: destinationTasks };
          }
          return board;
        });
        setBoards(updatedBoards);
      } catch (error) {
        console.error('Error updating task board_id:', error);
      }
    }
  };  

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Link to={`/projects/${projectId}/boards/new`} className="mr-auto">
          <button type="button" className="mx-3 my-4 btn btn-primary">+ New</button>
        </Link>
        <h1 style={{ margin: "0 auto" }} className={`text-center text-${props.mode==='light'?'dark':'light'}`}>{JSON.parse(localStorage.getItem('project')).name}</h1>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row mx-4">
          {boards.map((board, index) => (
            <Droppable droppableId={board.id.toString()} key={board.id}>
              {(provided) => (
                <div
                  className={`col-md-${Math.floor(12 / boards.length)}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={`bg-${props.mode==='light'?'light':'dark'} text-${props.mode==='light'?'dark':'light'} card mb-4`}>
                    <div className={`card-body`}>
                      <h3 className="card-title">{board.status}</h3>
                      <p className="card-text">{board.description}</p>
                      <div className={`plus_container mb-2`}>
                        <button type="button" className={`btn-close cross-to-plus`} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setCurrentBoardId(board.id)}></button>
                      </div>
                      {board.tasks && (
                        <div className="overflow-auto" style={{ maxHeight: '640px' }}>
                          {board.tasks.map((task, index) => (
                            <>
                            <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={`bg-${props.mode === 'light' ? 'light' : 'black'} text-${props.mode === 'light' ? 'dark' : 'light'} card mb-3 mx-2`}
                                  >
                                    <div className={`dropdown plus_container`} style={{ color: 'aliceblue', position: 'absolute', right: '10px' }}>
                                      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <b>. . .</b>
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><button className="btn dropdown-item" onClick={() => handleEdit(board.id, task.id)}>Edit</button></li>
                                        <li><button className="btn dropdown-item" onClick={() => handleDelete(board.id, task.id)}>Delete</button></li>
                                      </ul>
                                    </div>
                                    <Link className='text-dark' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setTask(task)}><b><div className={`card-header text-${props.mode === 'light' ? 'dark' : 'light'}`}>{task.title}</div></b></Link>
                                    <div className="card-body">
                                      <blockquote className="blockquote mb-0">
                                        <p>{task.description.split(' ').slice(0, 5).join(' ')}...</p>
                                        <footer className="blockquote-footer">{task.created_by}</footer>
                                      </blockquote>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                            </>
                          ))}
                        </div>
                      )}
                      <div className={`bg-${props.mode === 'light' ? 'light' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'} mt-5 offcanvas offcanvas-end w-50`} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 className="offcanvas-title" id="offcanvasRightLabel">{task.title}</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <b>Description:</b><br />
                          {task.description} <br />
                          <b>Deadline:</b><br />
                          {new Date(task.deadline).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                          })}
                          <div className="dropdown dropdown-menu-end">
                            <button className={`btn dropdown-toggle text-${props.mode === 'light' ? 'dark' : 'light'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <b>Assignees</b>
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-${props.mode === 'light' ? 'light' : 'dark'} dropdown-menu-right`} style={{ position: 'absolute', right: '0' }}>
                              {users.map(user => (
                                <li key={user.id}>
                                  <a className="dropdown-item" href="#">{user.name}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!showModal}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">Title</label>
                              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="description" className="form-label">Description</label>
                              <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create Task</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
