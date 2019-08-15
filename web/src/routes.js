import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import User from './containers/User';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="/user" component={User} />

    </Route>
    <Route path="/login" component={Login} />
  </Route>
);
