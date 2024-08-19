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
              <button @click="removeFromComparison(product.id)" class="ml-2 text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
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
    <button
      @click="goBack"
      class="flex items-center justify-center mt-6 ml-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full fixed bottom-5 right-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 me-2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5"/>
      </svg>
      Back to Product List
    </button>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getComparisonList, saveComparisonList } from '@/utils/comparison';


export default {
  name: 'ComparisonPage',
  setup() {
    const comparisonList = ref([]);
    const router = useRouter();


    onMounted(() => {
      comparisonList.value = getComparisonList();
    });


    const clearComparisonList = () => {
      comparisonList.value = [];
      saveComparisonList([]);
    };


    const removeFromComparison = (productId) => {
      comparisonList.value = comparisonList.value.filter(product => product.id !== productId);
      saveComparisonList(comparisonList.value);
    };


    const goBack = () => {
      router.push({ name: 'Home' }); // Assuming 'Home' is the name of your product list route
    };


    return {
      comparisonList,
      clearComparisonList,
      removeFromComparison,
      goBack,
    };
  },
};
</script>
