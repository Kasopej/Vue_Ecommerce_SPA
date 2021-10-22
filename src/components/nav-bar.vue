<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/" class="navbar-brand"><img src="assets/img/E-logo.jpg" alt="Logo" height="50px" width="80px"></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
    <ul class="navbar-nav justify-content-xs-start">
      <li class="nav-item active">
        <router-link to="/cart" class="nav-link cart-link"><i class="fas fa-shopping-cart mx-2"></i>Cart <span class="sr-only">(current)</span><div class="cart-indicator">{{totalInCart}}</div></router-link>
      </li>
      <li v-if="userIsSignedIn" class="nav-item">
        <router-link to="Profile" class="nav-link">Profile</router-link>
      </li>
      <li v-if="!userIsSignedIn" class="nav-item">
        <router-link :to="{path: $router.currentRoute.value}" class="nav-link" data-toggle="modal" data-target="#login-modal">Login</router-link>
        
      </li>
      <li v-if="!userIsSignedIn" class="nav-item">
        <router-link to="/" class="nav-link" data-toggle="modal" data-target="#signup-modal">Signup</router-link>
      </li>
    </ul>
    <form @submit="preventSubmit" class="form-inline">
        <input v-model="query" class="form-control mr-sm-2"  placeholder="Search" aria-label="Search">
        <button @click="getResults" class="btn btn-outline-dark my-2 my-sm-0">Search</button>
    </form>
  </div>
  <div class="modals">
    <!-- Login modal -->
    <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="login-modal" aria-hidden="true">
      <div class="modal-dialog">
        <div v-if="!userIsSignedIn" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="">
              <div>
                <label for="email">Email</label>
                <input type="mail" name="email" id="login-email-input" v-model="email">
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="login-password" v-model="password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="signIn(loginEntry)" type="button" class="btn btn-primary">Login</button>
          </div>
        </div>
        <div v-else class="modal-content">
          <p>Signed in!</p>
        </div>
      </div>
    </div>
    <!-- Sign up modal -->
    <div class="modal fade" id="signup-modal" tabindex="-1" aria-labelledby="signup-modal" aria-hidden="true">
      <div class="modal-dialog">
        <div v-if="!userIsSignedIn" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Signup</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="">
              <div>
                <label for="full-name">Full Name</label>
                <input v-model="fullName" type="text" name="full-name" id="full-name">
              </div>
              <div>
                <label for="email">Email</label>
                <input v-model="email" type="mail" name="email" id="signup-email-input">
              </div>
              <div>
                <label for="password">Password</label>
                <input v-model="password" type="password" name="password" id="signup-password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="signUp(signUpEntry)" type="button" class="btn btn-primary">Sign Up</button>
          </div>
        </div>
        <div v-else class="modal-content">
          Signed up!
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: 'NavBar',   
    data() {
      return {
        email: '', password: '', fullName: '', query: '',
      }
    },
    computed: {
      ...mapState(['userIsSignedIn']),
      ...mapGetters(['totalInCart']),
      loginEntry(){
        return {email: this.email, password: this.password,}
      },
      signUpEntry(){
        return {
          firstName: this.fullName.split(' ')[0], lastName: this.fullName.split(' ')[1], email: this.email, password: this.password,
        }
      }
    },
    methods: {
      ...mapActions(['signIn', 'signUp', 'queryProducts']),
      getResults(){
        this.queryProducts(this.query);
        this.$router.push({path: '/search-results'})
      },
      preventSubmit(e){
        e.preventDefault()
      }
    },
}
</script>
  
<style>
form{text-align: center;}
form > div{width: 60%; margin: auto; margin-bottom: 15px;}
form > div > label {display: block; font-size: 12px; text-align: start; margin: 0;}
form > div > input {display: block;}
.cart-link{position: relative;}
.cart-indicator{position: absolute; top: 0; left: 0; padding: 2px 4px; border-radius: 50%; border: solid 1px red; display: inline-block; font-size: 10px; color: white; background-color: red;}
</style>