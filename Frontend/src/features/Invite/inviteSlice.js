import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inviteService from './inviteService';

// Thunk to send an invite
export const sendInvite = createAsyncThunk(
    'invite/sendInvite',
    async (inviteData, thunkAPI) => {
        try {
            return await inviteService.sendInvite(inviteData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Thunk to get pending requests
export const getRequests = createAsyncThunk(
    'invite/getRequests',
    async (_, thunkAPI) => {
        try {
            return await inviteService.getRequests();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Thunk to respond to a request
export const respondToRequest = createAsyncThunk(
    'invite/respondToRequest',
    async (responseData, thunkAPI) => {
        try {
            return await inviteService.respondToRequest(responseData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Thunk to get invites by team ID
export const getInvitesByTeamId = createAsyncThunk(
    'invite/getInvitesByTeamId',
    async (teamId, thunkAPI) => {
        try {
            return await inviteService.getInvitesByTeamId(teamId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const inviteSlice = createSlice({
    name: 'invite',
    initialState: {
        invites: [],
        requests: [],
        teamInvites: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Send invite
            .addCase(sendInvite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendInvite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.invites.push(action.payload);
                state.message = 'Invite sent successfully!';
            })
            .addCase(sendInvite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get requests
            .addCase(getRequests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.requests = action.payload;
            })
            .addCase(getRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Respond to a request
            .addCase(respondToRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(respondToRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.requests = state.requests.filter(
                    (req) => req._id !== action.meta.arg.requestId
                );
            })
            .addCase(respondToRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get invites by team ID
            .addCase(getInvitesByTeamId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInvitesByTeamId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.teamInvites = action.payload.invites;
            })
            .addCase(getInvitesByTeamId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = inviteSlice.actions;
export default inviteSlice.reducer;
