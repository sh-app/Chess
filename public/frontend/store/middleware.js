import {
  SIGNUP,
  LOGIN,
  login,
  receiveUser
} from './actions';
import { signupAjax, loginAjax } from './util';
import { applyMiddleware } from 'redux';
import { app } from '../config';
import createLogger from 'redux-logger';

const Middleware =({ getState, dispatch }) => next => action => {

  switch (action.type) {

    case SIGNUP:
      signupAjax(action.user, (data) =>
        loginAjax(action.user, (user) => dispatch(receiveUser(user.data)))
      );
      return next(action);

    case LOGIN:
      loginAjax(action.user, (user) => dispatch(receiveUser(user.data)));
      return next(action);

    default:
      return next(action);

  }
};

const RootMiddleware = applyMiddleware(
  Middleware,
  createLogger()
);

export default RootMiddleware;
