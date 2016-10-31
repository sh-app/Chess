import React from 'react';
import { app, socket } from '../config';
import Users from './users';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      msg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const that = this;
    this.props.getUsers();
    socket.on('msg', (msg) => that.props.receiveMsg(msg));
    socket.on('updateUserList', (usersOnline) => that.props.receiveUsers(usersOnline));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ['users']: nextProps.users,
      ['messages']: nextProps.messages || []
    });
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMsg(this.state.msg, this.props.currentUser);
    this.setState({['msg']: ''});
  }

  render() {
    const users = this.state.users.map( (user, idx) => {
      return <li key={idx}>{user}</li>;
    });
    const messages = this.state.messages.map( (msg, idx) => {
      return <li key={idx}><b>{msg[1]}:</b> {msg[0]}</li>;
    });

    return (
      <div className="">
        Users Online:
        <ul>
          {users}
        </ul>
        <ul>
          {messages}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleChange('msg')}
            value={this.state.msg}/>
          <input id='submit' type='submit' value='SEND'/>
        </form>
      </div>
    );
  }
}
