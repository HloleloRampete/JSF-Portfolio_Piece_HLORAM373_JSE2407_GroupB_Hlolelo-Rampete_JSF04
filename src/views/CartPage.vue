<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in cartItems" :key="item.product.id" class="flex flex-col bg-white p-4 rounded-lg shadow">
        <img :src="item.product.image" alt="Product Image" class="object-contain h-32 mb-4">
        <div class="flex-1 flex flex-col justify-between">
          <h2 class="text-lg font-semibold mb-2">{{ item.product.title }}</h2>
          <p class="text-slate-500 mb-2">{{ item.product.category }}</p>
          <p class="font-bold text-lg mb-2">${{ item.product.price }}</p>
          <p class="text-slate-600">Quantity: {{ item.quantity }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
    <div class="mt-6">
      <p class="text-lg font-semibold">Total: ${{ cartTotal }}</p>
      <button class="mt-4 inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
</script>
