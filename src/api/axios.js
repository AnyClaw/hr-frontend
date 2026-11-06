import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Адрес твоего Java-бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов (Request Interceptor)
apiClient.interceptors.request.use(
  (config) => {
    // Берем токен из Pinia
    const authStore = useAuthStore();
    
    if (authStore.accessToken) {
      // Если токен есть, добавляем его в заголовок Authorization
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов (Response Interceptor) - Обработка 401 (протух токен)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    
    // Если бэк вернул 401 Unauthorized, и это не запрос на логин
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      authStore.logout(); // Разлогиниваем
      window.location.href = '/login'; // Кидаем на страницу входа
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;