import userService from 'src/services/user';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import { GET_USERS_REQUEST } from '../types';

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
        payload: error.response.data,
      });
    }
  };
}
