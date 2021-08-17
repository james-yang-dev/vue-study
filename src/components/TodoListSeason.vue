<template>
  <!-- default -->
  <div 
    v-if="seasonThis" 
    class="box-todo type-this" 
    @dragover.prevent
    @drop="dragFinish(seasonThis.seasonId)">
    <div>
      <strong>현재 시즌 : {{ seasonThis.title }}</strong>
      <span>작업 기간 : {{ changeDateFormat(seasonThis.seasonFrom, seasonThis.seasonTo) }}</span>
    </div>

    <ul v-if="todosThis" class="todoListDetail">
      <li
        v-for="todo of todosThis"
        :id="todo.id"
        :key="todo.id"
        :class="[todo.id === moveTodo ? 'draging' : '']"
        @dragstart="dragStartNEnd(todo.id)"
        @dragend="dragStartNEnd('')"
        draggable="true"
      >
        <em>
          {{ todo.title }}
          <span>{{ categoryCodeChange(todo.categoryCode) }}</span>
        </em>
        <input
          v-show="todo.id === onInputTodoId"
          type="text"
          @input="todo.description = $event.target.value"
          :value="todo.description"
        />
        <p v-show="todo.id !== onInputTodoId">
          {{ todo.description | maxDescription(todo.description) }}
        </p>
        <span>담당자 : {{ todo.userId }}</span>

        <button 
          type="button"
          @click="todo.id === onInputTodoId ? clickSaveDesc(todo.id, $event) : clickChangeDesc(todo.id, $event)">
          {{ todo.id === onInputTodoId ? '저장' : '작성' }}
        </button>
      </li>
    </ul>
  </div>
  <!--// default -->

  <!-- no data -->
  <div v-else>
    <NoData></NoData>
  </div>
  <!--// no data -->
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoData from '@/components/NoData.vue'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('TodoList')

export default {
  name: 'TodoListSeason',
  data() {
    return {
      todosThis: [],
      onInputTodoId: '',
    }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      seasonThis: state => state.seasonThis,
      todosOrigin: state => state.todos,
      moveTodo: state => state.moveTodo,
    }),
    ...mapGetters({})
  },
  methods: {
    ...mapActions(['dragStartNEnd', 'dragFinish', 'updateTodoDesc']),
    ...mapMutations({}),
    // 날짜 포맷 변환
    changeDateFormat: function(inputValue1, inputValue2) {
      const inputValue = `${inputValue1 + inputValue2}`
      const convertValue = inputValue.replace(
        /(\d{4})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/g,
        '$1.$2.$3 - $4.$5.$6'
      )
      return convertValue
    },
    // 카테고리 코드 이름으로 노출
    categoryCodeChange: function(inputCode) {
      const cateNameCheck = this.categories.filter(cate =>
        cate.categoryCode == inputCode ? cate : null
      )
      const convertCate = cateNameCheck[0].categoryName
      return convertCate
    },
    // 디스크립션 수정
    clickChangeDesc: function(todoId, evnet) {
      this.onInputTodoId = todoId
    },
    // 디스크립션 저장
    clickSaveDesc: function(todoId, event) {
      const updateTodo = this.todosThis.find(todo => todo.id == todoId)

      const payload = {
        todoId: todoId,
        newDesc: updateTodo.description
      }
      this.updateTodoDesc(payload)
      this.onInputTodoId = ''
    },
  },
  filters: {
    maxDescription: function(desc) {
      const maxLength = 30;
      if(desc.length < maxLength) {
        return desc;
      }
      return desc.substring(0, maxLength) + '...';
    }
  },
  watch: {
    todosOrigin: function(todos) {
      const copyTodos = _.cloneDeep(todos)
      const todosChecked = copyTodos.filter(todo => todo.seasonId === this.seasonThis.seasonId)
      this.todosThis = todosChecked
    }
  }
}
</script>

<style>
.box-todo.type-this strong {
  color: #42b983;
}
</style>
