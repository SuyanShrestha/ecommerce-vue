import axios from 'axios'

export default {
  namespaced: true,
  state: {
    favorites: [],
    filteredFavorites: [],
    allCategories: [],
    searchText: '',
    rating: null,
    minPrice: '',
    maxPrice: '',
    sortPrice: '',
    category: '',
  },
  mutations: {
    addToFavorites(state, product) {
      state.favorites.push(product)
      this.commit('favorites/applyFilters')
      this.commit('favorites/setCategories')
    },

    removeFromFavorites(state, product) {
      state.favorites = state.favorites.filter((item) => item.id !== product.id)
      this.commit('favorites/applyFilters')
      this.commit('favorites/setCategories')
    },

    setCategories(state) {
      const categorySet = new Set(state.favorites.map((product) => product.category))

      const categories = Array.from(categorySet)
        .map((name, index) => ({ id: index + 1, name })) // Assigning IDs
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically

      state.allCategories = categories

    },

    filterBySearch(state, searchText) {
      state.searchText = searchText
      this.commit('favorites/applyFilters')
    },

    filterByRating(state, rating) {
      state.rating = rating
      this.commit('favorites/applyFilters')
    },

    sortPriceBy(state, newSort) {
      state.sortPrice = newSort
      this.commit('favorites/applyFilters')
    },

    filterByCategory(state, category) {
      state.category = category.name
      this.commit('favorites/applyFilters')
    },

    filterByMinPrice(state, minPrice) {
      state.minPrice = minPrice
      this.commit('favorites/applyFilters')
    },

    filterByMaxPrice(state, maxPrice) {
      state.maxPrice = maxPrice
      this.commit('favorites/applyFilters')
    },

    applyFilters(state) {
      let filtered = state.favorites

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
        filtered = filtered.filter((product) => product.price <= state.maxPrice)
      }

      // sortByPrice
      if (state.sortPrice === '') {
        state.filteredFavorites = filtered
      } else if (state.sortPrice === 'low-to-high') {
        filtered = [...filtered].sort((a, b) => a.price - b.price)
      } else if (state.sortPrice === 'high-to-low') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
      }

      // category Filter
      if (state.category) {
        filtered = filtered.filter((product) => product.category === state.category)
      }

      state.filteredFavorites = filtered
    },

    resetAllFilters(state) {
      state.searchText = ''
      state.rating = null
      state.sortPrice = ''
      state.category = ''
      state.minPrice = ''
      state.maxPrice = ''
      state.filteredFavorites = [...state.favorites]
    },
  },
}
