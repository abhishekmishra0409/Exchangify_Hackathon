import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService.js';

// Thunks for async actions
export const signup = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
    try {
        return await userService.signup(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Signup failed');
    }
});

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
    try {
        return await userService.login(credentials);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
});

export const getUserDetails = createAsyncThunk('user/getDetails', async (token, thunkAPI) => {
    try {
        return await userService.getUserDetails(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user details');
    }
});

export const updateUserDetails = createAsyncThunk('user/updateDetails', async ({ userData, token }, thunkAPI) => {
    try {
        return await userService.updateUserDetails(userData, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to update user details');
    }
});

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null,
};

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = 'Logged out successfully';
        },
        clearError(state) {
            state.error = null;
        },
        clearMessage(state) {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userDetails;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get User Details
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userData;
                state.isAuthenticated = true;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update User Details
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Actions
export const { logout, clearError, clearMessage } = userSlice.actions;

// Reducer
export default userSlice.reducer;
