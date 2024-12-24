import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import {config}  from "../../utils/axiosConfig.js";


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
      // console.log(response.data)
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.userDetails));
        localStorage.setItem("token", JSON.stringify(response.data.userDetails.token));

      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed, try again later' };
    }
  },

  // Get user details
  async getUserDetails() {
    try {

      const response = await axios.get(`${base_url}auth/getUserDetails`, config);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user details' };
    }
  },

  // Get users by skills
  async getUsersBySkills(skills) {
    try {
      const response = await axios.get(`${base_url}auth/skills`, {
        params: { skills },
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users by skills' };
    }
  },


  // Update user details
  async updateUserDetails(userData) {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      console.log(formData, "formData in service")
      const response = await axios.put(`${base_url}/update`, formData, {
        config,
      });
      console.log(response.data, "response in service")
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user details' };
    }
  },
};



export default userService;
