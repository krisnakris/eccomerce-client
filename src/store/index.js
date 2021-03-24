import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import axios from '../axios/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin : false,
    products : [],
    carts : []
  },
  mutations: {
    isLogin (state, loginStatus) {
      state.isLogin = loginStatus;
    },
    getAllProducts (state, payload) {
      state.products = payload;
    },
    getAllOrders (state, payload) {
      state.carts = payload;
    }
  },
  actions: {
    submitRegister (context, formRegister) {
      const { email, password } = formRegister;
      axios({
        method : 'POST',
        url : '/register',
        data : {
          email, password
        }
      })
        .then(newCustomer => {
          router.push('/login');
        })
        .catch(err => {
          console.log(err.response.data.errors);
        });
    },
    submitLogin (context, formLogin) {
      const { email, password } = formLogin;
      axios({
        method : 'POST',
        url : '/login',
        data : {
          email, password
        }
      })
        .then(customer => {
          localStorage.setItem('access_token', customer.data.access_token);
          context.commit('isLogin', true);
          router.push('/products');
        })
        .catch(err => {
          console.log(err.response.data.errors);
        });
    },
    fetchProduct (context) {
      axios.get('/products', {
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(products => {
          context.commit('getAllProducts', products.data);
        })
        .catch(err => {
          console.log(err.response.data.errors);
        });
    },
    fetchOrders (context) {
      axios.get('/orders', {
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(orders => {
          context.commit('getAllOrders', orders.data);
        })
        .catch(err => {
          console.log(err.response.data.errors);
        });
    },
    logout (context) {
      localStorage.removeItem('access_token');
      context.commit('isLogin', false);
      router.push('/login');
    },
    addToCart (context, productId) {
      axios({
        method : 'POST',
        url : '/orders/' + productId,
        headers : {
          access_token : localStorage.getItem('access_token')
        }        
      })
        .then(newOrder => {
          context.dispatch('fetchProduct');
        })
        .catch(err => {
          console.log(err.response.data.errors);
        }); 
    },
    deleteCart (context, idOrder) {
      axios({
        method : 'DELETE',
        url : '/orders/' + idOrder,
        headers : {
          access_token : localStorage.getItem('access_token')
        }        
      })
        .then(newOrder => {
          context.dispatch('fetchOrders');
        })
        .catch(err => {
          console.log(err.response.data.errors);
        });       
    },
    updateCart (context, payload) {
      const { id, quantity } = payload;
      axios({
        method : 'PATCH',
        url : '/orders/' + id,
        headers : {
          access_token : localStorage.getItem('access_token')
        },
        data : {
          quantity
        }  
      })
        .then(data => {
          context.dispatch('fetchOrders');
        })
        .catch(err => {
          context.dispatch('fetchOrders');
          console.log(err.response.data.errors);
        }); 
    }
  },
  modules: {
  }
});
