<template>
  <div id="cart-page container">
      <main v-if="cart.length == 0" class="empty-cart">
          <div class="text-center">
              <img src="assets/img/empty-cart.png" alt="Empty Cart Image" class="empty-cart-img">
              <h2>Your Cart is Empty!</h2>
              <router-link to="/" class="btn btn-lg btn-dark">Shop</router-link>
          </div>
      </main>
      <main v-else class="loaded-cart p-4">
          <div class="justify-content-center">
              <h3 class="text-center mb-3">My Cart</h3>
              <section v-for="product in cart" :key="product.id" class="cart-item mb-2 mx-md-auto mb-md-3">
                  <div class="d-inline-block">
                      <img :src="product.image" alt="cart item image" class="img-fluid">
                  </div>
                  <div class="cart-item-specs d-block d-md-inline-block px-2">
                      <p class="">{{product.title}}</p>
                      <p class="">Item color</p>
                      <p class="">{{product.category}}</p>
                      <p class="mb-0">Current stock: {{product.rating.count}}</p>
                  </div>
                  <div class="cart-item-numbers d-block d-md-inline-block">
                      <span class="d-block px-3">${{product.price}}</span>
                      <p class="mb-0 cart-item-quantity-controls">
                          <span @click="removeProductFromCart(product)" class="btn btn-xs btn-success">-</span>
                          <span class="px-2">{{productInCart(product.id)}}</span>
                          <span @click="addProductToCart(product)" class="btn btn-xs btn-success">+</span>
                      </p>
                  </div>
              </section>
              <h4 class="cart-total text-center mx-auto mt-4">Total: ${{cartTotal}}</h4>
              <div class="text-center mt-3">
                  <button @click="tryCheckout" class="px-2 btn-xl btn-success rounded mx-2">Checkout Cart</button>
                  <router-link to="/" class="mx-2">
                    <button class="px-2 btn-xl btn-warning rounded">Continue Shopping</button>
                  </router-link>
              </div>
              <p v-if="message" class="mt-3 text-center border">{{message}}</p>
              <div v-if="showCheckingOutMsg">
                  <button @click="readyToCheckout = false" class="btn-md btn-danger" style="float: right">x</button>
                  <p style="clear: both">Attempting to checkout cart...</p>
              </div>
          </div>
          <div v-if="showSignInAlert" class="card sign-in-alert">
              <div class="card-body">
                  <p>Please sign in before checkout</p>
              </div>
              <div class="card-footer d-flex justify-content-end">
                  <button @click="showSignInAlert = false" class="btn btn-info">Dismiss</button>
              </div>
          </div>
      </main>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: 'CartDetails',
    data() {

        return {
            readyToCheckout: false, showSignInAlert: false,
        }

    },
    computed: {
        ...mapState(['cart', 'message', 'userIsSignedIn']),
        ...mapGetters(['productInCart', 'cartTotal']),
        showCheckingOutMsg(){
            if(this.readyToCheckout) {
                return true;
            }
            else return false;
        },
    },
    methods: {
      ...mapActions({addProductToCart: 'addProductToCart', removeProductFromCart: 'removeProductFromCart', checkout: 'checkout',}),
      tryCheckout(){
          if(this.userIsSignedIn){
            this.readyToCheckout = true;
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!this.checkingOut){
                        resolve()
                    }
                    else setTimeout(() => reject(), 2000)
                }, 2000)
            }).catch(console.log).finally(this.checkout)
        }
        else{
            this.showSignInAlert = true
        }
      },
    },
}
</script>

<style>
    *{box-sizing: border-box;}
    .empty-cart{height: 95vh; display: flex; justify-content: center; align-items: center;}
    .empty-cart > div {width: 50vw; text-align: center; text-align: end;}
    .empty-cart-img{width: 50vw;}
    .cart-item{text-align: center; margin-bottom: 25px;}
    .cart-item > div{vertical-align: bottom;}
    .cart-item-specs p{margin-bottom: 3px;}
    .cart-item-numbers{text-align: center; font-size: 21px;}
    .cart-item-quantity-controls span:hover{cursor: pointer;}
    .sign-in-alert{position: absolute; top: 200px; left: 35vw; width: 30vw;}
    @media screen and (min-width: 768px){
        .cart-item, .cart-total{width: 100%;}
        .cart-item > div{width: 20%;}
        .empty-cart-img{width: 30vw;}
    }
</style>