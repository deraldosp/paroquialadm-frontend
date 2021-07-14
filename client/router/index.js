import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import MainDizimo from 'modules/dizimo/views/mainDizimo'
import Dizimistas from 'modules/dizimo/views/dizimistas'
import DizimoDashboard from 'modules/dizimo/views/dashboard'
import MainBatismo from 'modules/batismo/views/mainBatismo'
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
  next()
}



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: guard
    
    },
    {
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
        
        }
      ]
    },
    {
      path: '/financeiro',
      component: MainFinanceiro,
      children: [],
      beforeEnter: guard
    
    },
    {
      path: '/batismo',
      component: MainBatismo,
      children: [],
      beforeEnter: guard
    
    }
  ]
})
