<template>
  <tr>
    <td> {{cart.Product.name}} </td>
    <td> <img :src="cart.Product.image_url"> </td>  
    <td> 
      <div class="col-xs-2"> 
        <b-icon icon="patch-minus" style="margin-right:20px;" @click="minusQuantity"> </b-icon>
        <input type="number" class="form-control" min="0" v-model="cart.quantity"> 
        <b-icon icon="plus-circle" style="margin-left:20px" @click="plusQuantity"> </b-icon>
      </div>
    </td>
    <td> {{cart.Product.stock}}</td>
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
    },
    plusQuantity () {
      this.cart.quantity += 1;
    },
    minusQuantity () {
      if (this.cart.quantity > 0) {
        this.cart.quantity -= 1;
      }
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
input {
  width:25%;
  display: table-row;
}
</style>
