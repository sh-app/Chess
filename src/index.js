'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

let usersOnline = [];
let tables = [];
let activeTableList = {};

app.service('tables').find({
  query: {
    $limit: 10
  }
}).then(
  page => {
    page.data.forEach( table => {
      let modTable = table;
      modTable['players'] = [];
      modTable['board'] = null;
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
    if(usersOnline.indexOf(user)===-1) {
      usersOnline.push(user);
    }
    if (!activeTableList[user]) {
      activeTableList[user] = [];
    }
    app.io.emit('updateUserList', usersOnline);
    app.io.emit('msg', [`${user} has joined the room`, 'System']);
  });

  socket.on('loggedOut', (user) => {
    let idx = usersOnline.findIndex(username => username===user);
    usersOnline.splice(idx, 1);
    app.io.emit('updateUserList', usersOnline);
  });

  socket.on('requestLogs', (user) => {
    app.service('users').find({
      query: {
        username: user
      }
    }).then(
      page => {
        let gameLogs = {
          user: page.data[0].username,
          gamesPlayed: page.data[0].gamesPlayed,
          gamesWon: page.data[0].gamesWon
        };
        app.io.to(socket.id).emit(
          'receiveLogs', gameLogs
        );
    });
  });

  socket.on('updateLog', log => {
    let user;
    app.service('users').find({
      query: {
        username: log[0]
      }
    }).then( page => {
      user = page.data[0];
    app.service('users').patch(user._id,{
        gamesPlayed: user.gamesPlayed + log[1],
        gamesWon: user.gamesWon + log[2]
      }).then(
      updatedUser => {
        let gameLogs = {
          user: updatedUser.username,
          gamesPlayed: updatedUser.gamesPlayed,
          gamesWon: updatedUser.gamesWon
        };
        app.io.emit('receiveLogs', gameLogs);
        if (log[2] === 1) {
          app.io.emit('msg', [`${gameLogs.user} won  game!`, 'System']);
        }
    });
    });
  });

  socket.on('requestTables', () => {
    app.io.to(socket.id).emit(
      'updateTableList', tables
    );
  });

  socket.on('requestTable', (tableId) => {
    const findTable = (table) => table._id === tableId;
    let table = tables.find(findTable);
    app.io.to(socket.id).emit(
      'receiveTable', table
    );
  });

  socket.on('requestActiveTables', (user) => {
    const activeTables  = activeTableList[user];
    app.io.to(socket.id).emit(
      'receiveActiveTables', activeTables
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
    activeTableList[seating[2]].push([seating[3], seating[0]]);
    app.io.to(socket.id).emit(
      'receiveActiveTables', activeTableList[seating[2]]
    );
    app.io.emit('receiveTable', tables[idx]);
    app.io.emit('updateTableList', tables);
    app.io.emit('msg', [`${seating[2]} has joined the ${seating[0]}`, 'System']);
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

  socket.on('removeFromList', (players) => {
    let idx1 = activeTableList[players[0][0]].indexOf(players[1]);
    let idx2 = activeTableList[players[0][1]].indexOf(players[1]);
    activeTableList[players[0][0]].splice(idx1, 1);
    activeTableList[players[0][1]].splice(idx2, 1);
  });

  socket.on('endgame', (room) => {
    let findIdx = (table, idx) => {
      if (table.room === room) {
        return table;
      }
    };
    let idx = tables.findIndex(findIdx);
    tables[idx]["board"] = null;
    tables[idx]["players"] = [];
    app.io.emit('receiveTable', tables[idx]);
  });
});
