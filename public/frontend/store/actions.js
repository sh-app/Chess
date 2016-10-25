export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const RECEIVE_USER = 'RECEIVE_USER';

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
