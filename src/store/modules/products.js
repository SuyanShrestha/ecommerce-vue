import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    filteredProducts: [],
    allCategories: [],
    searchText: '',
    rating: null,
    minPrice: '',
    maxPrice: '',
    sortPrice: '',
    category: '',
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
      state.filteredProducts = products
    },

    setCategories(state, categories) {
      state.allCategories = categories
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

    filterByCategory(state, category) {
      state.category = category.name
      console.log('category from filterByCategory: ', category.name)
      this.commit('products/applyFilters')
    },

    filterByMinPrice(state, minPrice) {
      state.minPrice = minPrice
      this.commit('products/applyFilters')
    },

    filterByMaxPrice(state, maxPrice) {
      state.maxPrice = maxPrice
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

      // minPrice and maxPrice
      if (state.minPrice) {
        filtered = filtered.filter((product) => product.price >= state.minPrice)
      }
      if (state.maxPrice) {
        console.log('state.maxPrice: ', state.maxPrice)
        filtered = filtered.filter((product) => product.price <= state.maxPrice)
      }

      // sortByPrice
      if (state.sortPrice === '') {
        // this will point to original filtered since we are not using spread operator
        state.filteredProducts = filtered
      } else if (state.sortPrice === 'low-to-high') {
        // since we are using spread operator here, it will mutate a fresh copy of filtered, rather than original filtered
        filtered = [...filtered].sort((a, b) => a.price - b.price)
      } else if (state.sortPrice === 'high-to-low') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
      }

      // category Filter
      if (state.category) {
        filtered = filtered.filter((product) => product.category === state.category)
      }

      state.filteredProducts = filtered
    },

    resetAllFilters(state) {
      state.searchText = ''
      state.rating = null
      state.sortPrice = ''
      state.category = ''
      state.minPrice = ''
      state.maxPrice = ''
      state.filteredProducts = [...state.products]
    },
  },
  actions: {
    async fetchProducts(context) {
      try {
        const { data } = await axios.get('https://dummyjson.com/products')
        context.commit('setProducts', data.products)
        const categories = data.products
          .map((product) => product.category)
          .reduce((unique, category) => {
            // to add only unique categories
            if (!unique.some((c) => c.name === category)) {
              unique.push({ id: unique.length + 1, name: category })
            }
            return unique
          }, [])
          .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetically sorted categories
        context.commit('setCategories', categories)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
  },
}
