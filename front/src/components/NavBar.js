import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

function NavBar(props) {
  return (
    <div className="navbar-wrapp">
      <div className="navbar-title">
        <Link to="/">Annotation Tool</Link>
      </div>
      <div className="navbar-link">
        <Link to="/all">All Images</Link>
      </div>
      <div className="navbar-link">
        <Link to="/add">Add</Link>
      </div>
      {!props.isLogged && (
        <React.Fragment>
          <div className="navbar-link">
            <Link to="/login">Log In</Link>
          </div>
          <div className="navbar-link">
            <Link to="/register">Register</Link>
          </div>
        </React.Fragment>
      )}
      {props.isLogged && (
        <div className="navbar-link">
          <Link to="/logout">Log Out</Link>
        </div>
      )}
      <div className="navbar-link">Github</div>
    </div>
  );
}

export default NavBar;
