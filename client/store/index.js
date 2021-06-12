import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  sidebarOpen: false,
  currentDeviceDisplay: 'desktop'
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
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
