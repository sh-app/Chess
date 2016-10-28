import React from 'react';
import { app, socket } from '../config';
import Users from './users';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users || [],
      messages: this.props.messages || [],
      msg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ['users']: nextProps.users,
      ['messages']: nextProps.messages
    });
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMsg(this.state.msg);
    this.setState({['msg']: ''});
  }

  render() {
    debugger
    const users = this.state.users.map( user => {
      return <li>{user}</li>;
    });
    const messages = this.state.messages.map( msg => {
      return <li>{msg}</li>;
    });

    return (
      <div className="">
        chat:
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
