import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://papkam-api.onrender.com',
  //baseURL: 'https://localhost:44388',
  timeout: 30000,
});

// 👉 Request Interceptor: Set Authorization header from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    if (error.response?.status === 401) {
      console.warn('Unauthorized - possible expired token');
      // e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
