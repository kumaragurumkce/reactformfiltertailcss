import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, addPost, updatePost, deletePost } from './postService';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Async Thunks
export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchPosts();
  return response.data;
});

export const addPostAsync = createAsyncThunk('posts/addPost', async (post) => {
  const response = await addPost(post);
  return response.data;
});

export const updatePostAsync = createAsyncThunk(
  'posts/updatePost',
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const response = await updatePost(id, post);
      return response.data;
    } catch (error) {
      return rejectWithValue({ id, post });
    }
  }
);

export const deletePostAsync = createAsyncThunk('posts/deletePost', async (id) => {
  await deletePost(id);
  return id;
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    editPost: null,
    searchQuery: '', // Add search query to state
    loading: false,
    error: null,
  },
  reducers: {
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    },
    cancelEdit: (state) => {
      state.editPost = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update search query
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Add Post
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // Update Post
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        );
        state.editPost = null;
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        const { id, post } = action.payload;
        state.posts = state.posts.map((p) =>
          p.id === id ? { ...p, ...post } : p
        );
        state.editPost = null;
      })
      // Delete Post
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export const { setEditPost, cancelEdit, setSearchQuery } = postsSlice.actions;
export default postsSlice.reducer;