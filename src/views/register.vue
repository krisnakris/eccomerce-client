<template>
  <div>
      <register/>
  </div>
</template>

<script>
import Register from '../components/register.vue';
export default {
  components : {
    Register
  },
  created () {
    if (this.$store.state.isLogin) {
      this.$router.push('products');
    }
  }
};
</script>

<style>

</style>
