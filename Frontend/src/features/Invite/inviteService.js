import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import { config } from "../../utils/axiosConfig.js";

// Send an invite
const sendInvite = async (inviteData) => {
    const response = await axios.post(`${base_url}invite/send-request`, inviteData, config);
    return response.data;
};

// Get pending requests for the logged-in user
const getRequests = async () => {
    const response = await axios.get(`${base_url}invite/view-requests`, config);
    return response.data.requests;
};

// Respond to a request
const respondToRequest = async (responseData) => {
    const response = await axios.post(`${base_url}invite/respond-request`, responseData, config);
    return response.data;
};

// Get invites by team ID
const getInvitesByTeamId = async (teamId) => {
    const response = await axios.get(`${base_url}invite/team/${teamId}/invites`, config);
    return response.data;
};

const inviteService = {
    sendInvite,
    getRequests,
    respondToRequest,
    getInvitesByTeamId,
};

export default inviteService;
