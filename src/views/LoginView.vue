<template>
    <div class="login-container">
        <div class="login-card">
            <h2>Вход в систему</h2>
            <p class="subtitle">HR Platform</p>

            <form @submit.prevent="handleLogin">
                <!-- Email -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="example@mail.ru"
                        :disabled="isLoading" />
                </div>

                <!-- Пароль -->
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" v-model="password" required placeholder="••••••••"
                        :disabled="isLoading" />
                </div>

                <!-- Блок ошибки -->
                <div v-if="errorMessage" class="error-box">
                    {{ errorMessage }}
                </div>

                <!-- Кнопка -->
                <button type="submit" :disabled="isLoading" class="submit-btn">
                    {{ isLoading ? 'Загрузка...' : 'Войти' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await authApi.login(email.value, password.value);
        // Сохраняем данные в Pinia
        authStore.setAuthData(response.data);
        // Переходим на главную
        router.push('/');
    } catch (error) {
        if (error.response) {
            errorMessage.value = error.response.data.message || 'Ошибка авторизации';
        } else {
            errorMessage.value = 'Сервер недоступен';
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
/* Базовые стили для красоты */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f3f4f6;
}

.login-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h2 {
    margin: 0;
    color: #1f2937;
    text-align: center;
}

.subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
    font-size: 0.9rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
    background-color: #2563eb;
}

.submit-btn:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
}

.error-box {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: center;
}
</style>