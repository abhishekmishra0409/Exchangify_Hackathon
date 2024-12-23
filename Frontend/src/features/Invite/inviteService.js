import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import {config}  from "../../utils/axiosConfig.js";

// Send an invite
const sendInvite = async (inviteData) => {
    const response = await axios.post(`${base_url}/send`, inviteData,config);
    return response.data;
};

// Get pending requests for the logged-in user
const getRequests = async () => {
    const response = await axios.get(`${base_url}/requests`,config);
    return response.data.requests;
};

// Respond to a request
const respondToRequest = async (responseData) => {
    const response = await axios.post(`${base_url}/respond`, responseData,config);
    return response.data;
};

const inviteService = {
    sendInvite,
    getRequests,
    respondToRequest,
};

export default inviteService;
