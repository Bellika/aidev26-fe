import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Important! Sends cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle responses (optional but useful)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.log('Unauthorized - redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default api;
