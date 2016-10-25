import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { app, socket } from './config.js';

app.authenticate().then(() => {
    ReactDOM.render(<Root />, document.getElementById('root'));
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/index.html';
  }
  console.error(error);
});
