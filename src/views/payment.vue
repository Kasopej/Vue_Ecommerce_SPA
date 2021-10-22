<template>
  <main class="container-fluid pt-4">
      <div class="card-deck">
          <div class="card">
              <div class="card-body">
                  <h4 class="card-title">Pay with Debit Card</h4>
                  <p class="card-subtitle mb-3">Safe & secure</p>
                  <button @click="checkoutFn" class="btn btn-success">Pay now</button>
              </div>
          </div>
          <div class="card">
              <div class="card-body">
                  <h4 class="card-title">Pay with Debit Card</h4>
                  <p class="card-subtitle mb-3">Safe & secure</p>
                  <button @click="checkoutFn" class="btn btn-success">Pay now</button>
              </div>
          </div>
          <div class="card">
              <div class="card-body">
                  <h4 class="card-title">Pay with Debit Card</h4>
                  <p class="card-subtitle mb-3">Safe & secure</p>
                  <button @click="checkoutFn" class="btn btn-success">Pay now</button>
              </div>
          </div>
      </div>
      <div v-if="paymentSuccessMsg" class="payment-successful-msg">
          <button @click="closePaymentSuccessMsg" class="btn btn-danger btn-sm">X</button>
          <p>{{paymentSuccessMsg}}</p>
      </div>
      <div v-if="paymentSuccessMsg" class="overlay"></div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            paymentSuccessMsg: '',
        }
    },
    methods: {
        ...mapActions(['checkout']),
        checkoutFn(){
            this.paymentSuccessMsg = 'Payment Successful';
            this.checkout();
        },
        closePaymentSuccessMsg(){
            this.$router.push({path: '/'})
        }
    },
}
</script>

<style>
    .payment-successful-msg{position: fixed; top: 20vw; left: 30vw; width: 40vw; text-align: center; vertical-align: middle; padding: 25px; border: solid 1px grey; background-color: white; z-index: 10;}
    .payment-successful-msg button{float: right;}
    .payment-successful-msg > p {clear: both;}
    .overlay{position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 2; background-color: rgba(0, 0, 0, 0.6);}
</style>