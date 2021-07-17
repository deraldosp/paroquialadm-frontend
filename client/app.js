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
import "vue-select/src/scss/vue-select.scss";

import Notifications from './plugins/notifications'

import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading, {})

import i18n from './config/I18n'
import { ValidationProvider, ValidationObserver, extend, configure, localize } from 'vee-validate/dist/vee-validate.full'
import BaseView from 'components/BaseView'
import DatePick from 'vue-date-pick'

import Luxon from 'root/plugins/Luxon'

Vue.use(Luxon)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.component('v-select', vSelect)

const components = [
  { name: 'ValidationProvider', path: ValidationProvider },
  { name: 'ValidationObserver', path: ValidationObserver },
  { name: 'v-select', path: vSelect },
  { name: 'BaseView', path: BaseView },
  { name: 'DatePick', path: DatePick }
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
