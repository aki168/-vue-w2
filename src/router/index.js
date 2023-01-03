import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'

let history = createWebHistory()
let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  }
]


export default createRouter({ history, routes })