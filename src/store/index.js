import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import project from './modules/project'
import createLogger from '../../node_modules/vuex/src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: global.state,
  getters: global.getters,
  mutations: global.mutations,
  actions: global.actions,
  modules: {
    project
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
