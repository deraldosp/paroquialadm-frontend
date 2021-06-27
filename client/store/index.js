import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let loginState = () => {
  if (localStorage.getItem('jwt')) {
    return true
  } else {
    return false
  }
}

const state = {
  count: 0,
  sidebarOpen: false,
  currentDeviceDisplay: 'desktop',
  userMenu: false,
  logged: loginState(),
  user: null
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
    state.logged = true
    state.user = payload
  },

  LOGOUT (state) {
    state.logged = false
    localStorage.removeItem('jwt')
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
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
