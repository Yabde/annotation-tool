import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Container from './Container';
import ImageDetail from './ImageDetail';

function PrimaryLayout() {
  const { key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return (
    <React.Fragment>
      <div className="primarylayout"></div>

      <Switch>
        <Route path="/all" render={() => <Container />} />
        <Route
          path="/image/:imageName"
          render={({ match }) => <ImageDetail imageName={match.params.imageName} />}
        />
        <Redirect to="/all" />
      </Switch>
    </React.Fragment>
  );
}

export default PrimaryLayout;
