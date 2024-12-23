// Add to imports at the top
import { createCollaboration } from "./postService";

// Add new async thunk
export const createCollaborationAsync = createAsyncThunk(
    "posts/createCollaboration",
    async ({ collab, collaborationData }, { rejectWithValue }) => {
        try {
            return await createCollaboration(postId, collaborationData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// In the postSlice definition, add to extraReducers
const postSlice = createSlice({
    // ... existing slice configuration ...
    extraReducers: (builder) => {
        // ... existing reducers ...

        // Add collaboration
        builder.addCase(createCollaborationAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCollaborationAsync.fulfilled, (state, action) => {
            state.loading = false;
            const { postId } = action.meta.arg;
            state.posts = state.posts.map((post) =>
                post._id === postId
                    ? { ...post, collaborations: [...(post.collaborations || []), action.payload.data] }
                    : post
            );
        });
        builder.addCase(createCollaborationAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});