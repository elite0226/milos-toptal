import axios from 'src/utils/axios';

const baseURL = '/api/restaurants';

class ReviewService {
  getReviews = async (restaurantId, offset, limit) => {
    try {
      const response = await axios.get(`${baseURL}/${restaurantId}/reviews`, {
        params: {
          offset,
          limit,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createReview = async (restaurantId, payload) => {
    try {
      const response = await axios.post(`${baseURL}/${restaurantId}/reviews`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateReview = async (restaurantId, reviewId, payload) => {
    try {
      const response = await axios.put(`${baseURL}/${restaurantId}/reviews/${reviewId}`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteReview = async (restaurantId, reviewId) => {
    try {
      const response = await axios.delete(`${baseURL}/${restaurantId}/reviews/${reviewId}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const reviewService = new ReviewService();

export default reviewService;
