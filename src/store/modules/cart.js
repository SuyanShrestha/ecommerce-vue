export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push(product)
    },
  },
  getters: {
    cartItemsCount: (state) => {
      return state.cartItems.length
    },
  },
}
