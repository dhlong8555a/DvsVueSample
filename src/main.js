// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import importElement from '@/js/importElement.js'
import moment from 'vue-moment'
import store from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.use(moment)

sync(store, router)

importElement(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>'
})
