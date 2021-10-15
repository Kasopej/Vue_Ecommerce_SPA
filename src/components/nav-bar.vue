<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/" class="navbar-brand"><img src="assets/img/E-logo.jpg" alt="Logo" height="50px" width="80px"></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
    <ul class="navbar-nav justify-content-xs-start">
      <li class="nav-item active">
        <router-link to="/cart" class="nav-link"><i class="fas fa-shopping-cart mx-2"></i>Cart <span class="sr-only">(current)</span></router-link>
      </li>
      <li v-if="false" class="nav-item">
        <router-link to="Profile" class="nav-link">Profile</router-link>
      </li>
      <li v-if="true" class="nav-item">
        <router-link to="/" class="nav-link" data-toggle="modal" data-target="#login-modal">Login</router-link>
        
      </li>
      <li v-if="true" class="nav-item">
        <router-link to="/" class="nav-link" data-toggle="modal" data-target="#signup-modal">Signup</router-link>
      </li>
    </ul>
    <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
  <div class="modals">
    <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="login-modal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
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
                <input type="mail" name="email" id="login-email-input">
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="login-password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="signup-modal" tabindex="-1" aria-labelledby="signup-modal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
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
                <input type="text" name="full-name" id="full-name">
              </div>
              <div>
                <label for="email">Email</label>
                <input type="mail" name="email" id="signup-email-input">
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="signup-password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'NavBar',

}
</script>

<style>
form{text-align: center;}
form > div{width: 60%; margin: auto; margin-bottom: 15px;}
form > div > label {display: block; font-size: 12px; text-align: start; margin: 0;}
form > div > input {display: block;}
</style>