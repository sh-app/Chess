import React from 'react';
import { app, socket } from '../config';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    app.logout();
    window.location.href = '/index.html';
  }

  render() {
    const users = this.props.users;
    return (
      <aside >
        <h3>
          {users.length} users
        </h3>
        <ul>
          {users.map(user =>
            <li>
              {user.username}
            </li>
          )}
        </ul>
        <footer className="">
          <p onClick={this.logout}>
            Sign Out
          </p>
        </footer>
      </aside>
    );
  }
}
