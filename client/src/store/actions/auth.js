import { push } from 'connected-react-router';

import authService from 'src/services/auth';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import { LOGIN_REQUEST } from '../types';

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