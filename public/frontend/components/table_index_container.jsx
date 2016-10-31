import { connect } from 'react-redux';
import TableIndex from './table_index';
import { getTables, receiveTables } from '../store/actions';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  tables: state.tables
});

const mapDispatchToProps = (dispatch) => ({
  getTables: () => dispatch(getTables()),
  receiveTables: (tables) => dispatch(receiveTables(tables))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableIndex);
