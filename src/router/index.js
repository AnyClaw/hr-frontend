import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LoginView from '../views/LoginView.vue';
// import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { 
      path: '/', 
      name: 'home', 
      component: () => import('../views/HomeView.vue'), // Заглушка
      meta: { requiresAuth: true } // Этот маршрут требует авторизации
    },
    // ... другие маршруты
  ]
});

// Глобальный перехватчик роутера
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Если страница требует авторизации, а токена нет -> на логин
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } 
  // Если пользователь уже авторизован и ломится на страницу логина -> на главную
  else if (to.name === 'login' && authStore.isAuthenticated) {
    next('/');
  } 
  // Иначе пропускаем
  else {
    next();
  }
});

export default router;