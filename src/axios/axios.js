import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://e-commerce-cms-kris.herokuapp.com'
});

export default instance;
