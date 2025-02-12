import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    filteredProducts: [],
    searchText: '',
    rating: null,
    sortPrice: '',
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
      state.filteredProducts = products
    },

    filterBySearch(state, searchText) {
      state.searchText = searchText
      this.commit('products/applyFilters')
    },

    filterByRating(state, rating) {
      state.rating = rating
      this.commit('products/applyFilters')
    },

    sortPriceBy(state, newSort) {
      state.sortPrice = newSort
      this.commit('products/applyFilters')
    },

    applyFilters(state) {
      let filtered = state.products

      // search Filter
      if (state.searchText) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(state.searchText.toLowerCase()),
        )
      }

      // rating Filter
      if (state.rating !== null) {
        filtered = filtered.filter((product) => product.rating >= state.rating)
      }

      // sorting by price
      if (state.sortPrice === '') {
        // this will point to original filtered since we are not using spread operator
        state.filteredProducts = filtered
      } else if (state.sortPrice === 'low-to-high') {
        // since we are using spread operator here, it will mutate a fresh copy of filtered, rather than original filtered
        filtered = [...filtered].sort((a, b) => a.price - b.price)
      } else if (state.sortPrice === 'high-to-low') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
      }

      state.filteredProducts = filtered
    },

    resetAllFilters(state) {
      state.searchText = ''
      state.rating = null
      state.sortPrice = ''
      state.filteredProducts = [...state.products]
    },
  },
  actions: {
    async fetchProducts(context) {
      const { data } = await axios.get('https://dummyjson.com/products')
      context.commit('setProducts', data.products)
    },
  },
}
