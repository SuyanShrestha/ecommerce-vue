<template>
  <div class="component-container">
    <h1 class="page-title">
      {{ listType === 'favorites' ? 'Your Favorites' : 'Our Products' }}
    </h1>
    <div class="container">
      <div v-if="isLoading" class="loading-message">
        {{ listType === 'favorites' ? 'Loading favorites...' : 'Loading products...' }}
      </div>
      <div v-for="product in productList" :key="product.id" class="product-card">
        <button class="favourite-icon-wrapper" @click="toggleFavorite(product)">
          <fa :icon="[isFavorite(product.id) ? 'fas' : 'far', 'heart']" :class="'favourite-icon'" />
        </button>
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
            <button class="product-to-cart-button" @click="decrementProductCount(product)">
              -
            </button>
            <span class="product-to-cart-count">{{ getProductCount(product.id) }}</span>
            <button class="product-to-cart-button" @click="incrementProductCount(product)">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AllProductsList',
  props: {
    listType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const isLoading = ref(true)
    const productList = computed(() => {
      if (props.listType === 'favorites') {
        return store.state.favorites.filteredFavorites
      }
      return store.state.products.filteredProducts
    })
    const getProductCount = (productId) =>
      computed(() => store.getters['cart/getProductCount'](productId))

    const fetchProducts = () => {
      if (props.listType === 'products') {
        store.dispatch('products/fetchProducts')
      }
      isLoading.value = false
    }

    watch(
      () => props.listType,
      (newListType) => {
        if (newListType === 'products') {
          fetchProducts()
        }
      },
    )

    const incrementProductCount = (product) => {
      store.commit('cart/incrementProductCount', product)
    }
    const decrementProductCount = (product) => {
      store.commit('cart/decrementProductCount', product)
    }

    // favorites
    const isFavorite = (productId) => {
      return store.state.favorites.favorites.some((product) => product.id === productId)
    }

    const toggleFavorite = (product) => {
      if (isFavorite(product.id)) {
        store.commit('favorites/removeFromFavorites', product)
      } else {
        store.commit('favorites/addToFavorites', product)
      }
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      isLoading,
      productList,
      getProductCount,
      incrementProductCount,
      decrementProductCount,
      isFavorite,
      toggleFavorite,
    }
  },
}
</script>

<style scoped>
.component-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
  background: var(--background-light);
}

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
  color: var(--text-muted);
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
  background-color: var(--button-secondary);
  color: var(--button-text-dark);
  border: none;
  padding: 6px 12px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  width: 2.5rem;
  align-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.product-to-cart-button:hover {
  background: var(--button-secondary-hover);
}

.product-to-cart-count {
  min-width: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* favourite button */
.product-card {
  position: relative;
}

.product-card .favourite-icon-wrapper {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  aspect-ratio: 1;
  background-color: var(--button-secondary);
  border: none;
  outline: none;
  padding: 6px 12px;
  border-radius: 8px;
}

.favourite-icon {
  font-size: 1.75rem;
  cursor: pointer;
  /* color: var(--button-text-dark); */
  color: var(--button-text-dark);
}
</style>
