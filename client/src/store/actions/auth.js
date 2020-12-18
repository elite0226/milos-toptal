import { push } from 'connected-react-router';

import authService from 'src/services/auth';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import {
  GET_PROFILE_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_PROFILE_REQUEST,
  DELETE_PROFILE_REQUEST,
  ENQUEUE_SNACKBAR,
} from '../types';

export function login(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(LOGIN_REQUEST) });

      const { user, token } = await authService.login(payload);

      localStorage.setItem('token', token);
      dispatch({
        type: requestFulfilled(LOGIN_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestRejected(LOGIN_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function signup(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(SIGNUP_REQUEST) });

      const { user, token } = await authService.signup(payload);

      localStorage.setItem('token', token);
      dispatch({
        type: requestFulfilled(SIGNUP_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestRejected(SIGNUP_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_PROFILE_REQUEST) });

      const { user } = await authService.getProfile();
      dispatch({
        type: requestFulfilled(GET_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      dispatch(push('/home'));
    } catch (error) {
      dispatch({
        type: requestRejected(GET_PROFILE_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function updateProfile(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_PROFILE_REQUEST) });

      const { user } = await authService.updateProfile(payload);
      dispatch({
        type: requestFulfilled(UPDATE_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update your profile successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(UPDATE_PROFILE_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update your profile failed',
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

export function deleteProfile() {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_PROFILE_REQUEST) });

      const { user } = await authService.deleteProfile();
      dispatch({
        type: requestFulfilled(DELETE_PROFILE_REQUEST),
        payload: {
          user,
        },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete your profile successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
      localStorage.clear();
      dispatch(push('/login'));
    } catch (error) {
      dispatch({
        type: requestRejected(DELETE_PROFILE_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete your profile failed',
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

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT_REQUEST });
    dispatch(push('/login'));
  };
}
