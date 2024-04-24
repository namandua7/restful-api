import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Boards() {
  const projectId = JSON.parse(localStorage.getItem('project')).id;
  const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleSubmit = async (e) => {
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
      <Link to={`/projects/${projectId}/boards/new`}>
        <button type="button" className="mx-3 my-4 mr-5 btn btn-primary">+ New</button>
      </Link>
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
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">{board.status}</h3>
                      <p className="card-text">{board.description}</p>
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
                      <div className="plus_container mb-2">
                        <button type="button" className="btn-close cross-to-plus" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setCurrentBoardId(board.id)}></button>
                      </div>
                      {board.tasks && (
                        <div className="overflow-auto">
                          {board.tasks.map((task, index) => (
                            <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="card mb-3">
                                    <b><div className="card-header">{task.title}</div></b>
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
                          ))}
                        </div>
                      )}
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
