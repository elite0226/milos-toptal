import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../types';

export function enqueueSnackbar(notification) {
  return (dispatch) => {
    const key = notification.options && notification.options.key;

    dispatch({
      type: ENQUEUE_SNACKBAR,
      payload: {
        notification: {
          ...notification,
          key: key || new Date().getTime() + Math.random(),
        },
      },
    });
  };
}

export function closeSnackbar(key) {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SNACKBAR,
      payload: {
        dismissAll: !key, // dismiss all if no key has been defined
        key,
      },
    });
  };
}

export function removeSnackbar(key) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SNACKBAR,
      payload: { key },
    });
  };
}
