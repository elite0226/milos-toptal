import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import {
  CREATE_USER_REQUEST,
  GET_USERS_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_USER_REQUEST,
  SET_USER,
} from '../types';

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

  [requestFulfilled(CREATE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: requestFulfilled(CREATE_USER_REQUEST),
  }),

  [requestRejected(CREATE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: {},
    error: payload?.error,
    status: requestRejected(CREATE_USER_REQUEST),
  }),

  [requestFulfilled(UPDATE_USER_REQUEST)]: (state, { payload }) => {
    const index = state.users.findIndex((user) => user.id === payload.user.id);
    if (index < 0) return;
    state.users[index] = payload.user;
    state.status = requestFulfilled(UPDATE_USER_REQUEST);
  },

  [requestRejected(UPDATE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: {},
    error: payload?.error,
    status: requestRejected(UPDATE_USER_REQUEST),
  }),

  [requestFulfilled(DELETE_USER_REQUEST)]: (state, { payload }) => {
    const filteredUsers = state.users.filter((user) => user.id === payload.id);
    state.users = filteredUsers;
    state.status = requestFulfilled(DELETE_USER_REQUEST);
  },

  [requestRejected(DELETE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: {},
    error: payload?.error,
    status: requestRejected(DELETE_USER_REQUEST),
  }),

  [SET_USER]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    status: SET_USER,
  }),
});
