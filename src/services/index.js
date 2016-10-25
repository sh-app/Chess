'use strict';
const message = require('./message');
const table = require('./table');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(table);
  app.configure(message);
};
