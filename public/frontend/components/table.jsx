import React from 'react';
import { app, socket } from '../config';


export default class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ['tables']: nextProps.tables,
    });
  }

  render() {
    debugger
    return (
      <ul>
      </ul>
    );
  }
}
