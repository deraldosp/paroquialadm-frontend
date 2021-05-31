import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import MainDizimo from 'modules/dizimo/views/mainDizimo'
import Dizimistas from 'modules/dizimo/views/dizimistas'
import DizimoDashboard from 'modules/dizimo/views/dashboard'
import MainBatismo from 'modules/batismo/views/mainBatismo'
import Mainfinanceiro from 'modules/financeiro/views/mainFinanceiro'

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
      redirect: '/dizimo/dashboard',
      name: 'MAIN_DIZIMO',
      children: [
        {
          path: '/dizimo/dashboard',
          component: DizimoDashboard,
          name: 'DASHBOARD_DIZIMO'
        },
        {
          path: '/dizimo/dizimistas',
          component: Dizimistas,
          name: 'DIZIMISTAS'
        }
      ]
    },
    {
      path: '/financeiro',
      component: Mainfinanceiro,
      children: []
    },
    {
      path: '/batismo',
      component: MainBatismo,
      children: []
    }
  ]
})
