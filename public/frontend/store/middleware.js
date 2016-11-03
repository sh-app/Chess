import {
  SIGNUP,
  LOGIN,
  GET_GAME_LOGS,
  GET_USERS,
  GET_TABLES,
  GET_ACTIVE_TABLES,
  GET_TABLE,
  SEND_MSG,
  login,
  receiveUser
} from './actions';
import { signupAjax, loginAjax } from './util';
import { applyMiddleware } from 'redux';
import { app, socket } from '../config';
import createLogger from 'redux-logger';

const Middleware =({ getState, dispatch }) => next => action => {

  switch (action.type) {

    case SIGNUP:
      signupAjax(action.user, (data) =>
        loginAjax(action.user, (user) => {
          dispatch(receiveUser(user));
          socket.emit('loggedIn', user.data.username);
        })
      );
      return next(action);

    case LOGIN:
      loginAjax(action.user, (user) => {
        dispatch(receiveUser(user));
        socket.emit('loggedIn', user.data.username);
      });
      return next(action);

    case GET_USERS:
      socket.emit('requestUsers');
      return next(action);

    case GET_TABLES:
      socket.emit('requestTables');
      return next(action);

    case GET_ACTIVE_TABLES:
      socket.emit('requestActiveTables', action.user);
      return next(action);

    case GET_GAME_LOGS:
      socket.emit('requestLogs', action.user);
      return next(action);

    case GET_TABLE:
      socket.emit('requestTable', action.tableId);
      return next(action);

    case SEND_MSG:
      socket.emit('message', [action.msg, action.user]);
      return next(action);

    default:
      return next(action);

  }
};

const RootMiddleware = applyMiddleware(
  Middleware
);

export default RootMiddleware;
