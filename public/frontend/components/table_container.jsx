import { connect } from 'react-redux';
import Table from './table';
import { sendMsg } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  tables: state.tables
});

const mapDispatchToProps = (dispatch) => ({
  sendMsg: (msg) => dispatch(sendMsg(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
