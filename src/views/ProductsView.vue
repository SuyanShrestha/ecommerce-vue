<template>
  <div class="page-container">
    <!-- Controllers and filters -->
    <ProductsSidebar />

    <!-- Main Content -->
    <AllProductsList />
  </div>
</template>

<script setup>
import AllProductsList from '@/components/AllProducts.vue'
import ProductsSidebar from '@/components/ProductsSidebar.vue'
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
