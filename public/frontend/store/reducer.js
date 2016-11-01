import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_TABLE,
  RECEIVE_TABLES,
  RECEIVE_MSG } from './actions';
import { app } from '../config';

const defaultSession = {
  currentUser: null,
  tables: [],
  messages: [],
  users: [],
  currentTable: null
};

const Reducer = (state=defaultSession, action) => {

  switch(action.type) {

    case RECEIVE_USER:
      window.sessionStorage.setItem('currentUser', action.user.data.username);
      window.sessionStorage.setItem('token', action.user.token);
      return Object.assign({}, state, {currentUser: action.user.data.username});

    case RECEIVE_USERS:
      return Object.assign({}, state, {users: action.users});

    case RECEIVE_TABLES:
      return Object.assign({}, state, {tables: action.tables});

    case RECEIVE_TABLE:
      return Object.assign({}, state, {currentTable: action.table});

    case RECEIVE_MSG:
      let messages = state.messages || [];
      return Object.assign({}, state, {messages: messages.concat([action.msg])});

    default:
      return state;
  }
};

export default Reducer;
