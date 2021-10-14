import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

let state = {};
let mutations = {};
let actions = {
  async fetchProductsData({ commit }) {
    let productsObj = await axios.get('https://fakestoreapi.com/products');
    let products = productsObj.data
    commit()
  }
};
let getters = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
