import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import KanbanBoard from './components/KanbanBoard'; 
import Projects from './components/Projects';
import NewProject from './components/NewProject';
import EditProject from './components/EditProject';
import ShowProject from './components/ShowProject';
import Boards from './components/Boards';
import NewBoard from './components/NewBoard';
import KanbanBoardImage1 from './images/KanbanBoardImage1.jpg';
import KanbanBoardImage2 from './images/KanbanBoardImage2.jpg';

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('mode');
    return storedMode || 'light';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.body.style.backgroundColor = mode === 'light' ? '#fff' : '#042743';
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const backgroundImageUrl = 'src/images/Blue Dark Professional Geometric Business Project Presentation .jpg';
  return (
    <>
      <Router>
        <Navbar title="Kanban Board" mode={mode} toggleMode={toggleMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} user={user} setUser={setUser} />
        <Routes>
          <Route path='/projects/:id/boards/new' element={<NewBoard mode={mode}/>} />
          <Route path='/projects/:id/boards' element={<Boards mode={mode}/>} />
          <Route path='/projects/:id' element={<ShowProject mode={mode}/>} />
          <Route path='/projects/:id/edit' element={<EditProject mode={mode}/>} />
          <Route path='projects/new' element={<NewProject mode={mode}/>} />
          <Route path='/projects' element={<Projects user={user} token={token} mode={mode}/>}/>
          <Route path='/' element={<KanbanBoard mode={mode} backgroundImage={`${mode === 'light' ? KanbanBoardImage1 : KanbanBoardImage2}`}/>}/>
          <Route path='/login' element={<LoginForm mode={mode} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;