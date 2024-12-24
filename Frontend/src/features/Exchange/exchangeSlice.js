import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base_url } from "../../utils/baseUrl.js";
import axios from 'axios';
import {config}  from "../../utils/axiosConfig.js";

const API_URL = `${base_url}exchange`
// Async thunks
export const createExchange = createAsyncThunk(
    'exchanges/createExchange',
    async (exchangeData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, exchangeData,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllExchanges = createAsyncThunk(
    'exchanges/getAllExchanges',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getExchangeById = createAsyncThunk(
    'exchanges/getExchangeById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateExchange = createAsyncThunk(
    'exchanges/updateExchange',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteExchange = createAsyncThunk(
    'exchanges/deleteExchange',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getExchangesByUser = createAsyncThunk(
    'exchanges/getExchangesByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserRequests = createAsyncThunk(
    'exchanges/getUserRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/requests`,config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const handleExchangeRequest = createAsyncThunk(
    'exchanges/handleExchangeRequest',
    async ({ requestId, action }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/requests/${requestId}`, { action },config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const exchangesSlice = createSlice({
    name: 'exchanges',
    initialState: {
        exchanges: [],
        requests: [],
        userRequests: [],
        selectedExchange: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createExchange.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createExchange.fulfilled, (state, action) => {
                state.loading = false;
                state.exchanges.push(action.payload.data);
            })
            .addCase(createExchange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getAllExchanges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllExchanges.fulfilled, (state, action) => {
                state.loading = false;
                state.exchanges = action.payload.data;
            })
            .addCase(getAllExchanges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getExchangeById.fulfilled, (state, action) => {
                state.selectedExchange = action.payload.data;
            })
            .addCase(getUserRequests.fulfilled, (state, action) => {
                state.userRequests = action.payload.requests;
            })
            .addCase(handleExchangeRequest.fulfilled, (state, action) => {
                const { requestId, action: actionType } = action.meta.arg;
                if (actionType === 'accept') {
                    state.userRequests = state.userRequests.filter(
                        (request) => request._id !== requestId
                    );
                }
            });
    },
});

export default exchangesSlice.reducer;
