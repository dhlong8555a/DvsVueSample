import * as types from '../mutation-types'

const state = {
  tmpPrjs: [],
  curPrjs: []
}

const getters = {
  prjTotalSize: state => { return state.tmpPrjs.length },
  allPrjActive: state => {
    let allActive = true
    if (state.curPrjs.length > 0) {
      for (let prj of state.curPrjs) {
        if (prj.active === false) {
          allActive = false
          break
        }
      }
    } else allActive = false
    return allActive
  },
  curPrjs: state => { return state.curPrjs }
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
    let index = state.tmpPrjs.findIndex(curPrj => {
      return curPrj.index === prj.index
    })
    console.log('index:' + index)
    if (index >= 0) state.tmpPrjs.splice(index, 1)
  },
  [types.GET_PRJS] (state, prjs) {
    state.curPrjs = prjs
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
  },
  getPrjs ({commit, state}, params) {
    let curPrjs = state.tmpPrjs.slice(params.startIndex, params.endIndex)
    console.log(curPrjs.length)
    commit(types.GET_PRJS, curPrjs)
  },
  curPjrsActiveToggle ({commit, state}, actived) {
    for (let prj of state.curPrjs) {
      if (prj.active !== actived) {
        let chgPrj = {
          active: actived,
          name: prj.name,
          desc: prj.desc,
          lastUpdated: prj.lastUpdated,
          pipelineNum: prj.pipelineNum,
          index: prj.index
        }
        commit(types.UPDATE_PRJ, chgPrj)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
