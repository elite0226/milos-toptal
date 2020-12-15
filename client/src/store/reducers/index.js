import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth';
import restaurantReducer from './restaurant';
import userReducer from './user';
import toastReducer from './toast';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    restaurant: restaurantReducer,
    user: userReducer,
    toast: toastReducer,
  });

export default createRootReducer;
