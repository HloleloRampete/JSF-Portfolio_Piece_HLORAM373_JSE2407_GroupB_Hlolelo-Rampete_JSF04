<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
<h2 class="text-2xl font-bold mb-6 text-gray-900">Login to SwiftCart</h2>
<form @submit.prevent="handleLogin">
  <div class="mb-4">
    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      id="email"
      v-model="email"
      class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your email"
      required
    />
  </div>
  <div class="mb-6">
    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      id="password"
      v-model="password"
      class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your password"
      required
    />
  </div>
  <button
    type="submit"
    class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Login
  </button>
  <p class="mt-4 text-center text-sm text-gray-600">
    Don't have an account? 
    <a href="/register" class="text-blue-600 hover:text-blue-500">Sign up</a>
  </p>
</form>
</div>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
setup() {
const email = ref('');
const password = ref('');

const handleLogin = () => {
// Handle login logic here
console.log('Login attempt:', { email: email.value, password: password.value });
};

return {
email,
password,
handleLogin,
};
},
};
</script>