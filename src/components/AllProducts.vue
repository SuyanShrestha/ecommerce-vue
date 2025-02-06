<template>
  <div class="page-container">
    <h1 class="page-title">Our Products</h1>
    <div v-if="productList.length === 0" class="loading-message">Loading products...</div>
    <div class="container">
      <div v-for="product in productList" :key="product.id" class="product-card">
        <div class="product-image-container">
          <img
            :src="product.images[0] || product.thumbnail"
            :alt="product.title"
            class="product-image"
          />
        </div>
        <div class="product-details">
          <p class="product-title">{{ product.title }}</p>
          <div class="price-section">
            <p class="product-price">${{ product.price }}</p>
            <p class="discount-percentage" v-if="product.discountPercentage">
              {{ product.discountPercentage }}% OFF
            </p>
          </div>
          <div class="product-rating">
            <span class="rating-stars">Rating</span>
            <span class="rating-value">{{ product.rating }}</span>
          </div>
          <p
            class="product-stock"
            :class="{ 'low-stock': product.availabilityStatus === 'Low Stock' }"
          >
            {{ product.availabilityStatus }}
          </p>
          <div class="product-to-cart">
            <button class="product-to-cart-button" @click="incrementProductCount(product)">
              +
            </button>
            <span class="product-to-cart-count">{{ getProductCount(product.id) }}</span>
            <button class="product-to-cart-button" @click="decrementProductCount(product)">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AllProductsList',
  setup() {
    const store = useStore()
    const productList = computed(() => store.state.products.products)
    const getProductCount = (productId) =>
      computed(() => store.getters['cart/getProductCount'](productId))

    const fetchProducts = () => {
      store.dispatch('products/fetchProducts')
    }

    const incrementProductCount = (product) => {
      store.commit('cart/incrementProductCount', product)
    }
    const decrementProductCount = (product) => {
      store.commit('cart/decrementProductCount', product)
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      productList,
      fetchProducts,
      getProductCount,
      incrementProductCount,
      decrementProductCount,
    }
  },
}
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0;
  color: #1f2937;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #6b7280;
  margin: 2rem 0;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  padding: 1rem;
  background: #f3f4f6;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.product-details {
  padding: 1rem;
  text-align: center;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #1f2937;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #10b981;
}

.discount-percentage {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ef4444;
  background: #fee2e2;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.product-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.rating-stars {
  color: #6b7280;
}

.rating-value {
  font-size: 0.9rem;
  color: #6b7280;
}

.product-stock {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0.5rem 0;
}

.low-stock {
  color: #ef4444;
  font-weight: 600;
}

.product-to-cart {
  display: flex;
  align-items: center;
  margin: auto;
  gap: 10px;
  background: #f8f8f8;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: fit-content;
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

.product-to-cart-count {
  min-width: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>
