<template>
  <div class="flex flex-col items-center">
    <ProductDetail :product="product" v-if="product" />
    <div v-else>Loading...</div>
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import ProductDetail from '@/components/ProductDetail.vue';

export default {
  components: { ProductDetail },
  setup() {
    const product = ref(null);
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        product.value = response.data;
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    const goBack = () => {
      router.go(-1); // Go back in history stack
    };

    onMounted(fetchProduct);

    return { product, goBack };
  },
};
</script>
