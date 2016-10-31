import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import TableContainer from './table_container';
import SessionContainer from './session_container';
import TableIndexContainer from './table_index_container';
import { app } from '../config';

const Root = ({store}) => {
  const _redirectIfLoggedOut = (next, replace) => {
    if (store.getState().currentUser) {
      app.authenticate({token: window.sessionStorage.token, type: 'token'})
      .then(console.log(`${window.sessionStorage.currentUser} validated`))
      .catch();
    } else {
      replace('/');
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='lobby' component={App} onEnter={_redirectIfLoggedOut}>
          <IndexRoute component={TableIndexContainer}/>
          <Route path='/table/:tableId' component={TableContainer}/>
        </Route>
        <Route path='/' component={SessionContainer}/>
      </Router>
    </Provider>
  );
};

export default Root;
