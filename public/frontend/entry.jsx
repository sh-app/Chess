import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const authentication = require('feathers-authentication/client');
const io = require('socket.io-client');
const socket = io();
const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: window.localStorage
  }));

const tables = app.service('tables');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
