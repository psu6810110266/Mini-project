import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ✅ backend เท่านั้น
  timeout: 10000,
});

// ✅ แนบ token อัตโนมัติทุก request
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('app_token') ||
      sessionStorage.getItem('app_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ จัดการ error กลาง
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
