import React from 'react';
import ChessBoard from '../../../lib/chessboard/js/chessboard-0.3.0';

export default class UserPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.ChessBoard('board', 'start');
  }

  render() {
    return(
      <div id="board">
      </div>
    );
  }
}
