import { createStore } from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

export default createStore({
  modules: {
    products,
    cart,
  },
})
