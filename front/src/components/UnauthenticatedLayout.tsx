import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm } from '../auth/LoginForm';

import { useAuth } from '../auth/AuthContext';

export const UnauthenticatedLayout: React.FC = () => {
  const { login } = useAuth();

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
