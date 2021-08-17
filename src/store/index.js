import Vue from 'vue'
import Vuex from 'vuex'

import parser from '@/store/modules/parser'
import TodoList from '@/store/modules/TodoList'
import Todo from '@/store/modules/Todo'
import Login from '@/store/modules/Login'
import Dashboard from '@/store/modules/Dashboard'
import User from '@/store/modules/User'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(Vuex, lodash, VueLodash)

export default new Vuex.Store({
  modules: {
    parser,
    Login,
    Todo,
    TodoList,
    Dashboard,
    User
  },
  strict: process.env.NODE_ENV !== 'production'
})
