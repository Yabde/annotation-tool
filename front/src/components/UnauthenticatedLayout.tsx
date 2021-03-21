import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm } from './LoginForm';

import { useAuth } from './AuthContext';

export const UnauthenticatedLayout: React.FC = () => {
  const { login, authenticated } = useAuth();

//   const redirectTo = authenticated ? (
//     <Redirect to="/all" />
//   ) : (
//     <Redirect to="/login" />
//   );

  return (
    <div className="unauthenticated">
      <Switch>
        <Route path="/login">
          <LoginForm onAuthenticated={login} />
        </Route>
        {/* {redirectTo} */}
        {/* <Redirect to="/all" /> */}
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default UnauthenticatedLayout;
