<template>
  <div class="offer">
    <p class="offer-text">Get 25% OFF on your first order.</p>
    <RouterLink class="offer-link" to="/products">Order Now</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.offer {
  background: #2c2c2c;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  max-height: 2.5rem;
}
.offer-text,
.offer-link {
  color: #ffffff;
}
.offer-link {
  text-decoration: none;
  color: #ffd700;
  font-weight: 600;
  transition: color 0.3s ease;
}
.offer-link:hover {
  color: #ffffff;
}
</style>
