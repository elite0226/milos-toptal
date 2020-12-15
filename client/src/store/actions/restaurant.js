import restaurantService from 'src/services/restaurant';
import { requestFulfilled, requestPending, requestRejected } from 'src/utils/api';
import {
  CREATE_RESTAURANT_REQUEST,
  GET_RESTAURANTS_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_REQUEST,
  SET_RESTAURANT,
  ENQUEUE_SNACKBAR,
} from '../types';

export function getRestaurants(offset, limit, params = {}) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RESTAURANTS_REQUEST) });

      const { restaurants, totalCount } = await restaurantService.getRestaurants(
        offset,
        limit,
        params
      );

      dispatch({
        type: requestFulfilled(GET_RESTAURANTS_REQUEST),
        payload: { restaurants, totalCount },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(GET_RESTAURANTS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function createRestaurant(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_RESTAURANT_REQUEST) });

      const { restaurant } = await restaurantService.createRestaurant(payload);

      dispatch({
        type: requestFulfilled(CREATE_RESTAURANT_REQUEST),
        payload: { restaurant },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new restaurant successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(CREATE_RESTAURANT_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new restaurant failed',
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

export function updateRestaurant(restaurantId, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_RESTAURANT_REQUEST) });

      const { restaurant } = await restaurantService.updateRestaurant(restaurantId, payload);

      dispatch({
        type: requestFulfilled(UPDATE_RESTAURANT_REQUEST),
        payload: { restaurant },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a restaurant successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(UPDATE_RESTAURANT_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a restaurant successfully',
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

export function deleteRestaurant(restaurantId) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_RESTAURANT_REQUEST) });

      await restaurantService.deleteRestaurant(restaurantId);

      dispatch({
        type: requestFulfilled(DELETE_RESTAURANT_REQUEST),
        payload: { restaurantId },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a restaurant successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(DELETE_RESTAURANT_REQUEST),
        payload: error.response.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a restaurant successfully',
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

export function setRestaurant(restaurant) {
  return (dispatch) => {
    dispatch({
      type: SET_RESTAURANT,
      payload: { restaurant },
    });
  };
}
