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
    if (this.state.tables.length > 0) {
      tables = this.state.tables.map( (table, idx )=> {
        return <li key={idx}><Link to={`/table/${table._id}`}>{table.room}</Link></li>;
        });
    }

    return (
      <div>Game Rooms:
        <ul>
          {tables}
        </ul>
      </div>
    );
  }
}
