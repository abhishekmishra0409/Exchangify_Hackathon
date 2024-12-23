import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import {config}  from "../../utils/axiosConfig.js";


// Create a new post
export const createPost = async (postData) => {
    const response = await axios.post(`${base_url}/create`, postData, config);
    return response.data;
};

// Get posts by user skills
export const getPostsBySkills = async () => {
    const response = await axios.get(`${base_url}posts/`,config);
    return response.data;
};

// Get user posts
export const getUserPosts = async () => {
    const response = await axios.get(`${base_url}/user`,config);
    return response.data;
};

// Delete a post
export const deletePost = async (postId) => {
    const response = await axios.delete(`${base_url}/${postId}`,config);
    return response.data;
};

// Like/Unlike a post
export const likePost = async (postId) => {
    const response = await axios.put(`${base_url}/${postId}/like`,config);
    return response.data;
};

// Add a comment to a post
export const addComment = async (postId, commentData) => {
    const response = await axios.post(`${base_url}/${postId}/comment`, commentData,config);
    return response.data;
};
