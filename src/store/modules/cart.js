import { roundToTwo } from "@/custom/helper"

export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  mutations: {
    incrementProductCount(state, product) {
      const existingProduct = state.cartItems.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.count++
      } else {
        state.cartItems.push({ ...product, count: 1 }) // Add new product if it doesn't exist
      }
    },
    decrementProductCount(state, product) {
      const existingProduct = state.cartItems.find((item) => item.id === product.id)
      if (existingProduct && existingProduct.count > 1) {
        existingProduct.count--
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== product.id) // Remove product if count reaches 0
      }
    },
  },
  getters: {
    getCartItemsCount: (state) => {
      const allProductsCountInCart = state.cartItems.reduce((total, product) => {
        return total + product.count
      }, 0)
      return allProductsCountInCart
    },
    getProductCount: (state) => (productId) => {
      const product = state.cartItems.find((item) => item.id === productId)
      return product ? product.count : 0
    },
    getTotalAmount: (state) => {
      const totalPrice = state.cartItems.reduce((total, product) => {
        const discount = product.discountPercentage ? product.discountPercentage / 100 : 0
        const discountedUnitPrice = product.price - product.price * discount
        const productPrice = product.count * discountedUnitPrice
        return total + productPrice
      }, 0)
      return roundToTwo(totalPrice)
    },
  },
}
