import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { app, socket } from './config.js';

const store = configureStore();

app.authenticate().then(() => {
  app.io.emit('logged in', app.get('user').username);
  window.store = store;
  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/index.html';
  }
  console.error(error);
});
