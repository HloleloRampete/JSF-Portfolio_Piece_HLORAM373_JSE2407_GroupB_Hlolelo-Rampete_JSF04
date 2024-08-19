<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in cartItems" :key="item.id" class="flex flex-col bg-white p-4 rounded-lg shadow">
        <img :src="item.image" alt="" class="w-full h-48 object-cover" />
        <h2 class="text-lg font-bold">{{ item.title }}</h2>
        <p>${{ item.price }} x {{ item.quantity }}</p>
        <button @click="removeItem(item.id)" class="bg-red-500 text-white py-1 px-3 rounded">Remove</button>
        <input type="number" v-model="item.quantity" @change="updateQuantity(item.id, item.quantity)" min="1" />
      </div>
    </div>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div class="mt-6">
      <p class="text-lg font-semibold">Total: ${{ cartTotal }}</p>
      <button @click="clearCart" class="mt-4 inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },
  methods: {
    loadCart() {
      const token = localStorage.getItem('token');
      if (!token) return;
      const userId = jwtDecode(token).userId;
      this.cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    },
    updateQuantity(id, quantity) {
      const token = localStorage.getItem('token');
      if (!token) return;
      const userId = jwtDecode(token).userId;
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = Number(quantity);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
      }
    },
    removeItem(id) {
      const token = localStorage.getItem('token');
      if (!token) return;
      const userId = jwtDecode(token).userId;
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
      this.loadCart();
    },
    clearCart() {
      const token = localStorage.getItem('token');
      if (!token) return;
      const userId = jwtDecode(token).userId;
      localStorage.removeItem(`cart_${userId}`);
      this.loadCart();
    }
  },
  mounted() {
    this.loadCart();
  }
};
</script>
