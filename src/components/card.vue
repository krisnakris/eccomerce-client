<template>
  <div v-if="product.stock">
    <b-card
    :title="product.name"
    :img-src="product.image_url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    >
    <b-card-text>
    <p> Price : {{product.price}} </p>
    <p> Stock  :  {{product.stock}} </p>
    <p> Category :  {{product.category}} </p>
       
    </b-card-text>
    <b-button href="#" variant="primary" @click.prevent="addToCart(product.id)">         
    <b-icon icon="cart-check" @click="addToCart(product.id)"> </b-icon>  <span> Add to cart </span>
    </b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data () {
    return {

    };
  },
  methods: {
    loadProduct () {
    },
    addToCart (id) {
      this.$store.dispatch('addToCart', id);
    }
  },
  created () {

  }
};
</script>

<style scoped>
.card-img-top {
  height: 206px;
}
a.btn.btn-primary {
  margin-right:15px;
}

</style>
