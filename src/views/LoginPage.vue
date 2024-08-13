<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Login to SwiftCart</h2>
      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              class="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="passwordVisible ? 'text' : 'password'"
                class="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                <span v-if="passwordVisible">Hide</span>
                <span v-else>Show</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="mt-4 text-blue-600">Logging in...</div>
        <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            :disabled="loading"
          >
            Login
          </button>
          <p class="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="/register" class="text-blue-600 hover:text-blue-500"
              >Sign up</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        error.value = 'Username and password are required';
        return;
      }

      loading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          const redirectTo = localStorage.getItem('redirectPath') || '/';
          localStorage.removeItem('redirectPath');
          router.push(redirectTo);
        } else {
          error.value = 'Invalid username or password';
        }
      } catch (err) {
        error.value = 'Failed to log in. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      passwordVisible,
      loading,
      error,
      togglePasswordVisibility,
      handleLogin,
    };
  },
};
</script>