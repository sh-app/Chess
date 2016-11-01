import React from 'react';
import { app, socket } from '../config';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameLogs: ''};
  }
  componentDidMount() {
    let that = this;
    socket.on('userProp', (gameLogs) => {
      that.setState({gameLogs});
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    debugger
    return(
      <section className='header group'>
        <button onClick={this.handleLogout.bind(this)}>Log Out</button>
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
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
