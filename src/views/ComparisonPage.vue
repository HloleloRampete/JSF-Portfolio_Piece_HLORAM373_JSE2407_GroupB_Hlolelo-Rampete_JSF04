<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Product Comparison</h1>
      <div v-if="comparisonList.length > 0">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-4 py-2">Product</th>
              <th class="px-4 py-2">Image</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Rating</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in comparisonList" :key="product.id">
              <td class="border px-4 py-2">{{ product.title }}</td>
              <td class="border px-4 py-2">
                <img :src="product.image" alt="Product Image" class="h-16">
              </td>
              <td class="border px-4 py-2">{{ product.description }}</td>
              <td class="border px-4 py-2">${{ product.price }}</td>
              <td class="border px-4 py-2">
                <Ratings :rate="product.rating.rate" :count="product.rating.count" />
              </td>
              <td class="border px-4 py-2">{{ product.category }}</td>
              <td class="border px-4 py-2">
                <button
                  @click="removeFromComparison(index)"
                  class="inline-flex justify-center whitespace-nowrap rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4">
          <button
            @click="clearComparisonList"
            class="inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Clear Comparison List
          </button>
        </div>
      </div>
      <div v-else>
        <p>No products added for comparison.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getComparisonList, saveComparisonList } from "@/utils/comparison";
  import Ratings from "@/components/RatingsComponent.vue";
  
  export default {
    name: "ComparisonPage",
    components: {
      Ratings,
    },
    data() {
      return {
        comparisonList: [],
      };
    },
    mounted() {
      this.comparisonList = getComparisonList();
    },
    methods: {
      removeFromComparison(index) {
        this.comparisonList.splice(index, 1);
        saveComparisonList(this.comparisonList);
      },
      clearComparisonList() {
        this.comparisonList = [];
        saveComparisonList(this.comparisonList);
      },
    },
  };
  </script>
  