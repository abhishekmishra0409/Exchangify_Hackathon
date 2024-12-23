import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';


const userService = {
  // Signup user
  async signup(userData) {
    try {
      const response = await axios.post(`${base_url}auth/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed, try again later' };
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await axios.post(`${base_url}auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed, try again later' };
    }
  },

  // Get user details
  async getUserDetails(token) {
    try {
      const response = await axios.get(`${base_url}auth/getUserDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user details' };
    }
  },

  // Update user details
  async updateUserDetails(userData, token) {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axios.put(`${base_url}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user details' };
    }
  },
};

export default userService;
