<template>
  <div class="page-container">
    <!-- title -->
    <div class="cart-title">
      <span class="cart-title-items">Preview</span>
      <span class="cart-title-items">Item Name</span>
      <span class="cart-title-items">Quantity</span>
      <span class="cart-title-items">Price per Unit</span>
      <span class="cart-title-items">Discount</span>
      <span class="cart-title-items">Price After Discount</span>
      <span class="cart-title-items">Final Total</span>
    </div>

    <!-- cart contents -->
    <div class="cart-content" v-for="item in cartItems" :key="item.id">
      <span class="cart-item">
        <img
          :src="
            item.images && item.images.length > 0
              ? item.images[0]
              : '@src/assets/item-placeholder.png'
          "
          alt="Product Image"
        />
      </span>
      <span class="cart-item">{{ item.title }}</span>
      <div class="cart-item-quantity">
        <button class="product-to-cart-button" @click="incrementProductCount(item)">+</button>
        <span class="cart-item">{{ item.count }}</span>
        <button class="product-to-cart-button" @click="decrementProductCount(item)">-</button>
      </div>
      <span class="cart-item">${{ item.price }}</span>
      <span class="cart-item">
        {{ item.discountPercentage ? item.discountPercentage + '%' : 'Fixed Price' }}
      </span>
      <span class="cart-item"> ${{ getUnitPriceAfterDiscount(item) }} </span>
      <span class="cart-item cart-item-total"> ${{ getTotalPriceAfterDiscount(item) }} </span>
    </div>

    <!-- total calculation-->
    <div class="cart-price">
      <span class="cart-price-heading">TOTAL</span>
      <span class="cart-price-heading">${{ totalAmountInCart }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { roundToTwo } from '@/custom/helper.js'

const store = useStore()
const cartItems = computed(() => store.state.cart.cartItems)
const totalAmountInCart = computed(() => store.getters['cart/getTotalAmount'])

// calculate pricings
const getUnitPriceAfterDiscount = (item) => {
  const discount = item.discountPercentage || 0
  return roundToTwo(item.price - (item.price * discount) / 100)
}
const getTotalPriceAfterDiscount = (item) => {
  return roundToTwo(getUnitPriceAfterDiscount(item) * item.count)
}

// increment or decrement quantity
const incrementProductCount = (product) => {
  store.commit('cart/incrementProductCount', product)
}
const decrementProductCount = (product) => {
  store.commit('cart/decrementProductCount', product)
}
</script>

<style scoped>
/* cart-title */
.cart-title {
  display: grid;
  grid-template-columns: 2fr 3fr 1.25fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  text-align: center;
}

.cart-title-items {
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #1a1a1a;
  border-left: none;
  padding: 1rem;
}

/* cart-content */
.cart-content {
  display: grid;
  grid-template-columns: 2fr 3fr 1.25fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.cart-item {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: ltr;
}

.cart-item img {
  width: auto;
  height: 8rem;
}

.cart-item-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.cart-item-total {
  font-weight: bold;
}

.product-to-cart-button {
  background-color: var(--success-color);
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.product-to-cart-button:hover {
  background: var(--success-darker-color);
}

/* Styling for buttons */
button {
  padding: 5px 10px;
  margin-top: 5px;
  cursor: pointer;
}

.cart-price {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 8rem;
  min-height: 5rem;
}

.cart-price .cart-price-heading {
  font-weight: 800;
  font-size: 1.5rem;
}
</style>
