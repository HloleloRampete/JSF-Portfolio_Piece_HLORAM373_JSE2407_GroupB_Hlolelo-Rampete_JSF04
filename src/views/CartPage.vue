<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="item in cartItems"
        :key="item.id"
        :product="item"
        is-cart-view="true"
        @updateQuantity="updateQuantity"
        @removeItem="removeItem"
      />
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
    <div class="mt-6">
      <p class="text-lg font-semibold">Total: ${{ cartTotal.toFixed(2) }}</p>
      <button class="mt-4 inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { jwtDecode } from 'jwt-decode';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      cartItems: [], // Cart items will be fetched from local storage
      cartTotal: 0,  // Total cost of cart items
    };
  },
  methods: {
    loadCart() {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const userId = jwtDecode(token).userId;
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      this.cartItems = cart;
      this.calculateTotal();
    },
    calculateTotal() {
      this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity(productId, quantity) {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const userId = jwtDecode(token).userId;
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const item = cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        this.loadCart();
      }
    },
    removeItem(productId) {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const userId = jwtDecode(token).userId;
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      this.loadCart();
    }
  },
  mounted() {
    this.loadCart();
  }
};
</script>
