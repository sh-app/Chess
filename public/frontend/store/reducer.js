import { LOGIN } from './actions';

const defaultSession = {
  currentUser: null,
  users: []
};

const Reducer = (state=defaultSession, action) => {

  switch(action.type) {

    case LOGIN:
      debugger
      return Object.assign({}, state, {currentUser: action.user});

    default:
      return state;
  }
};

export default Reducer;
