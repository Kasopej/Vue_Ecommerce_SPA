<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar";
import { mapActions } from "vuex";
export default {
  components: {NavBar},
  created() {
    this.getCartFromStorage();
    this.getUsers();
  },
  methods: {
    ...mapActions(['getCartFromStorage', 'getUsers'])
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
