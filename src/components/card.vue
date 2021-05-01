/* eslint-disable */

<template>
  <div>
    <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        <p>Price : {{ product.price }}</p>
        <p>Stock : {{ product.stock }}</p>
        <p>Category : {{ product.category }}</p>
      </b-card-text>
      <div v-b-hover="handleHoverCart">
        <b-icon
          v-if="!isCartHovered"
          icon="cart-check"
          @click="addToCart(product.id)"
        >
        </b-icon>
        <b-icon
          v-if="isCartHovered"
          icon="cart-check-fill"
          @click="addToCart(product.id)"
        >
        </b-icon>
        <span @click="addToCart(product.id)"> Add to cart </span> <br />
        <br />
      </div>
      <!-- <div v-b-hover="handleWishlist">
        <b-icon
          icon="heart"
          v-if="!isWishlistHovered"
          @click="addToWishlist(product.id)"
        >
        </b-icon>
        <b-icon
          icon="heart-fill"
          v-if="isWishlistHovered"
          @click="addToWishlist(product.id)"
        >
        </b-icon>
        <span @click="addToWishlist(product.id)"> Wishlist </span>
      </div> -->
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data () {
    return {
      isCartHovered: false,
      isWishlistHovered: false
    };
  },
  methods: {
    loadProduct () {},
    addToCart (id) {
      this.$store.dispatch('addToCart', id);
    },
    handleHoverCart (hovered) {
      this.isCartHovered = hovered;
    },
    handleWishlist (hovered) {
      this.isWishlistHovered = hovered;
    },
    addToWishlist (id) {
      console.log(id);
    }
  },
  created () {}
};
</script>

<style scoped>
.card-img-top {
  height: 206px;
}
a.btn.btn-primary {
  margin-right: 15px;
}
</style>
