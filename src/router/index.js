import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'

const base = '/-vue-w2'

let history = createWebHistory()
let routes = [
  {
    path: `${base}/`,
    name: 'Home',
    component: Home
  },
  {
    path: `${base}/products`,
    name: 'Products',
    component: Products
  }
]


export default createRouter({ history, routes })