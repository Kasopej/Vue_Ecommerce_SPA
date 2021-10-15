import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

const state = {
  products: [], users: [], cart: [],
};
const mutations = {
  populateStoreProducts(state, products) {
    state.products = products;
  },
  populateCart(state, product) {
    const item = state.cart.find(e => e.id == product.id);
    if (item) {
      const index = state.cart.indexOf(item)
      state.cart[index].quantity++;
    }
    else {
      state.cart.push({ ...product, quantity: 1 })
    }
    console.log(state.cart);
  },
  depopulateCart(state, payload) {
    if (payload.currentlyInCart) {
      console.log('depopulating.. current quantity: ' + payload.currentlyInCart);
      const index = state.cart.findIndex(e => e.id == payload.product.id);
      console.log(`check index of product: ${index}`);
      state.cart[index].quantity--;
      (state.cart[index].quantity == 0) ? state.cart.splice(index, 1) : state.cart
    }
  }
};
const actions = {
  async getProductsData({ commit }) {
    const productsObj = await axios.get('https://fakestoreapi.com/products');
    const products = productsObj.data
    commit('populateStoreProducts', products);
  },
  addProductToCart(context, product) {
    context.commit('populateCart', product);
  },
  removeProductFromCart(context, product) {
    const currentlyInCart = context.getters.productInCart(product.id);
    const payloads = { product: product, currentlyInCart: currentlyInCart }
    context.commit('depopulateCart', payloads)
  }
};
const getters = {
  findProductById: (state) => (id) => {
    return state.products.find(e => e.id == id)
  },
  productInCart: (state) => (id) => {
    console.log('checking quantity');
    return state.cart.find(e => e.id == id) ? state.cart.find(e => e.id == id).quantity : 0;
  },
  cartTotal(state) {
    return state.cart.reduce((sum, e) => sum + (e.quantity * e.price), 0).toFixed(2)
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
