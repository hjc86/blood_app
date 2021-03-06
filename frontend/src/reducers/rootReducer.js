import { combineReducers } from 'redux';

import createAccount from './createAccount';
import login from './login';
import updateProfile from './updateProfile';
import follow from './follow';
import createAppSlots from './createAppSlots';
import createAppointment from './createAppointment';
import changeAppointment from './changeAppointment';
import searchClinic from './searchClinic';
import deleteAppointment from './deleteAppointment';
import getAppointments from './getAppointments';


export default combineReducers({
  
  createAccount,
  login,
  updateProfile,
  follow,
  createAppSlots,
  createAppointment,
  changeAppointment,
  searchClinic,
  deleteAppointment,
  getAppointments
});