import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const state = {
  products: [], users: [], cart: [], message: "",
};
const mutations = {
  populateStoreProducts(state, products) {
    state.products = products;
    state.message = '';
  },
  populateCart_existing(state, index) {
    state.cart[index].quantity++;
    state.message = '';
  },
  populateCart_new(state, product) {
    state.cart.push({ ...product, quantity: 1 })
  },
  depopulateCart(state, index) {
    state.cart[index].quantity--;
    (state.cart[index].quantity == 0) ? state.cart.splice(index, 1) : state.cart;
    state.message = '';
  },
  populateCartFromStorage(state) {
    state.cart = JSON.parse(localStorage.getItem('cart'));
  },
  checkout(state, error) {
    !error ? state.cart = [] : state.message = 'Please ensure your cart does not exceed the stock  currently available';
  }
};
const actions = {
  async getProductsData(context) {
    if (!context.state.products.length) {
      console.log('Initializing products Array');
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data
      context.commit('populateStoreProducts', products);
    }
  },
  getCartFromStorage({ commit }) {
    if (localStorage.getItem('cart')) {
      console.log('Geting cart from local storage');
      commit('populateCartFromStorage')
    }
  },
  addProductToCart(context, product) {
    const item = context.state.cart.find(cartItem => cartItem.id == product.id);
    if (item) {
      const index = context.state.cart.indexOf(item)
      context.commit('populateCart_existing', index)
    }
    else {
      context.commit('populateCart_new', product);
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));

  },
  removeProductFromCart(context, product) {
    //const currentlyInCart = context.getters.productInCart(product.id);
    //const payloads = { product: product, currentlyInCart: currentlyInCart };
    const index = context.state.cart.findIndex(cartItem => cartItem.id == product.id);
    if (context.state.cart[index].quantity) {
      context.commit('depopulateCart', index);
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));

  },
  checkout(context) {
    let error = false;
    context.state.cart.some(function (cartItem) {
      context.state.products.forEach(
        function (product) {
          if (cartItem.id == product.id) {
            if (product.rating.count >= cartItem.quantity) product.rating.count -= cartItem.quantity;
            else { error = true; }
          }
        }
      )
      return error;
    })
    context.commit('checkout', error);
    localStorage.removeItem('cart');
  }
};
const getters = {
  findProductById: (state) => (id) => {
    return state.products.find(product => product.id == id)
  },
  productInCart: (state) => (id) => {
    console.log('checking quantity');
    return state.cart.find(cartItem => cartItem.id == id) ? state.cart.find(cartItem => cartItem.id == id).quantity : 0;
  },
  cartTotal(state) {
    return state.cart.reduce((sum, cartItem) => sum + (cartItem.quantity * cartItem.price), 0).toFixed(2)
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
