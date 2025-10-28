import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 20000,
});

let authReady = false;
let authReadyCallbacks = [];

const onAuthReady = (callback) => {
  if (authReady) {
    callback();
  } else {
    authReadyCallbacks.push(callback);
  }
};

const auth = getAuth();
auth.onAuthStateChanged(() => {
  authReady = true;
  authReadyCallbacks.forEach(callback => callback());
  authReadyCallbacks = [];
});

api.interceptors.request.use(async (config) => {
  return new Promise((resolve) => {
    onAuthReady(async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          let token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.warn("⚠️ Failed to get Firebase token:", error.message);
        }
      }
      resolve(config);
    });
  });
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getAuth();
    const originalRequest = error.config;

    if (error.response?.status === 401 && auth.currentUser && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.warn("🔄 Refreshing expired token...");
        const newToken = await auth.currentUser.getIdToken(true);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Failed to refresh token:", refreshError.message);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;