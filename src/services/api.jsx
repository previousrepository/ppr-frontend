import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 20000, // 20s is usually enough
});

// Attach token
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      // Get fresh token (cached if still valid)
      let token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.warn("⚠️ Failed to get Firebase token:", error.message);
    }
  }

  return config;
}, (error) => Promise.reject(error));

// Handle 401 errors (expired tokens)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getAuth();
    const originalRequest = error.config;

    if (error.response?.status === 401 && auth.currentUser && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop
      try {
        console.warn("🔄 Refreshing expired token...");
        const newToken = await auth.currentUser.getIdToken(true); // force refresh
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry request with new token
      } catch (refreshError) {
        console.error("❌ Failed to refresh token:", refreshError.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
