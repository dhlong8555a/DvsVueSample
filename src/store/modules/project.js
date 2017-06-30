import * as types from '../mutationTypes'
import {prjAPI} from '../../api/restfulAPI'

const state = {
  curPrjs: [],
  prjTotalSize: 0
}

const getters = {
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
  }
}

const mutations = {
  [types.GET_PRJS] (state, {curPrjs, totalSize}) {
    state.curPrjs = curPrjs
    state.projectTotalSize = totalSize
  }
}

const actions = {
  getPrjs ({commit, state, rootState}, {startIndex, count}) {
    prjAPI.listPrj(rootState.curWsp.id, startIndex, count).then(data => {
      let curPrjs = data.data
      let totalSize = data.totalCount
      commit(types.GET_PRJS, {curPrjs, totalSize})
    }).catch(error => {
      console.log(error)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
