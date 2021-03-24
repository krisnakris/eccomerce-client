<template>
  <div class="container">
    <div class="row">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from '../components/login';
export default {
  components : {
    Login
  },
  created () {
    if (this.$store.state.isLogin) {
      this.$router.push('products');
    }
  }
};
</script>

<style scoped>
img {
  height: 400px;
  width: 260px;
}
</style>
