import React, { useContext, useReducer, useEffect } from 'react';
import axios from '../utils/axios';

import { getAuthenticatedUser } from '../services/AuthService';

export type AuthContextActions =
  | { type: 'LOGIN'; user: any }
  | { type: 'LOGOUT' };

type State = {
  authenticated: null | boolean;
  user: null | any;
};

type Context = State & {
  login(user: any): void;
  logout(): void;
};

const AuthStateContext = React.createContext<Context | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: AuthContextActions) => {
      switch (action.type) {
        case 'LOGIN': {
          return { authenticated: true, user: action.type };
        }
        case 'LOGOUT': {
          return { authenticated: false, user: null };
        }
        default:
          return state;
      }
    },
    {
      // Null : not determined yet
      // False : determined and not logged in
      // True : logged in
      authenticated: null,
      user: null,
    }
  );

  const login = (user: any) => {
    dispatch({ type: 'LOGIN', user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    let isCurrent = true;
    getAuthenticatedUser()
      .then((user: any) => {
        if (user !== 'null' && isCurrent) {
          login(user);
        } else {
          logout();
        }
      })
      .catch((error: any) => console.log('error getauthenticatedUser'));

    return () => {
      isCurrent = false;
    };
  }, []);

  const context: Context = {
    ...state,
    login,
    logout,
  };

  return <AuthStateContext.Provider value={context} children={children} />;
};

export function useAuth() {
  const context = useContext(AuthStateContext);
  console.log('context : ', context);
  if (!context) {
    throw Error('Use of useAuth is outside of Provider');
  }
  return context;
}
