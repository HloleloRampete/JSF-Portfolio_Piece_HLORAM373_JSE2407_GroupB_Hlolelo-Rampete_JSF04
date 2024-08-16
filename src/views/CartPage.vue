<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="flex flex-col bg-white p-4 rounded-lg shadow">
      </div>
    </div>
    <div>
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
