<template>
    <div>
        <div class="col mb-4" v-for="n in 50" :key="n">
            <div class="card">
                <router-link to="/product" >
                    <img src="https://via.placeholder.com/800" alt="Product image" class="card-img-top">
                </router-link>
                <div class="card-body">
                    <router-link to="/product" class="product-name h5">Product name</router-link>
                    <div>
                        <p>$34.00</p>
                        <p>Current stock: 20</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductSummary',
    props: {
        products: {type: Array, default: () => [],}
    }
}
</script>

<style>
    a.product-name{color: inherit;}
    a.product-name:hover{text-decoration: none;}
</style>