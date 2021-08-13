import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import MainDizimo from 'modules/dizimo/views/mainDizimo'
import Dizimistas from 'modules/dizimo/views/dizimistas'
import DizimoDashboard from 'modules/dizimo/views/dashboard'
import DizimistasEdit from 'root/views/Paroquianos/EditFormParoquiano'
import DizimoEntries from 'modules/dizimo/views/DizimoEntries'

import MainBatismo from 'modules/batismo/views/mainBatismo'
import BatismoAgenda from 'modules/batismo/views/Agenda'
import MainFinanceiro from 'modules/financeiro/views/mainFinanceiro'
import Login from 'views/Login'
import Store from '../store'
import loginExpires from 'root/helpers/CheckJwtExpires'

Vue.use(Router)


const isAuthenticated = () => {
  return !loginExpires(localStorage.getItem('jwt'))
}

const guard = (to, from , next) => {
  if (to.name !== 'LOGIN' && !isAuthenticated()) next({ name: 'LOGIN' })
  // if the user is not authenticated, `next` is called twice
  console.log(from)
  Store.dispatch('setLastPage', from.name)
  next()
}



export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'HOME',
      path: '/',
      component: Home,
      beforeEnter: guard
    
    },
    {
      name: 'LOGIN',
      path: '/login',
      component: Login,
      name: 'LOGIN',
    },
    {
      path: '/dizimo',
      component: MainDizimo,
      redirect: '/dizimo/dashboard',
      name: 'MAIN_DIZIMO',
      beforeEnter: guard
    ,
      children: [
        {
          path: '/dizimo/dashboard',
          component: DizimoDashboard,
          name: 'DASHBOARD_DIZIMO',
          beforeEnter: guard
        
        },
        {
          path: '/dizimo/dizimistas',
          component: Dizimistas,
          name: 'DIZIMISTAS',
          beforeEnter: guard
        },
        {
          path: '/dizimo/dizimistas/new',
          component: DizimistasEdit,
          name: 'DIZIMISTAS_NEW',
          beforeEnter: guard
        },
        {
          path: '/dizimo/dizimistas/:id',
          component: DizimistasEdit,
          name: 'DIZIMISTAS_EDIT',
          props: true,
          beforeEnter: guard
        },
        {
          path: '/dizimo/entries/:date/:time',
          component: DizimoEntries,
          name: 'DIZIMO_ENTRIES',
          props: true,
          beforeEnter: guard
        }
      ]
    },
    {
      name: 'MAIN_FINANCEIRO',
      path: '/financeiro',
      component: MainFinanceiro,
      children: [],
      beforeEnter: guard
    
    },
    {
      name: 'MAIN_BATISMO',
      path: '/batismo',
      component: MainBatismo,
      children: [],
      beforeEnter: guard,
      redirect: '/batismo/agenda',
      children: [
        {
          name: 'DASHBOARD_BATISMO',
          path: '/batismo/agenda',
          component: BatismoAgenda,
          name: 'DASHBOARD_BATISMO',
          beforeEnter: guard
        
        }
      ]
    }
  ]
})
