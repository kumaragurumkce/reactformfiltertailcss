import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch Posts
export const fetchPosts = async () => {
  return await axios.get(API_URL);
};

// Add Post
export const addPost = async (post) => {
  return await axios.post(API_URL, post);
};

// Update Post
export const updatePost = async (id, post) => {
  return await axios.put(`${API_URL}/${id}`, post);
};

// Delete Post
export const deletePost = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};