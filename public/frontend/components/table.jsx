import React from 'react';
import { app, socket } from '../config';


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tables: this.props.tables || [] };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ['tables']: nextProps.tables,
    });
  }

  render() {
    debugger
    if (this.state.tables.length > 0) {
      this.tables = this.state.tables.map( table => {
        return <li> {table.room}, {table.players}, {table.full}</li>;
        });
    }
    return (
      <ul>
        {this.tables || ''}
      </ul>
    );
  }
}
