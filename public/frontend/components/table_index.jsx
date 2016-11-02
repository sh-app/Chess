import React from 'react';
import { Link } from 'react-router';
import { app, socket } from '../config';

export default class TableIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tables: [] };
  }

  componentDidMount() {
    const that = this;
    this.props.getTables();
    socket.on('updateTableList', tables => that.props.receiveTables(tables));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ['tables']: nextProps.tables
    });
  }

  render() {
    let tables;
    if (this.state.tables && this.state.tables.length > 0) {
      tables = this.state.tables.map( (table, idx )=> {
        let player1 = table.players[0] || '______';
        let player2 = table.players[1] || '______';
        return <li key={idx}>
          <Link to={`/table/${table._id}`}>{table.room}
          <button className='goto'>OPEN TABLE</button></Link>
          <span className='view-table'> <b>White:</b> {player1} <b>Black:</b> {player2}</span>
        </li>;
        });
    }

    return (
      <div className='lobby group'>
        <div className='lobby-title'>Rooms:</div>
        <ul className='tables group'>
          {tables}
        </ul>
      </div>
    );
  }
}
