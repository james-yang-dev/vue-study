import axios from 'axios'
import CategoryAPI from '@/api/category.api'

const state = {
  categories: [
    // {
    //   categoryCode: '01',
    //   categoryName: 'JS'
    // }
  ],
  inputTitle: '',
  inputDescription: '',
  inputCategory: ''
}

// getter - state를 가져온다
const getters = {}

// actions - mutation 으로 commit 한다
const actions = {
  updateTitle({ state, commit }, e) {
    const inputValue = e.target.value
    commit('createTitle', inputValue)
  },
  async getCategories({ state, commit }) {
    // api 호출
    // import 한 UserAPI의 특정 함수를 호출한다. 필요시 파라미터를 전달한다.
    const categoryList = await CategoryAPI.getCategoryList('userId')
    // 그리고 필요한 commit을 수행하여 변화를 일으키고 동작을 마무리 짓는다.
    commit('setCategoryList', categoryList)
  },
  updateDescription({ state, commit }, e) {
    const inputValue = e.target.value
    commit('createDescription', inputValue)
  },
  updateCategory({ state, commit }, e) {
    const selectedValue = e.target.value
    console.log(selectedValue)
    commit('createCategory', selectedValue)
  },
  dataUpdate({ state, commit }) {
    console.log('버튼 눌림')
  }
}

// mutations - state에 접근한다
const mutations = {
  changeMessage(state, newMessage) {
    state.message = newMessage
  },
  setCategoryList(state, categoryList) {
    state.categories = categoryList
  },
  createTitle(state, newTitle) {
    state.inputTitle = newTitle
    console.log(`타이틀, ${state.inputTitle}`)
  },
  createDescription(state, newDescription) {
    state.inputDescription = newDescription
    console.log(`텍스트영역, ${state.inputDescription}`)
  },
  createCategory(state, newCategory) {
    state.inputCategory = newCategory
    console.log(`선택된 종목, ${state.inputCategory}`)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
