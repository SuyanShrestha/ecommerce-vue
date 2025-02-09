import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    filteredProducts: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
      state.filteredProducts = products
    },

    filterBySearch(state, searchText) {
      if (!searchText) {
        state.filteredProducts = state.products
      } else {
        state.filteredProducts = state.products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()),
        )
      }
    },
  },
  actions: {
    async fetchProducts(context) {
      const { data } = await axios.get('https://dummyjson.com/products')
      context.commit('setProducts', data.products)
    },
  },
}
