import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createPost,
    getPostsBySkills,
    getUserPosts,
    deletePost,
    likePost,
    addComment,
} from "./postService";

// Async actions
export const createPostAsync = createAsyncThunk(
    "posts/createPost",
    async (postData, { rejectWithValue }) => {
        try {
            return await createPost(postData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPostsBySkills = createAsyncThunk(
    "posts/fetchPostsBySkills",
    async (_, { rejectWithValue }) => {
        try {
            return await getPostsBySkills();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserPosts = createAsyncThunk(
    "posts/fetchUserPosts",
    async (_, { rejectWithValue }) => {
        try {
            return await getUserPosts();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePostAsync = createAsyncThunk(
    "posts/deletePost",
    async (postId, { rejectWithValue }) => {
        try {
            return await deletePost(postId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likePostAsync = createAsyncThunk(
    "posts/likePost",
    async (postId, { rejectWithValue }) => {
        try {
            return await likePost(postId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCommentAsync = createAsyncThunk(
    "posts/addComment",
    async ({ postId, comment }, { rejectWithValue }) => {
        try {
            // console.log(comment)
            return await addComment(postId,  comment);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



// Slice
const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        userPosts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch posts by skills
        builder.addCase(fetchPostsBySkills.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPostsBySkills.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload.data;
        });
        builder.addCase(fetchPostsBySkills.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch user posts
        builder.addCase(fetchUserPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.userPosts = action.payload.data;
        });
        builder.addCase(fetchUserPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create a post
        builder.addCase(createPostAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createPostAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.posts.unshift(action.payload.data); // Add the new post to the beginning of the posts array
        });
        builder.addCase(createPostAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete a post
        builder.addCase(deletePostAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletePostAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter(
                (post) => post._id !== action.meta.arg
            ); // Remove the deleted post from the posts array
        });
        builder.addCase(deletePostAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Like/Unlike a post
        builder.addCase(likePostAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(likePostAsync.fulfilled, (state, action) => {
            const updatedPost = action.payload?.data;
            if (updatedPost && updatedPost._id) {
                state.posts = state.posts.map((post) =>
                    post._id === updatedPost._id ? updatedPost : post
                );
            } else {
                console.error('Invalid updated post data:', updatedPost);
            }
            state.loading = false;
        });


        builder.addCase(likePostAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Add a comment
        builder.addCase(addCommentAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addCommentAsync.fulfilled, (state, action) => {
            const { postId, comment } = action.meta.arg;  // Get the postId and new comment from the action
            state.posts = state.posts.map((post) =>
                post._id === postId
                    ? { ...post, comments: [...post.comments, comment] }  // Add the new comment
                    : post
            );
            state.loading = false;
        });


        builder.addCase(addCommentAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default postSlice.reducer;
