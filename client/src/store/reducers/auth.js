import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import { GET_PROFILE_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../types';

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

  [requestFulfilled(SIGNUP_REQUEST)]: (state, { payload }) => ({
    ...state,
    profile: payload.user,
    status: requestFulfilled(SIGNUP_REQUEST),
  }),

  [requestRejected(SIGNUP_REQUEST)]: (state, { payload }) => ({
    ...state,
    profile: null,
    error: payload?.error,
    status: requestRejected(SIGNUP_REQUEST),
  }),

  [requestFulfilled(GET_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    profile: payload.user,
    status: requestFulfilled(GET_PROFILE_REQUEST),
  }),

  [requestRejected(GET_PROFILE_REQUEST)]: (state, { payload }) => ({
    ...state,
    prpofile: null,
    error: payload?.error,
    status: requestRejected(GET_PROFILE_REQUEST),
  }),

  [LOGOUT_REQUEST]: (state) => ({
    ...state,
    profile: null,
    error: null,
    status: LOGOUT_REQUEST,
  }),
});
