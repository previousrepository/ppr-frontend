import { api } from './api';

export const userService = {
  // Get user profile
  getProfile: () => api.get('/users/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/users/profile', profileData),
};