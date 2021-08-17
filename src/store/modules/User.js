import UserAPI from '@/api/user.api'
import SeasonAPI from '@/api/season.api'
import TodoAPI from '@/api/todo.api'
import CategoryAPI from '@/api/category.api'

const state = {
  message: 'login test message'
}

// state를 가져올때 쓰는 함수
const getters = {
  getMessage(state) {
    return `${state.message}`
  }
}

const actions = {
  async getUserList({ state, commit }, e) {
    const result = await UserAPI.getUserList()
    console.log(result)
    // commit('changeMessage', e)
  },
  async checkUserInfo({ state, commit }, e) {
    const result = await UserAPI.getUserInfo('userId')
    console.log(result)
    // commit('changeMessage', e)
  },
  async isUser({ state, commit }, e) {
    const result = await UserAPI.isUser(id, password)
    console.log(result)
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
