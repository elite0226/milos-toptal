import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth';
import restaurantReducer from './restaurant';
import userReducer from './user';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    restaurant: restaurantReducer,
    user: userReducer,
  });

export default createRootReducer;
