import * as types from '../mutation-types'

const state = {
  prjKeyInfos: []
}

const getters = {
  prjKeyInfos: state => { return state.prjKeyInfos }
}

const mutations = {
  [types.CHANGE_PRJS] (state, prjs) {
    state.prjKeyInfos = prjs
  }
}

const actions = {
  updatePrjs ({commit, getters}) {
    commit(types.CHANGE_PRJS)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
