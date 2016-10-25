import { connect } from 'react-redux';
import Session from './session';
import { login, signup } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
