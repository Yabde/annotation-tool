import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { login } from '../services/AuthService';

import './LoginForm.css';

type Props = {
  onAuthenticated?(user: any): void;
};

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login(username, password)
      .then((user) => {
        console.log('LOGGED', user);
        onAuthenticated && onAuthenticated(user)
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  function handleShowPassword(e: React.ChangeEvent) {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login">
      <h1>Log in</h1>
      <form onSubmit={handleLogin} className="form-login">
        {error && <div className="error">{error}</div>}

        <div>
          <input
            type="text"
            className="form-field"
            placeholder="Username or email"
            aria-label="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>

        <div className="form-password">
          <input
            type={showPassword ? 'text' : 'password'}
            aria-label="Password"
            className="form-field"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <div className="button-wrapp">
            <button type="submit" className="button-login">
              {!loading ? (
                <span>
                  <FaSignInAlt /> <span>Login</span>
                </span>
              ) : (
                <span>Loading ...</span>
              )}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default LoginForm;
