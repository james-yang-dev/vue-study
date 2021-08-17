import axios from 'axios'

const state = {
  message: 'dashboard test message'
}

// state를 가져올때 쓰는 함수
const getters = {
  getMessage(state) {
    return `${state.message}`
  }
}
const actions = {
  updateMessageAction({ state, commit }, e) {
    commit('changeMessage', e)
  }
}

const mutations = {
  changeMessage(state, newMessage) {
    state.message = newMessage
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
