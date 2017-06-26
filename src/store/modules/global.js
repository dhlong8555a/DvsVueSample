import * as types from '../mutation-types'

const state = {
  activePrjs: []
}

const getters = {
  activePrjs: state => {
    let activePrjs = state.project.tmpPrjs.filter(prj => {
      return prj.active
    })
    return activePrjs
  }
}

const mutations = {
  [types.CHANGE_PRJS] (state, prjs) {
    state.activePrjs = prjs
  }
}

const actions = {
  updatePrjs ({commit, state}) {
    let activePrjs = state.project.tmpPrjs.filter(prj => {
      return prj.active
    })
    commit(types.CHANGE_PRJS, activePrjs)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
