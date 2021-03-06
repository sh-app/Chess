export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_GAME_LOGS = 'GET_GAME_LOGS';
export const GET_USERS = 'GET_USERS';
export const GET_TABLES = 'GET_TABLES';
export const GET_ACTIVE_TABLES = 'GET_ACTIVE_TABLES';
export const GET_TABLE = 'GET_TABLE';
export const RECEIVE_TABLE = 'RECEIVE_TABLE';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_MSG = 'RECEIVE_MSG';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const RECEIVE_ACTIVE_TABLES = 'RECEIVE_ACTIVE_TABLES';
export const SEND_MSG = 'SEND_MSG';

export const signup = (user) => ({
  type: SIGNUP,
  user
});

export const login = (user) => ({
  type: LOGIN,
  user
});

export const logout = () => ({
  type: LOGOUT
});

export const getGameLogs = (user) => ({
  type: GET_GAME_LOGS,
  user
});

export const getUsers = () => ({
  type: GET_USERS,
});

export const getTables = () => ({
  type: GET_TABLES,
});

export const getActiveTables = (user) => ({
  type: GET_ACTIVE_TABLES,
  user
});

export const getTable = (tableId) => ({
  type: GET_TABLE,
  tableId
});

export const receiveTable = (table) => ({
  type: RECEIVE_TABLE,
  table
});

export const receiveTables = (tables) => ({
  type: RECEIVE_TABLES,
  tables
});

export const receiveActiveTables = (tables) => ({
  type: RECEIVE_ACTIVE_TABLES,
  tables
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveMsg = (msg) => ({
  type: RECEIVE_MSG,
  msg
});

export const sendMsg = (msg, user) => ({
  type: SEND_MSG,
  msg,
  user
});
