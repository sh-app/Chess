import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import * as actions from './store/actions';
import configureStore from './store/store';
import { app, socket } from './config.js';

let store;
if (window.sessionStorage.currentUser) {
  const userInfo = { currentUser: window.sessionStorage.currentUser };
  store = configureStore(userInfo);
} else {
  store = configureStore();
}
  
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
  });
