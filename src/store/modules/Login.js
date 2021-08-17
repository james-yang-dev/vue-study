import axios from 'axios'
import UserAPI from '@/api/user.api'

const state = {
  message: 'login test message',
  userId: '',
  userPw: ''
}

// state를 가져올때 쓰는 함수
const getters = {
  getMessage(state) {
    return `${state.message}`
  },
  userId: state => state.userId,
  userPw: state => state.userPw
}
const actions = {
  updateMessageAction({ state, commit }, e) {
    commit('changeMessage', e)
  },
  updateUserIdAction({ state, commit }, e) {
    commit('changeUserId', e.target.value)
    console.log(e.target.value);
    console.log('아이디 actions 호출');
  },
  updateUserPasswordAction({ state, commit }, e) {
    commit('changeUserPassword', e.target.value)
    console.log(e.target.value);
    console.log('비밀번호 actions 호출');
  },
  async getUserList({ state, commit }, e) {
    const result = await UserAPI.getUserList()
    console.log(result)
    // commit('changeMessage', e)
  },
  async isUser({ state, commit }, e) {
    const result = await UserAPI.isUser(userId, userPassword)
    console.log(result)
  }
}

const mutations = {
  changeMessage(state, newMessage) {
    state.message = newMessage
  },
  changeUserId(state, newUserId) {
    state.userId = newUserId
    console.log('아이디 mutations 호출');
  },
  changeUserPassword(state, newUserPassword) {
    state.userPw = newUserPassword
    console.log('비밀번호 mutations 호출');
  },
  userid(state, userId) {
    state.userId = userId
  },
  userPw(state, userPw){
    state.userPw = userPw
  }


}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
