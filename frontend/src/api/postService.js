import api from './api';

// Get all posts (public)
export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// Get single post by ID (public)
export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Get posts by logged-in user (protected)
export const getMyPosts = async () => {
  const response = await api.get('/posts/my/posts'); // Our custom route
  return response.data;
};

// Create a new post (protected)
export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

// Update a post (protected)
export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

// Delete a post (protected)
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};