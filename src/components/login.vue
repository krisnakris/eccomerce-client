<template>
  <div class="container col-4">
    <b-form @submit.prevent="submitLogin" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
      <b-form-input
        id="input-1"     
        type="email"
        placeholder="Enter email" v-model="formLogin.email"
        required
      ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
      <b-form-input
        id="input-2"
        type="password"
        placeholder="Enter Password" v-model="formLogin.password"
        required
      ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" style="margin-right:50px">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data : function () {
    return {
      formLogin : {
        email : '',
        password : ''
      }
    };
  },
  methods : { 
    onReset (event) {
      event.preventDefault();
      this.form.email = '';
      this.form.password = '';
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    submitLogin () {
      this.$store.dispatch('submitLogin', this.formLogin);
    }
  }
};
</script>

<style>

</style>
