import {
  SIGNUP,
  LOGIN,
  login
} from './actions';
import { signupAjax, loginAjax } from './util';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const Middleware =({ getState, dispatch }) => next => action => {

  switch (action.type) {

    case SIGNUP:
      signupAjax(action.user, loginAjax(action.user));
      return next(action);

    case LOGIN:
      loginAjax(action.user, (user) => {
        login(user);
      });
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
