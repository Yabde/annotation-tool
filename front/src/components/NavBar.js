import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

function NavBar(props) {

  console.log('navbar auth : ', props.authenticated)

  return (
    <div className="navbar-wrapp">
      <div className="navbar-title">
        <Link to="/">Annotation Tool</Link>
      </div>
      <div className="navbar-link">
        <Link to="/all">All Images</Link>
      </div>
      {/* {!props.authenticated && (
        <React.Fragment>
          <div className="navbar-link">
            <Link to="/login">Log In</Link>
          </div>
          <div className="navbar-link">
            <Link to="/register">Register</Link>
          </div>
        </React.Fragment>
      )} */}
      {props.authenticated && (
        <div className="navbar-link">
          <button className="button-link">Log Out</button>
        </div>
      )}
      <div className="navbar-link">Github</div>
    </div>
  );
}

export default NavBar;
