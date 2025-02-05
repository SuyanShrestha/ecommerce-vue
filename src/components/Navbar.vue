<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <!-- Left: Logo -->
    <div class="logo">
      <h2>VuePasal</h2>
    </div>

    <!-- Middle: Links -->
    <ul class="nav-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/products">Products</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>

    <!-- Right: Cart Button -->
    <div class="cart">
      <button class="cart-btn">🛒 Cart</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--primary-color); /* Blue Navbar */
  color: white;
}

/* Logo */
.logo h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffcc00; /* Yellow on hover */
}

/* Cart Button */
.cart-btn {
  background: white;
  color: #0d6efd;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.cart-btn:hover {
  background: #ffcc00;
  color: black;
}
</style>
