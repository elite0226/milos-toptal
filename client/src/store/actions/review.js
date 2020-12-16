import reviewService from 'src/services/review';
import { requestRejected, requestPending, requestFulfilled } from 'src/utils/api';
import { GET_REVIEWS_REQUEST } from '../types';

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
