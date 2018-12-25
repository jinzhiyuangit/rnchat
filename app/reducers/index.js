import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UsersReducer from './UsersReducer';
export default combineReducers({
    LoginReducer,
    UsersReducer
  })