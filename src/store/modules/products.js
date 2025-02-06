import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
  },
  actions: {
    async fetchProducts(context) {
      const { data } = await axios.get('https://dummyjson.com/products')
      context.commit('setProducts', data.products)
    },
  },
  getters: {
    getProductsByRating: (state) => (rating) => {
      return state.products.rating.rate >= rating
    },
  },
}
