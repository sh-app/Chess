export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_MSG = 'RECEIVE_MSG';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const SEND_MSG = 'SEND_MSG';

export const signup = (user) => ({
  type: SIGNUP,
  user
});

export const login = (user) => ({
  type: LOGIN,
  user
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveTables = (tables) => ({
  type: RECEIVE_TABLES,
  tables
});

export const receiveMsg = (msg) => ({
  type: RECEIVE_MSG,
  msg
});

export const sendMsg = (msg) => ({
  type: SEND_MSG,
  msg
});
