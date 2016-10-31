import React from 'react';
import Chess from 'chess.js';
import { app, socket } from '../config';

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
    this.props.getTable(this.props.params);
  }

  componentDidMount() {
    const that = this;
    socket.on('receiveTable', (table) => that.props.receiveTable(table));
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
    debugger
    const that = this;
    socket.emit('joinTable', [that.state.room, seat, that.props.currentUser]);
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
    if (this.game.turn() === 'w') {
      if (this.state.players[0] !== this.props.currentUser) {
        board.enableUserInput(false);
      }
    } else {
      if (this.state.players[1] !== this.props.currentUser) {
        board.enableUserInput(false);
      }
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
    let i,
      movesNotation,
      movesPosition = [];

    movesNotation = this.game.moves({square: notationSquare, verbose: true});
    for (i = 0; i < movesNotation.length; i++) {
      movesPosition.push(window.ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
    }
    return movesPosition;
  }

  render() {
    if (this.state.room) {
      const blackDisplay = this.state.players[1] ? {display: 'none'} : {display: ''};
      const whiteDisplay = this.state.players[0] ? {display: 'none'} : {display: ''};
      return (
        <section>
          <button style={blackDisplay} onClick={this.handleJoin.bind(this, 1)}>JOIN</button>
          <p>{this.state.players[1]}</p>
          <div id='board'>
          </div>
          <button style={whiteDisplay} onClick={this.handleJoin.bind(this, 0)}>JOIN</button>
          <p>{this.state.players[0]}</p>
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
