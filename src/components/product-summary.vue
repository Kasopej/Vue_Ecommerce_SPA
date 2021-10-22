<template>
    <div>
        <div class="col mb-4" v-for="product in products" :key="product.id">
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
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    name: 'ProductSummary',
    data() {

        return {
            
        }

    },
    created() {
        this.letStoreGetProducts();
    },
    methods: {
        ...mapActions({letStoreGetProducts: 'getProductsData', addProductToCart: 'addProductToCart', removeProductFromCart: 'removeProductFromCart',})    
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['productInCart']),
    },
}
</script>

<style>
    a.product-name{color: inherit;}
    a.product-name:hover{text-decoration: none;}
    .card img{max-height: 20vw; height: 20vw}
</style>