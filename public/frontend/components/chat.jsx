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
      let display = msg[1]==='System' ? {color: '#DADADA'} : {display: ''};
      return <li key={idx} style={display}>
        <b>{msg[1]}:</b> {msg[0]}
        </li>;
    });
    messages.reverse();
    return (
      <div className='chatbox'>
        <div className='users-title'>Users Online:</div>
        <div className='messages-title'>Chat:</div>
        <ul className='users'>
          {users}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='chat-message'
            onChange={this.handleChange('msg')}
            placeholder='say hello!'
            value={this.state.msg}/>
          <input
            type='submit'
            className='chat-submit'
            onSubmit={this.handleSubmit}
            value={'>>'}/>
        </form>
        <ul className='messages'>
          {messages}
        </ul>
      </div>
    );
  }
}
