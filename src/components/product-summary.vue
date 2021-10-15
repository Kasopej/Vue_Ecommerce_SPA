<template>
    <div>
        <div class="col mb-4" v-for="product in products" :key="product.id">
            <div class="card">
                <router-link :to="{name: 'ProductDetails', params: {id: product.id},}">
                    <img :src="product.image" alt="Product image" class="card-img-top">
                </router-link>
                <div class="card-body">
                    <router-link :to="{name: 'ProductDetails', params: {id: product.id},}" class="product-name h5">{{product.title}}</router-link>
                    <div>
                        <p>${{product.price}}</p>
                        <p>Current stock: {{product.rating.count}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: 'ProductSummary',
    props: {
        //products: {type: Array, default: () => [],}
    },
    data() {

        return {
            
        }

    },
    created() {
        this.letStoreGetProducts()
    },
    methods: {
        ...mapActions({letStoreGetProducts: 'getProductsData'})    
    },
    computed: {
        ...mapState(['products'])
    },
}
</script>

<style>
    a.product-name{color: inherit;}
    a.product-name:hover{text-decoration: none;}
</style>