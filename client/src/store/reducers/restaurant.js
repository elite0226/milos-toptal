import { createReducer } from '@reduxjs/toolkit';

import { requestFulfilled, requestRejected } from 'src/utils/api';
import {
  CREATE_RESTAURANT_REQUEST,
  GET_RESTAURANTS_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_REQUEST,
  SET_RESTAURANT,
} from '../types';

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

  [requestFulfilled(CREATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    totalCount: payload.totalCount + 1,
    status: requestFulfilled(CREATE_RESTAURANT_REQUEST),
  }),

  [requestRejected(CREATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload?.error,
    status: requestRejected(CREATE_RESTAURANT_REQUEST),
  }),

  [requestFulfilled(UPDATE_RESTAURANT_REQUEST)]: (state, { payload }) => {
    const index = state.restaurants.findIndex(
      (restaurant) => restaurant.id === payload.restaurant.id
    );
    if (index < 0) return;
    state.restaurants[index] = payload.restaurant;
    state.restaurant = payload.restaurant;
    state.status = requestFulfilled(UPDATE_RESTAURANT_REQUEST);
  },

  [requestRejected(UPDATE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurant: {},
    error: payload?.error,
    status: requestRejected(UPDATE_RESTAURANT_REQUEST),
  }),

  [requestFulfilled(DELETE_RESTAURANT_REQUEST)]: (state, { payload }) => {
    const filteredItem = state.restaurants.filter(
      (restaurant) => restaurant.id === payload.restaurantId
    );
    state.restaurants = filteredItem;
    state.status = requestFulfilled(DELETE_RESTAURANT_REQUEST);
  },

  [requestRejected(DELETE_RESTAURANT_REQUEST)]: (state, { payload }) => ({
    ...state,
    restaurant: {},
    error: payload?.error,
    status: requestRejected(DELETE_RESTAURANT_REQUEST),
  }),

  [SET_RESTAURANT]: (state, { payload }) => ({
    ...state,
    restaurant: payload.restaurant,
    status: SET_RESTAURANT,
  }),
});
