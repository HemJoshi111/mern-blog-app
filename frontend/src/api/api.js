import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This works because of the "proxy" in package.json
});

// Request Interceptor
// This function will be called before every request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // If token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;