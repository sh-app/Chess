import { connect } from 'react-redux';
import Table from './table';
import { getTable, getActiveTables, receiveTable, receiveActiveTables } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  currentTable: state.currentTable,
  activeTables: state.activeTables
});

const mapDispatchToProps = (dispatch) => ({
  getTable: (id) => dispatch(getTable(id)),
  getActiveTables: (user) => dispatch(getActiveTables(user)),
  receiveTable: (table) => dispatch(receiveTable(table)),
  receiveActiveTables: (tables) => dispatch(receiveActiveTables(tables))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
