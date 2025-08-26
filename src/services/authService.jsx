import api from './api';

export const authService = {
    
  verifyFubkCredentials: (fubkId, fubkPassword) =>
    api.post('/auth/scrapeFubkCredential', { fubkId, fubkPassword }),

  getCurrentUserRole: () => api.get('/auth/role'),

  setRole: (uid, role) => api.post('/auth/setRole', { uid, role }),
  
};
 