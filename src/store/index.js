import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

const state = {
  products: [], users: []
};
const mutations = {
  populateStoreProducts(state, products) {
    state.products = products;
  }
};
const actions = {
  async getProductsData({ commit }) {
    const productsObj = await axios.get('https://fakestoreapi.com/products');
    const products = productsObj.data
    commit('populateStoreProducts', products);
  }
};
const getters = {
  findProductById: (state) => (id) => {
    console.log(`Finding product with id of ${id} from ${JSON.stringify(state.products)}`);
    return state.products.find(e => e.id == id)
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
