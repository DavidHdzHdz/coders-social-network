import { combineReducers } from 'redux';
import alerts from './alert';
import register from './auth';

export default combineReducers({ alerts, register });
