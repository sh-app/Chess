import { createStore } from 'redux';
import Reducer from './reducer';
import RootMiddleware from './middleware';

const configureStore = (preloadedState={}) => (
  createStore(
    Reducer,
    preloadedState,
    RootMiddleware
  )
);

export default configureStore;
