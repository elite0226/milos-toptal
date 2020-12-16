import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import { GET_REVIEWS_REQUEST } from '../types';

const initialState = {
  reviews: [],
  review: {},
  average: null,
  highest: null,
  lowest: null,
  canReply: false,
  totalCount: 0,
  status: 'INIT',
  error: null,
};

export default createReducer(initialState, {
  [requestFulfilled(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: payload.reviews,
    average: payload.average,
    highest: payload.highest,
    lowest: payload.lowest,
    canReply: payload.canReply,
    totalCount: payload.totalCount,
    status: requestFulfilled(GET_REVIEWS_REQUEST),
  }),

  [requestRejected(GET_REVIEWS_REQUEST)]: (state, { payload }) => ({
    ...state,
    reviews: [],
    average: null,
    highest: null,
    lowest: null,
    canReply: false,
    totalCount: 0,
    error: payload?.error,
    status: requestRejected(GET_REVIEWS_REQUEST),
  }),
});
