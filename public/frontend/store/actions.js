export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (user) => ({
  type: SIGNUP,
  user
});

export const login = (user) => ({
  type: LOGIN,
  user
});
