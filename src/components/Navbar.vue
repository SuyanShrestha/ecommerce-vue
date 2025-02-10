<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const totalProductsInCart = computed(() => store.getters['cart/getCartItemsCount'])
</script>

<template>
  <nav class="navbar">
    <!-- Left: Logo -->
    <div class="logo">
      <RouterLink to="/" exact-active-class="active" class="nav-link"><h2>VuePasal</h2></RouterLink>
    </div>

    <!-- Middle: Links -->
    <ul class="nav-links">
      <li>
        <router-link to="/" exact-active-class="active" class="nav-link">Home</router-link>
      </li>
      <li>
        <router-link to="/products" exact-active-class="active" class="nav-link"
          >Products</router-link
        >
      </li>
      <li>
        <router-link to="/about" exact-active-class="active" class="nav-link">About</router-link>
      </li>
      <li>
        <router-link to="/contact" exact-active-class="active" class="nav-link"
          >Contact</router-link
        >
      </li>
    </ul>

    <!-- Right: Cart Button -->
    <div class="cart">
      <RouterLink to="/cart" class="cart-btn">
        Cart {{ totalProductsInCart ? totalProductsInCart : null }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  padding: 0 2rem;
  background: var(--secondary-main);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo */
.logo {
  height: 8vh;
  display: flex;
  align-items: center;
}
.logo a {
  text-decoration: none;
  color: var(--text-secondary);
  height: 100%;
}

.logo h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--button-secondary);
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-top-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
  background-color: var(--button-secondary);
  color: var(--button-text-dark);
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.logo h2:hover {
  background: var(--button-secondary-hover);
  color: var(--button-text-light);
}

/* Navigation Links */
.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 2rem;
}

.nav-links a {
  color: var(--white);
  text-decoration: none;
  box-sizing: border-box;
  padding: 0rem 1.5rem;
  font-size: 1.25rem;
  transition:
    background-color 0.3s ease,
    text-decoration 0.3s ease,
    height 0.3s ease,
    box-shadow 0.3s ease-in-out;
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 8vh;
}

.nav-links a:hover {
  background-color: var(--button-secondary);
  color: var(--button-text-dark);
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  border-top: none;
  outline: none;
}

/* Active Link Styling */
.nav-links a.router-link-exact-active,
.nav-links a.router-link-active {
  background-color: var(--button-secondary);
  color: var(--button-text-dark);
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 0 12px rgba(56, 142, 60, 0.4);
  outline: none;
  transition: box-shadow 0.3s ease-in-out;
}

/* Cart Button */
.cart {
  display: flex;
  align-items: center;
  height: 100%;
}

.cart-btn {
  text-decoration: none;
  background: var(--button-secondary);
  color: var(--button-text-dark);
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0 1.5rem;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
  height: 8vh;
  line-height: 8vh;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.cart-btn:hover {
  background: var(--button-secondary-hover);
  color: var(--button-text-light);
}
</style>
