<template>
    <div class="home-container">
        <header class="header">
            <h1>HR Platform</h1>

            <!-- Выводим имя пользователя (проверяем, что данные из Pinia доступны) -->
            <div class="user-info">
                <span class="greeting">Привет, {{ authStore.user?.firstName || 'Пользователь' }}!</span>

                <!-- Кнопка Выйти -->
                <button @click="handleLogout" class="logout-btn">
                    Выйти
                </button>
            </div>
        </header>

        <main class="content">
            <h2>Главная страница</h2>
            <p>Здесь будет дашборд с доступными сменами.</p>
            <p>Твоя роль: <strong>{{ authStore.user?.role }}</strong></p>
        </main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
    // 1. Очищаем токены и данные пользователя в Pinia и LocalStorage
    authStore.logout();

    // 2. Перенаправляем на страницу логина
    router.push('/login');
};
</script>

<style scoped>
.home-container {
    min-height: 100vh;
    background-color: #f3f4f6;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.greeting {
    color: #4b5563;
    font-weight: 500;
}

.logout-btn {
    padding: 0.5rem 1rem;
    background-color: #ef4444;
    /* Красный цвет для действия выхода */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.logout-btn:hover {
    background-color: #dc2626;
}

.content {
    padding: 2rem;
}
</style>