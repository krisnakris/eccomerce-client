<template>
  <tr>
    <td> {{cart.Product.name}} </td>
    <td> <img :src="cart.Product.image_url"> </td>  
    <td> <input type="number" class="form-control" min="0" v-model="cart.quantity" style="width:36%"> </td>
    <td> {{cart.Product.price}}</td>
    <td> 
      <b-icon icon="pencil-square" style="padding-right:40px;" @click="updateQuantity(cart.id, cart.quantity)"> </b-icon> 
      <b-icon icon="trash" @click="deleteCart(cart.id)"> </b-icon>
    </td>
  </tr>
   
</template>

<script>
export default {
  name: 'CartList',
  props: ['cart'],
  data () {
    return {

    };
  },
  methods: {
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id);
    },
    updateQuantity (id, quantity) {
      this.$store.dispatch('updateCart', { id, quantity });
    }
  },
  created () {

  }
};
</script>

<style scoped>
td {
  text-align: center;
  vertical-align: middle;
}
img {
  height: 200px;
  width: 200px;
}
</style>
