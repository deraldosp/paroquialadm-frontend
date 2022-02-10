import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const MainDizimo = () => import(/* webpackChunkName: "mainDizimo" */ 'modules/dizimo/views/mainDizimo/mainDizimo.vue') 

const Dizimistas = () => import(/* webpackChunkName: "dizimistas" */ 'modules/dizimo/views/dizimistas.vue')
const DizimoDashboard = () => import(/* webpackChunkName: "dashboard" */ 'modules/dizimo/views/dashboard/dashboard.vue')
const DizimistasEdit = () => import(/* webpackChunkName: "EditFormParoquiano" */ 'root/views/Paroquianos/EditFormParoquiano.vue')
const DizimoEntries = () => import(/* webpackChunkName: "DizimoEntries" */ 'modules/dizimo/views/DizimoEntries.vue')

const MainBatismo = () => import(/* webpackChunkName: "mainBatismo" */ 'modules/batismo/views/mainBatismo.vue')
const BatismoAgenda = () => import(/* webpackChunkName: "Agenda" */ 'modules/batismo/views/Agenda.vue')
const MainFinanceiro = () => import(/* webpackChunkName: "mainFinanceiro" */ 'modules/financeiro/views/mainFinanceiro.vue')

const MainSettings = () => import(/* webpackChunkName: "mainSettings" */ 'modules/system/views/mainSettings/MainSettings.vue')
const SystemSettings = () => import(/* webpackChunkName: "systemSettings" */ 'modules/system/views/systemSettings/systemSettings.vue')
const DbIntegrations = () => import(/* webpackChunkName: "integrations" */ 'modules/system/views/integrations')

import Login from 'views/Login.vue'

import Store from '../store'
import loginExpires from 'root/helpers/CheckJwtExpires'


Vue.use(Router)


const isAuthenticated = () => {
  return !loginExpires(localStorage.getItem('jwt'))
}

const guard = (to, from , next) => {
  if (to.name !== 'LOGIN' && !isAuthenticated()) next({ name: 'LOGIN' })
  // if the user is not authenticated, `next` is called twice
  // console.log(from)
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
      beforeEnter: guard,
      redirect: '/batismo/agenda',
      children: [
        {
          name: 'DASHBOARD_BATISMO',
          path: '/batismo/agenda',
          component: BatismoAgenda,
          beforeEnter: guard
        
        }
      ]
    },
    {
      name: 'MAIN_SETTINGS',
      path: '/sistema',
      component: MainSettings,
      beforeEnter: guard,
      redirect: '/sistema/configuracoes',
      children: [
        {
          name: 'SYSTEM_SETTINGS',
          path: '/sistema/configuracoes',
          component: SystemSettings,
          beforeEnter: guard
        },
        {
          name: 'DB_INTEGRATIONS',
          path: '/sistema/dbIntegrations',
          component: DbIntegrations,
          beforeEnter: guard
        }
      ]
    }
  ]
})
