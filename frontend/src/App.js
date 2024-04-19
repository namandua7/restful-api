import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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

  return (
    <>
      <Router>
        <Navbar title="Kanban Board" mode={mode} toggleMode={toggleMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />
        <Routes>
          <Route path='/login' element={<LoginForm mode={mode} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;