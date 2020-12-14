import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import { GET_USERS_REQUEST } from '../types';

const initialState = {
  users: [],
  user: {},
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestFulfilled(GET_USERS_REQUEST)]: (state, { payload }) => ({
    ...state,
    users: payload.users,
    totalCount: payload.totalCount,
    status: requestFulfilled(GET_USERS_REQUEST),
  }),

  [requestRejected(GET_USERS_REQUEST)]: (state, { payload }) => ({
    ...state,
    users: [],
    error: payload?.error,
    status: requestRejected(GET_USERS_REQUEST),
  }),
});
