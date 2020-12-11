import axios from 'src/utils/axios';

const baseURL = '/api/restaurants';

class RestaurantService {
  getRestaurants = async (offset, limit, params) => {
    try {
      const response = await axios.get(`${baseURL}`, {
        params: {
          ...params,
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

  createRestaurant = async (data) => {
    try {
      const response = await axios.post(`${baseURL}`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateRestaurant = async (restaurantId, data) => {
    try {
      const response = await axios.put(`${baseURL}/${restaurantId}`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(`${baseURL}/${restaurantId}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const restaurantService = new RestaurantService();

export default restaurantService;
