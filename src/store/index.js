import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

let state = {
  products: [], users: []
};
let mutations = {
  populateStoreProducts(state, products) {
    state.products = products;
  }
};
let actions = {
  async fetchProductsData({ commit }) {
    let productsObj = await axios.get('https://fakestoreapi.com/products');
    let products = productsObj.data
    commit('populateStoreProducts', products);
  }
};
let getters = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
