import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import KanbanBoard from './components/KanbanBoard'; 

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('mode');
    return storedMode || 'light';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

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
  const backgroundImageUrl = 'https://greggigon.com/wp-content/uploads/2013/05/kanban-board-dark.jpg';
  return (
    <>
      <Router>
        <Navbar title="Kanban Board" mode={mode} toggleMode={toggleMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />
        <Routes>
          <Route path='/' element={<KanbanBoard mode={mode} backgroundImage={backgroundImageUrl}/>}/>
          <Route path='/login' element={<LoginForm mode={mode} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;