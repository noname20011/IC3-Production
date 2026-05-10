import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://my-spring-app-ic3.onrender.com/api/v1", // Thay bằng URL của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Tự động đính kèm Token trước khi gửi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Xử lý response hoặc lỗi tập trung (ví dụ: Token hết hạn)
axiosClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp, không cần .data ở component
  (error) => {
    if (error.response?.status === 401) {
      // Logic xử lý khi logout hoặc refresh token ở đây
      console.error('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;