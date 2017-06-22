import * as types from '../mutation-types'

const state = {
  tmpPrjs: []
}

const getters = {
  allPrjs: state => { return state.tmpPrjs }
}

const mutations = {
  [types.ADD_PRJ] (state, prj) {
    state.tmpPrjs.push(prj)
  },
  [types.UPDATE_PRJ] (state, prj) {
    state.tmpPrjs.find(curPrj => {
      if (curPrj.index === prj.index) {
        curPrj.name = prj.name
        curPrj.desc = prj.desc
        curPrj.active = prj.active
        return true
      }
    })
  },
  [types.DELETE_PRJ] (state, prj) {
    state.tmpPrjs.splice(prj)
  }
}

const actions = {
  addPrj ({commit}, prj) {
    commit(types.ADD_PRJ, prj)
  },
  updatePrj ({commit}, prj) {
    commit(types.UPDATE_PRJ, prj)
  },
  deletePrj ({commit}, prj) {
    commit(types.DELETE_PRJ, prj)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
