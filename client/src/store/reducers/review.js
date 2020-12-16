import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import {
  CREATE_REVIEW_REQUEST,
  GET_REVIEWS_REQUEST,
  SET_REVIEW,
  DELETE_REVIEW_REQUEST,
  UPDATE_REVIEW_REQUEST,
} from '../types';

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

  [requestFulfilled(CREATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    totalCount: state.totalCount + 1,
    canReply: false,
    status: requestFulfilled(CREATE_REVIEW_REQUEST),
  }),

  [requestRejected(CREATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload?.error,
    status: requestRejected(CREATE_REVIEW_REQUEST),
  }),

  [requestFulfilled(UPDATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: payload.review,
    status: requestFulfilled(UPDATE_REVIEW_REQUEST),
  }),

  [requestFulfilled(UPDATE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: {},
    error: payload?.error,
    status: requestRejected(UPDATE_REVIEW_REQUEST),
  }),

  [requestFulfilled(DELETE_REVIEW_REQUEST)]: (state, { payload }) => {
    const filteredItem = state.reviews.filter((review) => review.id === payload.reviewId);
    state.reviews = filteredItem;
    state.status = requestFulfilled(DELETE_REVIEW_REQUEST);
  },

  [requestRejected(DELETE_REVIEW_REQUEST)]: (state, { payload }) => ({
    ...state,
    review: {},
    error: payload?.error,
    status: requestRejected(DELETE_REVIEW_REQUEST),
  }),

  [SET_REVIEW]: (state, { payload }) => ({
    ...state,
    review: payload.review,
    status: SET_REVIEW,
  }),
});
