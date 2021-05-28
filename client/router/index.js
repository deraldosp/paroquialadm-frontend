import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import MainDizimo from 'modules/dizimo/views/mainDizimo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/dizimo',
      component: MainDizimo,
      children: []
    }
  ]
})
