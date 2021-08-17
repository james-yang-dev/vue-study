import axios from 'axios'
import CategoryApi from '@/api/category.api.js'
import SeasonApi from '@/api/season.api.js'
import TodoApi from '@/api/todo.api.js'

const state = {
  categories: [],
  seasonThis: [],
  seasonNext: [],
  seasonDone: [],
  todos: [],
  moveTodo: {}
}

const getters = {}

const actions = {
  // get api - cate
  async getCategoryList({ state, commit }, payload) {
    const getApi = await CategoryApi.getCategoryList()
    const result = Object.values(getApi)
    commit('updateCategoryList', result)
  },
  // get api - season all
  async getSeasonsList({ state, commit }, payload) {
    const getApi = await SeasonApi.getSeasonList()
    const result = Object.values(getApi)

    const filterThis = result.filter(season => season.isNow === true)
    const filterNext = result.filter(season => season.isNow === false && season.done === false)
    const filterDone = result.filter(season => season.isNow === false && season.done === true)

    commit('updateSeasonThis', filterThis[0])
    commit('updateSeasonNext', filterNext[0])
    commit('updateSeasonDone', filterDone[0])
  },
  // get api - todo all
  async getTodosList({ state, commit }, payload) {
    const getApi = await TodoApi.getTodoList()
    const result = Object.values(getApi)
    commit('updateTodosList', result)
  },
  // drag n drop
  async dragStartNEnd({ state, commit }, payload) {
    commit('updateMoveTodo', payload)
  },
  async dragFinish({ state, commit }, payload) {
    const copyTodos = _.cloneDeep(state.todos)
    const currentTodo = copyTodos.filter(todo => todo.id == state.moveTodo)
    const changeTodos = {...currentTodo[0], seasonId: payload}
    
    // TODO 다시짜기
    try {
      const result = await TodoApi.updateTodo(changeTodos)
      if(result) { // 데이터 조회 액션 호출
        const getApi = await TodoApi.getTodoList()
        const result = Object.values(getApi)
        commit('updateTodosList', result)
      }
      else{  // 데이터 업데이트 실패 안내 
        commit('updateTodosList', copyTodos)
      }
    }catch(e) {
      console.log('error', e)
      commit('updateTodosList', copyTodos)
    }
  },
  // update desc
  async updateTodoDesc({ state, commit }, payload) {
    const copyTodos = _.cloneDeep(state.todos)
    const currentTodo = copyTodos.filter(todo => todo.id == payload.todoId)
    const changeTodos = {...currentTodo[0], description: payload.newDesc}

    // TODO 다시짜기
    try {
      const result = await TodoApi.updateTodo(changeTodos)
      if(result) { // 데이터 조회 액션 호출
        const getApi = await TodoApi.getTodoList()
        const result = Object.values(getApi)
        commit('updateTodosList', result)
      }
      else{  // 데이터 업데이트 실패 안내 
        commit('updateTodosList', copyTodos)
      }
    }catch(e) {
      console.log('error', e)
      commit('updateTodosList', copyTodos)
    }
  },
  // 실패 항목 부활
  async clickRestoreAnother({ state, actions, commit }, payload) {
    const copyTodos = _.cloneDeep(state.todos)
    const restoreTodo = copyTodos.filter(todo => todo.id === payload)
    const upadteTodos = {...restoreTodo[0], seasonId: state.seasonThis.seasonId}

    // TODO 다시짜기
    try {
      const result = await TodoApi.updateTodo(upadteTodos)
      if(result) { // 데이터 조회 액션 호출
        const getApi = await TodoApi.getTodoList()
        const result = Object.values(getApi)
        commit('updateTodosList', result)
      }
      else{  // 데이터 업데이트 실패 안내 
        commit('updateTodosList', copyTodos)
      }
    }catch(e) {
      console.log('error', e)
      commit('updateTodosList', copyTodos)
    }
  },
}

const mutations = {
  updateCategoryList(state, payload) {
    state.categories = payload
  },
  updateSeasonThis(state, payload) {
    state.seasonThis = payload
  },
  updateSeasonNext(state, payload) {
    state.seasonNext = payload
  },
  updateSeasonDone(state, payload) {
    state.seasonDone = payload
  },
  updateTodosList(state, payload) {
    state.todos = payload
  },
  // moveTodo 업데이트
  updateMoveTodo(state, payload) {
    state.moveTodo = payload
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
