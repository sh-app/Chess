import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { app, socket } from '../config';
import { getGameLogs, logout } from '../store/actions';

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameLogs: ''};
  }

  componentWillMount() {
    this.props.getGameLogs(this.props.currentUser);
  }

  componentDidMount() {
    let that = this;
    socket.on('receiveLogs', (gameLogs) => {
      if (that.props.currentUser === gameLogs.user) {
        that.setState({gameLogs});
      }
    });
  }

  handleLogout(e) {
    e.preventDefault();
    app.io.emit('loggedOut', this.props.currentUser);
    this.props.logout();
    hashHistory.push('/');
  }

  render() {
    return(
      <section className='header group'>
        <button onClick={this.handleLogout.bind(this)}>Log Out</button>
        <div className='header-logo'>&#9822;</div>
        <h3>Logged in as: <u>{this.props.currentUser}</u></h3>
        <p>
          Games Played: {this.state.gameLogs.gamesPlayed}
          |
          Games Won: {this.state.gameLogs.gamesWon}
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getGameLogs: (user) => dispatch(getGameLogs(user)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
