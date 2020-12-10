import { push } from 'connected-react-router';

import authService from 'src/services/auth';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import { LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../types';

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

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT_REQUEST });
    dispatch(push('/login'));
  };
}
