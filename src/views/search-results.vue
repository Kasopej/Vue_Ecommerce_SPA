<template>
  <div class="row row-cols-2 row-cols-md-4">
      <div class="col mb-4" v-for="product in searchResults" :key="product.id">
            <div class="card h-100 p-1 p-lg-2">
                <router-link :to="{name: 'ProductDetails', params: {id: product.id},}">
                    <img :src="product.image" alt="Product image" class="card-img-top">
                </router-link>
                <div class="card-body">
                    <router-link :to="{name: 'ProductDetails', params: {id: product.id},}" class="product-name h5">{{product.title}}</router-link>
                    <div>
                        <p>${{product.price}}</p>
                        <p>Current stock: {{product.rating.count}}</p>
                        <p class="cart-item-quantity-controls pr-4">Add to cart 
                            <span @click="removeProductFromCart(product)" class="ml-2 btn btn-xs btn-success">-</span>
                            <span class="px-2">{{productInCart(product.id)}}</span>
                            <span @click="addProductToCart(product)" class="btn btn-xs btn-success">+</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(['searchResults']),
        ...mapGetters(['productInCart']),
    },
    methods: {
        ...mapActions({addProductToCart: 'addProductToCart', removeProductFromCart: 'removeProductFromCart',})    
    },
}
</script>

<style>

</style>