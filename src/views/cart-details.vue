<template>
  <div id="cart-page container">
      <main v-if="false" class="empty-cart">
          <div>
              <img src="assets/img/empty-cart.png" alt="Empty Cart Image" class="img-fluid">
              <h2>Your Cart is Empty!</h2>
              <button class="btn btn-lg btn-dark">Shop</button>
          </div>
      </main>
      <main v-else class="loaded-cart p-4">
          <div class="justify-content-center">
              <h3 class="text-center mb-3">My Cart</h3>
              <section v-for="n in 4" :key="n" class="cart-item mb-2 mx-md-auto mb-md-3">
                  <div class="d-inline-block">
                      <img src="https://via.placeholder.com/100" alt="cart item image">
                  </div>
                  <div class="cart-item-specs d-inline-block px-2">
                      <p class="">Item name</p>
                      <p class="">Item color</p>
                      <p class="">Item category</p>
                      <p class="mb-0">Current stock: 20</p>
                  </div>
                  <div class="cart-item-numbers d-inline-block">
                      <span class="d-block px-3">$34.00</span>
                      <p class="mb-0 cart-item-quantity-controls">
                          <span>-</span>
                          <span>3</span>
                          <span>+</span>
                      </p>
                  </div>
              </section>
              <h4 class="cart-total text-center mx-auto mt-4">Total: $136.00</h4>
              <div class="text-center mt-3">
                  <button class="btn-xl btn-success rounded m-auto">Checkout Cart</button>
              </div>
          </div>
      </main>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    *{box-sizing: border-box;}
    .empty-cart{height: 95vh; display: flex; justify-content: center; align-items: center;}
    .empty-cart > div {width: 50vw; text-align: center; text-align: end;}
    .cart-item{text-align: center; margin-bottom: 25px;}
    .cart-item > div{vertical-align: bottom;}
    .cart-item-specs p{margin-bottom: 3px;}
    .cart-item-numbers{text-align: center; font-size: 21px;}
    .cart-item-quantity-controls span{display: inline-block; padding: 0 3px;}
    .cart-item-quantity-controls span:hover{cursor: pointer;}
    .cart-item-quantity-controls span:nth-of-type(1), .cart-item-quantity-controls span:nth-of-type(3){color: green;}
    @media screen and (min-width: 768px){
        .cart-item, .cart-total{width: 80%;}
        .cart-item > div{width: 20%;}
    }
</style>