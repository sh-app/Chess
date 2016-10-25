'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);


server.on('listening', () =>
  console.log(`Chess application started on ${app.get('host')}:${port}`)
);

app.io.on('connection', (socket) => {
  console.log('an user has connected');

  socket.on('logged in', (user) => {
    console.log(`${user} has logged in`);
  });

  socket.on('signup', (userMsg) => {
    console.log(userMsg);
  });

  socket.on('disconnect', () => (
    console.log('an user has disconnected')
  ));
});
