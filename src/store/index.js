import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import axios from '../axios/axios';
import swal from 'sweetalert';

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
    },
    updateProductAfterAddCart (state, payload) {
      const product = state.products.find((findProduct) => {
        return findProduct.id === payload;
      });
      product.stock -= 1;
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
          swal('Register Success!', 'Your account have been activated successfully', 'success');
          router.push('/login');
        })
        .catch(err => {
          swal('Register failed', `${err.response.data.errors}`, 'error'); 
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
          swal('Login Success!', `Welcome to Test Shop ${customer.data.email}`, 'success');
          localStorage.setItem('access_token', customer.data.access_token);
          context.commit('isLogin', true);
          router.push('/products');
        })
        .catch(err => {
          swal('Login failed', `${err.response.data.errors}`, 'error'); 
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
      swal({
        title: 'Are you sure ?',
        text: '',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            swal('Logout', 'See you again !', 'success');
            localStorage.removeItem('access_token');
            context.commit('isLogin', false);
            router.push('/');
          } else {

          }
        });
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
          context.commit('updateProductAfterAddCart', productId);
        })
        .catch(err => {
          context.dispatch('fetchProduct');
          swal('Add to cart failed', `${err.response.data.errors}`, 'error'); 
        }); 
    },
    deleteCart (context, idOrder) {
      swal({
        title: 'Are you sure?',
        text:  'Once deleted, you will not be able to recover this cart',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method : 'DELETE',
              url : '/orders/' + idOrder,
              headers : {
                access_token : localStorage.getItem('access_token')
              }        
            })
              .then(newOrder => {
                swal('Delete Cart Success!', '', 'success');
                context.dispatch('fetchOrders');
              })
              .catch(err => {
                context.dispatch('fetchOrders');
                swal('Delete Cart failed', err.response.data.errors, 'error');
              });       
          } else {
            
          }
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
          swal('Update Cart Success!', 'Cart quantity updated', 'success');
          context.dispatch('fetchOrders');
        })
        .catch(err => {
          context.dispatch('fetchOrders');
          swal('Update Cart failed', err.response.data.errors, 'error');
        }); 
    }
  },
  getters : {
    products : state => {
      return state.products.filter(product => product.stock >= 1);
    }
  },
  modules: {
  }
});
