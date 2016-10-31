import { connect } from 'react-redux';
import Chat from './chat';
import { getUsers, receiveUsers, sendMsg, receiveMsg } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  users: state.users,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  receiveUsers: (users) => dispatch(receiveUsers(users)),
  sendMsg: (msg, user) => dispatch(sendMsg(msg, user)),
  receiveMsg: (msg) => dispatch(receiveMsg(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
