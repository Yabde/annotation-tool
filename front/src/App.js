import React, { useState } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
// import Container from './components/Container';
import PrimaryLayout from './components/PrimaryLayout'
import { useAuth } from './auth/AuthContext';
import UnauthenticatedLayout from './components/UnauthenticatedLayout'

function App() {
  const { authenticated } = useAuth();
  // const authenticated = true;

  console.log('APP authenticated : ', authenticated);

  return (
    <div className="app">
      <NavBar authenticated={authenticated} />
      <div className="app-body">
        {!authenticated && <UnauthenticatedLayout />}
        {authenticated && <PrimaryLayout />}
        {/* <Switch>
          <Route path="/all" render={() => <Container />} />
        </Switch> */}
      </div>
    </div>
  );
}

export default App;
