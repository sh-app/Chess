import { connect } from 'react-redux';
import Table from './table';
import { getTable, receiveTable } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  currentTable: state.currentTable
});

const mapDispatchToProps = (dispatch) => ({
  getTable: (id) => dispatch(getTable(id)),
  receiveTable: (table) => dispatch(receiveTable(table)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
