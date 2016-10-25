const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const authentication = require('feathers-authentication/client');
const io = require('socket.io-client');
export const socket = io();
export const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: window.localStorage
  }));
