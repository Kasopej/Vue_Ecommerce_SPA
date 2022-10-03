<template>
  <main class="container-fluid p-4">
      <div class="row">
          <div class="col-md-6">
            <img :src="product.image" alt="" class="img-fluid">
          </div>
          <div class="col-md-6 description">
            <h3>Description</h3>
            <p>{{product.description}}</p>
            <hr>
            <div>
                <p>Current stock: {{product.rating.count}}</p>
                <p>${{product.price}}</p>
                <p class="cart-item-quantity-controls pr-4">Add to cart 
                    <span @click="removeProductFromCart(product)" class="ml-2 btn btn-xs btn-success">-</span>
                    <span class="px-2">{{productInCart(product.id)}}</span>
                    <span @click="addProductToCart(product)" class="btn btn-xs btn-success">+</span>
                </p>
                <router-link to="/cart" class="btn btn-xl btn-success">Go to cart</router-link>
            </div>
          </div>
      </div>
      
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      default: () => 0
      }
  },

    data() {
      return {
        product: {},
      }

    },
    created() {
      //await this.letStoreGetProducts();
      this.product = this.findProductById(this.id);

    },
    computed: {
      ...mapGetters(['findProductById', 'productInCart'])  
    },
    methods: {
      ...mapActions({letStoreGetProducts: 'getProductsData', addProductToCart: 'addProductToCart', removeProductFromCart: 'removeProductFromCart'}),
    },

}
</script>

<style>
  .cart-item-quantity-controls span:first-of-type{padding-left: 10px;}
</style>