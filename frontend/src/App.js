import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }

  return (
    <>
      <Navbar title="Kanban Board" mode={mode} toggleMode={toggleMode}/>
    </>
  );
}

export default App;
