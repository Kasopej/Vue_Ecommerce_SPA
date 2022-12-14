import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

const state = {
  products: [], users: [], cart: [], message: "", userIsSignedIn: false, loggedUser: {}, searchResults: [],
};
const mutations = {
  populateStoreProducts(state, products) {
    state.products = products;
    state.message = '';
  },
  populateStoreUsers(state, users) {
    state.users = users;
  },
  storeQueryResults(state, queryResults) {
    state.searchResults = queryResults;
  },
  signIn(state, user) {
    state.loggedUser = user;
    state.userIsSignedIn = true;
  },
  signUp(state, newUser) {
    state.users.push(newUser);
    state.loggedUser = newUser;
    state.userIsSignedIn = true;
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
    !error ? state.cart = [] : state.message = 'Please ensure your cart does not exceed the stock currently available';
  }
};
const actions = {
  async getProductsData(context) {
    //Check if there is data in state (state is persisted), if NOT get products via API
    if (!context.state.products.length) {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data
      context.commit('populateStoreProducts', products);
    }
  },
  async getUsers(context) {
    if (!context.state.users.length) {
      const response = await axios.get('https://fakestoreapi.com/users');
      const users = response.data;
      context.commit('populateStoreUsers', users)
    }
  },
  queryProducts(context, query) {
    const queryResults = context.state.products.filter((product) => {
      return product.title.includes(query) || product.description.includes(query) || product.category.includes(query);
    })
    context.commit('storeQueryResults', queryResults)
  },
  signIn(context, loginEntry) {
    let user = context.state.users.find(user => user.email === loginEntry.email);
    if (user.password === loginEntry.password) {
      context.commit('signIn', user);
    }
  },
  async signUp(context, signUpEntry) {
    try {
      const newUser = await axios.post('https://fakestoreapi.com/users', {
        email: signUpEntry.email, password: signUpEntry.password, name: { firstname: signUpEntry.firstName, lastname: signUpEntry.lastName }
      }).data;
      context.commit('signUp', newUser);
    }
    catch (error) {
      console.log(error.response.data);
    }

  },
  getCartFromStorage({ commit }) {
    //Check if there are items in local storage cart array, if there are commit to state cart
    if (localStorage.getItem('cart')) {
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
    const index = context.state.cart.findIndex(cartItem => cartItem.id == product.id);
    //Check quantity of item. Will not run if qty is zero or does not exist (undefined)
    if (context.state.cart[index].quantity) {
      context.commit('depopulateCart', index);
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));

  },
  checkout(context) {
    let error = false;
    //Compare items in cart iteratively to products in state
    context.state.cart.some(function (cartItem) {
      context.state.products.forEach(
        function (product) {
          if (cartItem.id == product.id) {
            if (product.rating.count >= cartItem.quantity) product.rating.count -= cartItem.quantity;
            else { error = true; } //Error if attempt is made to checkout more than what is available in stock
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
    return state.cart.find(cartItem => cartItem.id == id) ? state.cart.find(cartItem => cartItem.id == id).quantity : 0;
  },
  cartTotal(state) {
    return state.cart.reduce((sum, cartItem) => sum + (cartItem.quantity * cartItem.price), 0).toFixed(2)
  },
  totalInCart(state) {
    return state.cart.length;
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
