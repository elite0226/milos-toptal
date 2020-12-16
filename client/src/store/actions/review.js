import reviewService from 'src/services/review';
import { requestRejected, requestPending, requestFulfilled } from 'src/utils/api';
import {
  CREATE_REVIEW_REQUEST,
  GET_REVIEWS_REQUEST,
  UPDATE_REVIEW_REQUEST,
  DELETE_REVIEW_REQUEST,
  SET_REVIEW,
  ENQUEUE_SNACKBAR,
} from '../types';

export function getReviews(restaurantId, offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_REVIEWS_REQUEST) });

      const {
        reviews,
        totalCount,
        average,
        highest,
        lowest,
        canReply,
      } = await reviewService.getReviews(restaurantId, offset, limit);

      dispatch({
        type: requestFulfilled(GET_REVIEWS_REQUEST),
        payload: { reviews, totalCount, average, highest, lowest, canReply },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(GET_REVIEWS_REQUEST),
        payload: error?.response?.data,
      });
    }
  };
}

export function createReview(restaurantId, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_REVIEW_REQUEST) });

      const { review } = await reviewService.createReview(restaurantId, payload);

      dispatch({
        type: requestFulfilled(CREATE_REVIEW_REQUEST),
        payload: { review },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new review successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(CREATE_REVIEW_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Create a new review failed',
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

export function updateReview(restaurantId, reviewId, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_REVIEW_REQUEST) });

      const { review } = await reviewService.updateReview(restaurantId, reviewId, payload);

      dispatch({
        type: requestFulfilled(UPDATE_REVIEW_REQUEST),
        payload: { review },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a review successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(UPDATE_REVIEW_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Update a review successfully',
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

export function deleteReview(restaurantId, reviewId) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_REVIEW_REQUEST) });

      await reviewService.deleteReview(restaurantId, reviewId);

      dispatch({
        type: requestFulfilled(DELETE_REVIEW_REQUEST),
        payload: { reviewId },
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a review successfully',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: requestRejected(DELETE_REVIEW_REQUEST),
        payload: error?.response?.data,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        payload: {
          notification: {
            message: 'Delete a review successfully',
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

export function setReview(review) {
  return (dispatch) => {
    dispatch({
      type: SET_REVIEW,
      payload: { review },
    });
  };
}
