import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {

  const [mode, setMode] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = '#fff';
    }
  }

  return (
    <>
      <Router>
        <Navbar title="Kanban Board" mode={mode} toggleMode={toggleMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>
        <Routes>
          <Route path='/login' element={<LoginForm mode={mode} setIsLoggedIn={setIsLoggedIn} setToken={setToken}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
