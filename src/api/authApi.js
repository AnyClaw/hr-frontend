import apiClient from './axios';

export const authApi = {
  async login(email, password) {
    return await apiClient.post('/auth/login', { email, password });
  },
  
  async refreshToken(refreshToken) {
    return await apiClient.post('/auth/refresh', { refreshToken });
  }
};