import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import { LOGIN_REQUEST } from '../types';

const initialState = {
  profile: null,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestFulfilled(LOGIN_REQUEST)]: (state, { payload }) => ({
    ...state,
    profile: payload.user,
    status: requestFulfilled(LOGIN_REQUEST),
  }),

  [requestRejected(LOGIN_REQUEST)]: (state, { payload }) => ({
    ...state,
    profile: null,
    error: payload?.error,
    status: requestRejected(LOGIN_REQUEST),
  }),
});
