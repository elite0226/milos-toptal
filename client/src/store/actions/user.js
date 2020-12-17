import userService from 'src/services/user';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import {
  GET_USERS_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  CREATE_USER_REQUEST,
  SET_USER,
  ENQUEUE_SNACKBAR,
} from '../types';

export function getUsers(offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_USERS_REQUEST) });

      const { users, totalCount } = await userService.getUsers(offset, limit);

      dispatch({
        type: requestFulfilled(GET_USERS_REQUEST),
        payload: { users, totalCount },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(GET_USERS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function createUser(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_USER_REQUEST) });

      const { user } = await userService.createUser(payload);

      dispatch({
        type: requestFulfilled(CREATE_USER_REQUEST),
        payload: { user },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new user successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(CREATE_USER_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new user failed',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          },
        },
      });
    }
  };
}

export function updateUser(id, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_USER_REQUEST) });

      const { user } = await userService.updateUser(id, payload);

      dispatch({
        type: requestFulfilled(UPDATE_USER_REQUEST),
        payload: { user },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a user successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(UPDATE_USER_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a user failed',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          },
        },
      });
    }
  };
}

export function deleteUser(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_USER_REQUEST) });

      await userService.deleteUser(id);

      dispatch({
        type: requestFulfilled(DELETE_USER_REQUEST),
        payload: { id },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a user successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(DELETE_USER_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a user failed',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          },
        },
      });
    }
  };
}

export function setUser(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };
}
