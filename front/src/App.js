import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  
  return (
    <div className="app">
      <NavBar isLogged={isLogged} />
      <div className="app-body">

      </div>
    </div>
  );
}

export default App;
