import axios from 'axios';
import { base_url } from "../../utils/baseUrl.js"; 
import {config} from "../../utils/axiosConfig.js";

export const createCollaboration = async (postId, collaborationData) => {
    const response = await axios.post(`${base_url}/collab/create-collab`, collaborationData, config);
    return response.data;
  };