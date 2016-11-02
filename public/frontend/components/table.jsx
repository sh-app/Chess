import React from 'react';
import Chess from 'chess.js';
import { Link, hashHistory } from 'react-router';
import { app, socket } from '../config';
import { tableFull } from '../store/helpers';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      players: null,
      board: null,
      turn: null
    };
  }

  componentWillMount() {
    this.props.getTable(this.props.params.tableId);
    this.props.getActiveTables(this.props.currentUser);
  }

  componentDidMount() {
    const that = this;
    socket.on('receiveTable', (table) => that.props.receiveTable(table));
    socket.on('receiveActiveTables', (tables) => that.props.receiveActiveTables(tables));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      room: nextProps.currentTable.room,
      players: nextProps.currentTable.players,
      board: nextProps.currentTable.board,
      turn: nextProps.currentTable.turn
    }, this.setupBoard);
  }

  handleJoin(seat) {
    const that = this;
    socket.emit('joinTable', [that.state.room, seat, that.props.currentUser, this.props.currentTable._id]);
  }

  handleSwitch(tableId) {
    let hash = hashHistory;
    this.props.getTable(tableId);
    hashHistory.push(`/table/${tableId}`);
  }

  setupBoard() {
    const that = this;
    const state = this.state.board || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    this.game = new Chess();
    this.game.load(state);
    const board = new window.Chessboard('board', {
      position: state,
      eventHandlers: {
        onPieceSelected: this.pieceSelected.bind(that),
        onMove: this.pieceMove.bind(that)
      }
    });

    if (this.game.game_over()){
      this.endGame();
    }

    if (!tableFull(this.state.players)) {
      board.enableUserInput(false);
    } else if (this.game.turn() === 'w') {
        if (this.state.players[0] !== this.props.currentUser) {
          board.enableUserInput(false);
        }
    } else {
        if (this.state.players[1] !== this.props.currentUser) {
          board.enableUserInput(false);
        }
    }
  }

  endGame() {
    if ((!tableFull(this.state.players))) {
      socket.emit('endgame', this.state.room);
    } else if (this.game.in_draw() || this.game.in_threefold_repetition()) {
        socket.emit('updateLog', [this.props.currentUser, 1, 0]);
        socket.emit('removeFromList', [this.state.players, this.state.room]);
        socket.emit('endgame', this.state.room);
    } else {
        let players = this.logOrder();
        socket.emit('updateLog', [players[0], 1, 1]);
        socket.emit('updateLog', [players[1], 1, 0]);
        socket.emit('removeFromList', [this.state.players, this.state.room]);
        socket.emit('endgame', this.state.room);
    }
  }

  logOrder() {
    if (this.props.currentUser === [this.state.players[0]]) {
      return this.state.players.reverse();
    } else {
      return this.state.players;
    }
  }

  pieceMove(move) {
    let gameMove = this.game.move({
      from: move.from,
      to: move.to,
      promotion: 'q'
    });
    let gameState = this.game.fen();
    socket.emit('move', [this.state, gameState]);
    return gameState;
  }

  pieceSelected(notationSquare) {
    let movesNotation = this.game.moves({square: notationSquare, verbose: true});
    let movesPosition = [];

    for ( var i = 0; i < movesNotation.length; i++) {
      movesPosition.push(window.ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
    }
    return movesPosition;
  }

  render() {
    let activeGames;
    if (this.props.activeTables && this.props.activeTables.length > 0) {
      activeGames = this.props.activeTables.map( (table, idx) => {
        return <li key={idx} onClick={this.handleSwitch.bind(this, table[0])}>{table[1]}</li>;
      });
    }
    if (this.state.room) {
      const blackDisplay = this.state.players[1] ? {display: 'none'} : {display: ''};
      const whiteDisplay = this.state.players[0] ? {display: 'none'} : {display: ''};
      return (
        <section>
          <div className='room-name'>
            <Link to='lobby'><button className='back'>{'<<Lobby'}</button></Link>
            {this.state.room}
            <button className='quit' onClick={this.endGame.bind(this)}>Quit</button>
          </div>
          <button className='join' style={blackDisplay} onClick={this.handleJoin.bind(this, 1)}>SIT HERE</button>
          <div className='player black'>{this.state.players[1]}</div>
          <div id='board'>
          </div>
          <button className='join' style={whiteDisplay} onClick={this.handleJoin.bind(this, 0)}>SIT HERE</button>
          <div className='player white'>{this.state.players[0]}</div>
          <div className='game-control group'>
            <ul>{activeGames}</ul>
          </div>
        </section>
      );
    } else {
      return(
        <div id='board'>
        </div>
      );
    }
  }
}
