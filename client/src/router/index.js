import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllAssets from '../views/AllAssets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all-assets',
    name: 'AllAssets',
    component: AllAssets
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
