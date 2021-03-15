import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css'

function NavBar(props) {
    return (
        <div className="navbar-wrapp">
            <div className="navbar-title">Annotation Tool</div>
            <div className="navbar-link">All Images</div>
            <div className="navbar-link">Add</div>
            {!props.isLogged && (
                <React.Fragment>
                    <div className="navbar-link">Log In</div>
                    <div className="navbar-link">Register</div>
                </React.Fragment>
            )}
            {props.isLogged && (
                <div className="navbar-link">Log Out</div>
            )}
            <div className="navbar-link">Github</div>
        </div>
    )
}

export default NavBar
