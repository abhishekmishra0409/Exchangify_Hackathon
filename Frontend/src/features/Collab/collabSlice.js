import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collabService from './collabService';

const initialState = {
    collabs: [],
    teams: [],
    teamDetail: null,
    isLoading: false,
    isError: false,
    message: '',
};

// Thunk to create a new collab
export const createCollab = createAsyncThunk(
    'collab/createCollab',
    async (collabData, thunkAPI) => {
        try {
            return await collabService.createCollab(collabData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Thunk to fetch user's collabs
export const getMyCollabs = createAsyncThunk(
    'collab/getMyCollabs',
    async (_, thunkAPI) => {
        try {
            return await collabService.getMyCollabs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Thunk to create a new team
export const createTeam = createAsyncThunk(
    'collab/createTeam',
    async (teamData, thunkAPI) => {
        try {

            return await collabService.createTeam(teamData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Thunk to fetch teams for a specific collab
export const getTeamsByCollab = createAsyncThunk(
    'collab/getTeamsByCollab',
    async (collabId, thunkAPI) => {
        try {
            return await collabService.getTeamsByCollab(collabId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
// Thunk to fetch a team by its ID
export const getTeamById = createAsyncThunk(
    'collab/getTeamById',
    async (teamId, thunkAPI) => {
        try {
            return await collabService.getTeamById(teamId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const collabSlice = createSlice({
    name: 'collab',
    initialState,
    reducers: {
        reset: (state) => {
            state.collabs = [];
            state.teams = [];
            state.teamDetail = null;
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCollab.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCollab.fulfilled, (state, action) => {
                state.isLoading = false;
                state.collabs.push(action.payload);
            })
            .addCase(createCollab.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyCollabs.fulfilled, (state, action) => {
                state.collabs = action.payload;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.teams.push(action.payload);
            })
            .addCase(getTeamsByCollab.fulfilled, (state, action) => {
                state.teams = action.payload;
            })
            .addCase(getTeamById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeamById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teamDetail = action.payload;
            })
            .addCase(getTeamById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = collabSlice.actions;
export default collabSlice.reducer;
