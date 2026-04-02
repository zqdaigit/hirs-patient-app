import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = 'https://api.hirs.com/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = ''; // TODO: Get from storage
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle token expiry
    }
    return Promise.reject(error);
  }
);

export default api;
