import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import { GET_RESTAURANTS_REQUEST } from '../types';

const initialState = {
  restaurants: [],
  restaurant: {},
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestFulfilled(GET_RESTAURANTS_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurants: payload.restaurants,
    totalCount: payload.totalCount,
    status: requestFulfilled(GET_RESTAURANTS_REQUEST),
  }),

  [requestRejected(GET_RESTAURANTS_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurants: [],
    error: payload?.error,
    status: requestRejected(GET_RESTAURANTS_REQUEST),
  }),
});
