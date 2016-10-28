'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

let usersOnline = [];
let tables = {};
app.service('tables').find().then(
  page => {
    page.data.forEach( table => {
      tables[table.room] = {
        ['id']: table._id,
        ['players']: [],
        ['full']: false
      };
    });
  }
);


server.on('listening', () =>
  console.log(`Chess application started on ${app.get('host')}:${port}`)
);

app.io.on('connection', (socket) => {
  socket.emit('updateUserList', usersOnline);
  socket.emit('updateTableList', tables);
  console.log('an user has connected');

  socket.on('loggedIn', (user) => {
    usersOnline.push(user);
    app.io.emit('updateUserList', usersOnline);
    app.io.emit('updateTableList', tables);
    app.io.emit('msg', `${user} has joined the room`);
    console.log(`${user} has joined the room`);
  });

  socket.on('message', (msg) => {
    app.io.emit('msg', msg);
  });

  socket.on('signup', (userMsg) => {
    console.log(userMsg);
  });

  socket.on('disconnect', () => (
    console.log('an user has disconnected')
  ));
});
