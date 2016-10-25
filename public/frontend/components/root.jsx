import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';

const Root = () => {

  return (
    <Router history={hashHistory}>
      <Route path='/' component={App} >
      </Route>
    </Router>
  );
};

export default Root;
