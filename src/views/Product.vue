<template>
  <div class="about">
    <h2>List of available Product</h2>
  <div class="container">
    <div class="row">
      <ProductCard  v-for="product in products" :key="product.id" :product="product" class="col-3"/>
    </div>
  </div>
  </div>
</template>

<script>
import ProductCard from '../components/card';
import { mapGetters } from 'vuex';
export default ({
  name: 'Product',
  components: {
    ProductCard
  },
  data () {
    return {
      // products: []
    };
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct');
    }
  },
  created () {
    this.fetchProduct();
  },
  computed: {
    ...mapGetters(['products'])
  }
});
</script>

<style scoped>

</style>
