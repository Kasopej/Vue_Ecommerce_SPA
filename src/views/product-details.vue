<template>
  <main class="container-fluid p-4">
      <div class="row">
          <div class="col-md-6">
            <img src="https://via.placeholder.com/600" alt="" class="img-fluid">
            <div>
                <p>Current stock: 20</p>
                <p>$34.00</p>
                <p class="cart-item-quantity-controls pr-4">Add to cart 
                    <span class="ml-2 btn btn-xs btn-success">-</span>
                    <span class="px-2">3</span>
                    <span class="btn btn-xs btn-success">+</span>
                </p>
            </div>
          </div>
          <div class="col-md-6 description">
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus non cum, a hic ab dolorum repellendus, suscipit saepe temporibus mollitia minus quisquam consectetur eum pariatur distinctio? Non odit nesciunt quibusdam</p>
          </div>
      </div>
      
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
  .cart-item-quantity-controls span:first-of-type{padding-left: 10px;}
</style>