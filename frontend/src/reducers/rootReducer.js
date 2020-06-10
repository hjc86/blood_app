import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import createAccount from './createAccount';
import login from './login';

export default combineReducers({
  simpleReducer,
  createAccount,
  login
});