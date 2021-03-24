<template>
  <div>
    <h2> List of Cart </h2>
    <div class="container">
    <table class="table" style="margin-top:40px">
      <thead>
        <tr>
          <th scope="col"> Product Name </th>
          <th scope="col"> Image </th>
          <th scope="col"> Quantity </th>
          <th scope="col"> Price </th>
          <th scope="col"> Option </th>
        </tr>
      </thead>
      <tbody>
        <CartList v-for="cart in carts" :key="cart.id" :cart="cart"/>
      </tbody>
    </table>    
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CartList from '../components/cartList';
export default {
  components : {
    CartList
  },
  methods : {
    fetchOrders () {
      this.$store.dispatch('fetchOrders');
    }
  },
  created () {
    this.fetchOrders();
  },
  computed : {
    ...mapState(['carts'])
  }
};
</script>

<style>

</style>
