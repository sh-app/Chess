import React from 'react';
import ReactDOM from 'react-dom';
import { app, socket } from '../config';
import Users from './users';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const userService = app.service('users');
    userService.find().then((page) => this.setState({ users: page.data}));
    userService.on('created', user => this.setState({
       users: this.state.users.concat(user)
     }));
     debugger
  }

  render() {
    return (
      <div className="">
        <Users users={this.state.users} />
      </div>
    );
  }
}
