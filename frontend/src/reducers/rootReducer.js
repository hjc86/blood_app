import { combineReducers } from 'redux';

import createAccount from './createAccount';
import login from './login';
import updateProfile from './updateProfile';
import follow from './follow';

export default combineReducers({
  
  createAccount,
  login,
  updateProfile,
  follow
});