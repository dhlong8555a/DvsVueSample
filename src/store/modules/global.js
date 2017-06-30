import * as types from '../mutationTypes'
import {prjAPI} from '../../api/restfulAPI'

const state = {
  user: {},
  curWsp: {
    id: 1,
    name: 'EI-Workspace'
  },
  activePrjs: [],
  curActiveId: 0,
  curMessage: {
    message: '',
    type: 'success'
  }
}

const getters = {
  curActivePrj: state => {
    let activePrj = null
    activePrj = state.activePrjs.find((prj) => {
      return prj.id === state.curActiveId
    })
    return activePrj
  },
  curPage: state => {
    return state.route.name
  }
}

const mutations = {
  [types.GET_ACTIVE_PRJS] (state, prjs) {
    state.activePrjs = prjs
  },
  [types.SET_CUR_ACTIVE_PRJ] (state, id) {
    state.curActiveId = Number(id)
  },
  [types.SET_CUR_MSG] (state, msg) {
    state.curMessage = msg
  }
}

const actions = {
  updateActivePrjs ({commit, state}) {
    let activePrjs = []
    prjAPI.getActivePrjs(state.curWsp.id).then(data => {
      activePrjs = data
      commit(types.GET_ACTIVE_PRJS, activePrjs)
    }).catch(error => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
