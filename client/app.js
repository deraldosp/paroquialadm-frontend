import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

import 'jquery/src/jquery.js'
window.$ = require('jquery')

import 'bootstrap/dist/js/bootstrap.min.js'
import { BootstrapVue, IconsPlugin, LayoutPlugin } from 'bootstrap-vue'
import '../static/assets/scss/main.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Notifications from './plugins/notifications'

import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading, {})

import i18n from './config/I18n'
import { ValidationProvider, ValidationObserver, extend, configure, localize } from 'vee-validate/dist/vee-validate.full'
import Luxon from 'root/config/Luxon'

Vue.use(Luxon)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.component('v-select', vSelect)

const components = [
  { name: 'ValidationProvider', path: ValidationProvider },
  { name: 'ValidationObserver', path: ValidationObserver },
  { name: 'v-select', path: vSelect }
]

components.map(({ name, path }) => {
  Vue.component(name, path)
})


sync(store, router)

const app = new Vue({
  i18n,
  router,
  store,
  ...App
})

export { app, router, store }
