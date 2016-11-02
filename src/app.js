'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

app.service('tables').create({
  room: 'New York'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'San Francisco'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Chicago'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Los Angeles'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Boston'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Dallas'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Seattle'
}).then(function(table) {
  console.log('Created table', table);
});
app.service('tables').create({
  room: 'Miami'
}).then(function(table) {
  console.log('Created table', table);
});


module.exports = app;
