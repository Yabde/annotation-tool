import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AddImage from './AddImage';

function Container() {
  return (
    <React.Fragment>
      <div className="container">
        <p>Container</p>
        <AddImage />
      </div>

      {/* <Switch>
        <Route path="/all" render={() => <Container />} />
      </Switch> */}
    </React.Fragment>
  );
}

export default Container;
