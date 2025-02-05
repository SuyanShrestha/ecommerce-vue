<template>
  <div>
    <h1>Product List</h1>
    <div v-if="productList.length === 0">Loading products...</div>
    <ul>
      <li v-for="product in productList" :key="product.id">{{ product.title }} hello</li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProductList',
  setup() {
    const store = useStore()
    console.log('store valkue', store.state.products.products)
    const productList = computed(() => store.state.products.products)
    console.log('productList: ', productList)
    const fetchProducts = () => {
      store.dispatch('products/fetchProducts')
    }
    onMounted(() => {
      fetchProducts()
    })

    return {
      productList,
      fetchProducts,
    }
  },
}
</script>

<style></style>
