import { base_url } from "../utils/baseUrl";
import axios from 'axios';

const signupService = async (userData) => {
    try {
      const user = await axios.post(`${base_url}auth/signup`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return user.data; 
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };


  const loginService = async (userData) => {
    try {
      const user = await axios.post(`${base_url}auth/login`, userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      });
      console.log(user)
      if (user.userDetails) {
        axios.defaults.headers.common["Authorization"] = user.userDetails.token;
  
        sessionStorage.setItem("user",JSON.stringify(user.userDetails));
        sessionStorage.setItem("token", user.userDetails.token);
  
        return user.data;
    }


        
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };
  
  const authService = {
    signupService,
    loginService
  }

  export default authService;