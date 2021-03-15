import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Container from './components/Container';

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="app">
      <NavBar isLogged={isLogged} />
      <div className="app-body">
        <Switch>
          <Route path="/all" render={() => <Container />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
