import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import customer from './customer'


export default combineReducers({
    alert,
    auth,
    customer
});