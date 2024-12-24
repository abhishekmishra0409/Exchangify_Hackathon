import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import {config}  from "../../utils/axiosConfig.js";


// Create a new collab
const createCollab = async (collabData) => {
    console.log(collabData)
    const response = await axios.post(`${base_url}collab/create-collab`, collabData, config);
    return response.data.collab;
};

// Get user's collabs
const getMyCollabs = async () => {
    const response = await axios.get(`${base_url}collab/my-collabs`, config);
    return response.data.collabs;
};

// Create a team under a collab
const createTeam = async (teamData) => {
    const response = await axios.post(`${base_url}collab/create-team`, teamData, config);
    return response.data.team;
};

// Get teams for a specific collab
const getTeamsByCollab = async (collabId) => {

    const response = await axios.get(`${base_url}collab/${collabId}/teams`, config);
    return response.data.teams;
};

// Get a team by its ID
const getTeamById = async (teamId) => {
    const response = await axios.get(`${base_url}collab/team/${teamId}`, config);
    return response.data.team;
};

const collabService = {
    createCollab,
    getMyCollabs,
    createTeam,
    getTeamsByCollab,
    getTeamById,
};

export default collabService;
