import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // 1. Состояние (State)
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  // 2. Вычисляемые свойства (Getters)
  const isAuthenticated = computed(() => !!accessToken.value);
  const isManager = computed(() => user.value?.role === 'MANAGER');

  // 3. Действия (Actions)
  function setAuthData(data) {
    accessToken.value = data.tokens.accessToken;
    user.value = data.user;
    
    // Сохраняем в localStorage для переживания F5
    localStorage.setItem('accessToken', data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.tokens.refreshToken); // Для MVP храним и его
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  function logout() {
    accessToken.value = null;
    user.value = null;
    localStorage.clear();
  }

  return { 
    accessToken, user, isAuthenticated, isManager, 
    setAuthData, logout 
  };
});