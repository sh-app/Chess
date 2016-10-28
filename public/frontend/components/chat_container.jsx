import { connect } from 'react-redux';
import Chat from './chat';
import { sendMsg } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  users: state.users,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  sendMsg: (msg) => dispatch(sendMsg(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
