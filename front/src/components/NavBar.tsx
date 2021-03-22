import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { logout as ApiLogout } from '../services/AuthService';

import './NavBar.css';

type Props = {
  authenticated: null | boolean;
};

export const NavBar: React.FC<Props> = ({ authenticated }) => {
  const { user, logout } = useAuth();

  function handleLogout() {
    console.log('logout');
    logout();
    // TODO : temporary, improve how logout is handled ...
    ApiLogout();
  }

  return (
    <div className="navbar-wrapp">
      <div className="navbar-title">
        <Link to="/all">Annotation Tool</Link>
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
      {authenticated && (
        <div className="navbar-link">
          <button onClick={handleLogout} className="button-link">
            Log Out
          </button>
        </div>
      )}
      <div className="navbar-link">
        <a
          href="https://github.com/Yabde/annotation-tool"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default NavBar;
