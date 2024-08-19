<!-- ComparisonPage.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Product Comparison</h1>
      <div v-if="comparisonList.length === 0" class="text-center">
        <p>No products added to comparison list.</p>
      </div>
      <div v-else>
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Feature</th>
              <th v-for="product in comparisonList" :key="product.id" class="border p-2">
                {{ product.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">Image</td>
              <td v-for="product in comparisonList" :key="product.id" class="border p-2">
                <img :src="product.image" :alt="product.title" class="w-32 h-32 object-contain mx-auto">
              </td>
            </tr>
            <tr>
              <td class="border p-2">Description</td>
              <td v-for="product in comparisonList" :key="product.id" class="border p-2">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="border p-2">Price</td>
              <td v-for="product in comparisonList" :key="product.id" class="border p-2">
                ${{ product.price }}
              </td>
            </tr>
            <tr>
              <td class="border p-2">Rating</td>
              <td v-for="product in comparisonList" :key="product.id" class="border p-2">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </td>
            </tr>
            <tr>
              <td class="border p-2">Category</td>
              <td v-for="product in comparisonList" :key="product.id" class="border p-2">
                {{ product.category }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex justify-between">
          <button @click="clearComparisonList" class="bg-red-500 text-white px-4 py-2 rounded">
            Clear Comparison List
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getComparisonList, saveComparisonList } from '@/utils/comparison';
  
  export default {
    name: 'ComparisonPage',
    setup() {
      const comparisonList = ref([]);
  
      onMounted(() => {
        comparisonList.value = getComparisonList();
      });
  
      const clearComparisonList = () => {
        comparisonList.value = [];
        saveComparisonList([]);
      };
  
      return {
        comparisonList,
        clearComparisonList,
      };
    },
  };
  </script>