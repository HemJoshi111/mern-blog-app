import api from './api'; // Import our configured axios instance

export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data; // { _id, name, email, token }
};

export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data; // { _id, name, email, token }
};