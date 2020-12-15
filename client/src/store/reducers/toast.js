import { createReducer } from '@reduxjs/toolkit';

import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../types';

const initialState = {
  notifications: [],
};

export default createReducer(initialState, {
  [ENQUEUE_SNACKBAR]: (state, { payload }) => ({
    ...state,
    notifications: [
      ...state.notifications,
      {
        key: payload.key,
        ...payload.notification,
      },
    ],
  }),

  [CLOSE_SNACKBAR]: (state, { payload }) => ({
    ...state,
    notifications: state.notifications.map((notification) =>
      payload.dismissAll || notification.key === payload.key
        ? { ...notification, dismissed: true }
        : { ...notification }
    ),
  }),

  [REMOVE_SNACKBAR]: (state, { payload }) => ({
    ...state,
    notifications: state.notifications.filter((notification) => notification.key !== payload.key),
  }),
});
