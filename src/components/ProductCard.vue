<template>
  <div
    @click="handleClick"
    :class="[
      'flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden',
      { 'bg-white': !isCartView, 'bg-gray-100': isCartView } // Conditional styling for cart view
    ]"
  >
    <img
      class="object-contain h-48 mt-3"
      :src="product.image"
      alt="Product Image"
    />

    <div class="flex-1 flex flex-col p-6">
      <div class="flex-1">
        <header class="mb-2 flex-2">
          <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
            <div
              class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              {{ product.title }}
            </div>
          </h2>
        </header>
        <div class="flex items-center">
          <Ratings :rate="product.rating.rate" :count="product.rating.count" />
          <span class="ml-2 mb-2 text-sm text-gray-500">({{ product.rating.count }} reviews)</span>
        </div>
        <div
          class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug"
        >
          <h2>${{ product.price }}</h2>
        </div>
      </div>

      <div v-if="!isCartView" class="flex mt-1 space-x-2 items-center">
        <div class="justify-start flex-1">
          <span
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >
            {{ product.category }}
          </span>
        </div>
        <div class="flex justify-end items-center space-x-2">
          <button @click.stop="addToFavourites">
            <svg
              class="h-5 w-5 hover:fill-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              transform="scale(1.6)"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </button>

          <button
            @click.stop="addToCart"
            class="inline-flex items-center rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path
                d="M1 1h4l2.68 13.39a1 1 0 00.92.76h9.72a1 1 0 00.98-.8l1.54-7.79H6.62"
              />
            </svg>
          </button>

          <button
            @click.stop="addToComparison"
            class="inline-flex items-center rounded-lg bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 20v-6M18 20V10M6 20v-4"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Cart-specific features -->
      <div v-if="isCartView" class="flex mt-2 space-x-2 items-center">
        <input
          type="number"
          min="1"
          v-model.number="quantity"
          class="w-20 p-2 border border-gray-300 rounded"
        />
        <button
          @click.stop="updateQuantity"
          class="inline-flex items-center rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
        >
          Update
        </button>
        <button
          @click.stop="removeFromCart"
          class="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Ratings from "@/components/RatingsComponent.vue";
import { getComparisonList } from "@/utils/comparison";
import { saveComparisonList } from "@/utils/comparison";
import { jwtDecode } from 'jwt-decode';

export default {
  name: "ProductCard",
  components: {
    Ratings
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isCartView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quantity: this.isCartView ? this.product.quantity || 1 : 1
    };
  },
  methods: {
    handleClick() {
      if (!this.isCartView) {
        this.$router.push({ name: "ProductDetail", params: { id: this.product.id } });
      }
    },
    addToComparison() {
      const comparisonList = getComparisonList(); // Call the function
      if (comparisonList.length >= 3) {
        alert('You can only compare up to 3 products.');
        return;
      }
      if (!comparisonList.some(item => item.id === this.product.id)) {
        comparisonList.push(this.product);
        saveComparisonList(comparisonList);
      }
    },
    addToCart() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
      }

      const userId = jwtDecode(token).userId;
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      const existingItemIndex = cart.findIndex(item => item.id === this.product.id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
        alert('Product quantity updated.');
      } else {
        cart.push({ ...this.product, quantity: 1 });
      }
      
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    },
    updateQuantity() {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const userId = jwtDecode(token).userId;
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const item = cart.find(item => item.id === this.product.id);
      if (item) {
        item.quantity = this.quantity;
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        this.$emit('updateQuantity', this.product.id, this.quantity);
      }
    },
    removeFromCart() {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const userId = jwtDecode(token).userId;
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const updatedCart = cart.filter(item => item.id !== this.product.id);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      this.$emit('removeItem', this.product.id);
    },
    addToFavourites(event) {
      event.stopPropagation();
      // Add to favorites logic
    }
  }
};
</script>

<style scoped>
.product-card {
  @apply flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden;
}
</style>
