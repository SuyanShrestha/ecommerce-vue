<template>
  <div class="page-container">
    <!-- Controllers and filters -->
    <ProductsSidebar :listType="listType" />

    <!-- Main Content -->
    <AllProductsList :listType="listType" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import AllProductsList from '@/components/AllProducts.vue'
import ProductsSidebar from '@/components/ProductsSidebar.vue'

const props = defineProps({
  listType: {
    type: String,
    required: true,
    default: 'products',
  },
})
</script>

<style scoped>
.page-container {
  position: relative;
  overflow: hidden;
  text-align: center;

  display: flex;
  height: calc(100vh - 8vh);
}
</style>
