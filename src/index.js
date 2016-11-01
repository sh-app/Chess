'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

let usersOnline = [];
let tables = [];
app.service('tables').find({
  query: {
    $limit: 10
  }
}).then(
  page => {
    page.data.forEach( table => {
      let modTable = table;
      modTable['players'] = [];
      modTable['full'] = false;
      tables.push(modTable);
  });
});

server.on('listening', () =>
  console.log(`Chess application started on ${app.get('host')}:${port}`)
);

app.io.on('connection', (socket) => {

  socket.on('requestUsers', () => {
    app.io.to(socket.id).emit(
      'updateUserList', usersOnline
    );
  });

  socket.on('loggedIn', (user) => {
    usersOnline.push(user);
    app.service('users').find({
      query: {
        username: user
      }
    }).then(
      page => {
        let gameLogs = {
          gamesPlayed: page.data[0].gamesPlayed,
          gamesWon: page.data[0].gamesWon
        };
        app.io.to(socket.id).emit(
          'userProp', gameLogs
        );
      }
    );

    app.io.emit('updateUserList', usersOnline);
    app.io.emit('msg', [`${user} has joined the room`, 'System']);
  });

  socket.on('requestTables', () => {
    app.io.to(socket.id).emit(
      'updateTableList', tables
    );
  });

  socket.on('requestTable', (tableId) => {
    const findTable = (table) => table._id === tableId.tableId;
    let table = tables.find(findTable);
    app.io.to(socket.id).emit(
      'receiveTable', table
    );
  });

  socket.on('message', (msg) => {
    app.io.emit('msg', msg);
  });

  socket.on('joinTable', (seating) => {
    let findIdx = (table, idx) => {
      if (table.room === seating[0]) {
        return table;
      }
    };
    let idx = tables.findIndex(findIdx);
    tables[idx].players[seating[1]] = seating[2];
    app.io.emit('receiveTable', tables[idx]);
  });

  socket.on('move', (gameState) => {
    let findIdx = (table, idx) => {
      if (table.room === gameState[0].room) {
        return table;
      }
    };
    let idx = tables.findIndex(findIdx);
    tables[idx]["board"] = gameState[1];
    app.io.emit('receiveTable', tables[idx]);
  });
});
