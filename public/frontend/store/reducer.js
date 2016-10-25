import { RECEIVE_USER } from './actions';

const defaultSession = {
  currentUser: null,
  users: []
};

const Reducer = (state=defaultSession, action) => {

  switch(action.type) {

    case RECEIVE_USER:
      window.sessionStorage.setItem('currentUser', action.user.username);
      window.sessionStorage.setItem('token', action.user.token);
      return Object.assign({}, state, {currentUser: action.user.username});

    default:
      return state;
  }
};

export default Reducer;
