<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!isLogin">Login </router-link> <span  v-if="!isLogin"> | </span>
      <router-link to="/register" v-if="!isLogin">Register </router-link> <span  v-if="!isLogin"> | </span>
      <router-link to="/products" >Products </router-link> <span  > | </span>
      <router-link to="/cart" v-if="isLogin">Cart </router-link> <span  v-if="isLogin"> | </span>
      <a @click.prevent="logout" v-if="isLogin"> Logout </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods : {
    checkLocalStorage () {
      if (localStorage.access_token) this.$store.commit('isLogin', true);
    }, 
    logout () {
      this.$store.dispatch('logout');
    }
  },
  created () {
    this.checkLocalStorage();
  },
  computed : {
    ...mapState(['isLogin'])
  }
};
</script>

<style>

</style>
