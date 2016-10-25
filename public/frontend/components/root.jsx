import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SessionContainer from './session_container';
import App from './app';

const Root = ({store}) => {

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/lobby' component={App} >
        </Route>
        <Route path='/' component={SessionContainer} />
      </Router>
    </Provider>
  );
};

export default Root;
