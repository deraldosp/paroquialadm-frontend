import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../config/I18n'
import AuthService from 'services/auth.service'

Vue.use(Vuex)
var authData

let loginState = () => {
  if (localStorage.getItem('authData')) {
    authData = localStorage.getItem('authData')
    return true
  } else {
    return false
  }
}

let getUserData = () => {
  if (authData) {
    return JSON.parse(atob(authData)).user
  }
  return null
}

const state = {
  count: 0,
  lastRoutedPage: 'HOME',
  sidebarOpen: false,
  currentDeviceDisplay: 'desktop',
  userMenu: false,
  logged: loginState(),
  user: getUserData(),
  jwt: null,
  languages: [
    { 
      lang: 'pt_br',
      name: i18n.t('PORTUGUESE'),
      brand: '/static/assets/images/brasil.png'
    },
    { 
      lang: 'es',
      name: i18n.t('SPANISH'),
      brand: '/static/assets/images/espanha.png'
    },
    { 
      lang: 'en',
      name: i18n.t('ENGLISH'),
      brand: '/static/assets/images/estados-unidos.png'
    }
  ]
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SIDEBAR_TOGGLE (state) {
    state.sidebarOpen = !state.sidebarOpen
  },
  SET_DEVICE_DISPLAY (state, payload) {
    let currentDeviceDisplay = window
      .getComputedStyle(document.querySelector('body'), ':before')
      .getPropertyValue('content')
      .replace(/"/g, '')
      console.log(currentDeviceDisplay)
      state.currentDeviceDisplay = currentDeviceDisplay
  },
  TOGGLE_USER_MENU (state, payload) {
    if (payload) {
      state.userMenu = payload
    } else {
      state.userMenu = !state.userMenu
    }
  },

  CLOSE_USER_MENU (state) {
    state.userMenu = false
  },

  LOGIN (state, payload) {

    let authData = btoa(JSON.stringify(payload))
    localStorage.setItem('authData', authData)
    
    localStorage.setItem('jwt', payload.access_token)
    state.jwt = payload.access_token
    state.logged = true
    state.user = payload.user
  },

  LOGOUT (state) {
    state.logged = false
    localStorage.removeItem('authData')
    localStorage.removeItem('jwt')
  },

  SET_LAST_ROUTED_PAGE (state, payload) {
    state.lastRoutedPage = payload
  }

}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  },

  login({ commit }, payload) {
    commit('LOGIN', payload)
  },

  logout({ commit }) {
    commit('LOGOUT')
  },

  refreshToken({ commit }, token) {
    AuthService.refresh(token).then(res => {
      if (res.status == 200) {
        commit('LOGIN', res.data)
      }
    })
  },

  setLastPage({ commit }, payload) {
    commit('SET_LAST_ROUTED_PAGE', payload)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
