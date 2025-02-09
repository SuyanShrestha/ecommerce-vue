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
}

/* Top Wave */
.page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  background: url('@/assets/svg/wave-top-bajra.svg') no-repeat top center;
  background-size: cover;
  transform: rotate(180deg);
  z-index: -1;
}

/* Bottom Wave */
.page-container::after {
  content: '';
  position: absolute;
  bottom: -20vh;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('@/assets/svg/wave-bottom-bajra.svg') no-repeat bottom center;
  background-size: cover;
  z-index: -1;
}
</style>
