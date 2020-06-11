import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import createAccount from './createAccount';
import login from './login';
import update from './update';

export default combineReducers({
  simpleReducer,
  createAccount,
  login,
  update,
});