<template>
  <!-- default -->
  <div
    v-if="seasonNext"
    class="box-todo type-next"
    @dragover.prevent
    @drop="dragFinish(seasonNext.seasonId)">
    <strong>다음 시즌 : {{ seasonNext.title }}</strong>
    <span>작업 기간 : {{ changeDateFormat(seasonNext.seasonFrom, seasonNext.seasonTo) }}</span>

    <ul class="todoListDetail">
      <li
        v-for="todo of todosNext"
        :id="todo.id"
        :key="todo.id"
        :class="[todo.id === moveTodo ? 'draging' : '']"
        @dragstart="dragStartNEnd(todo.id)"
        @dragend="dragStartNEnd('')"
        draggable="true">
        <em>
          {{ todo.title }}
          <span>{{ categoryCodeChange(todo.categoryCode) }}</span>
        </em>
        {{ todo.description | maxDescription(todo.description) }}
        <span>담당자 : {{ todo.userId }}</span>
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
  name: 'TodoListNext',
  data() {
      return {
        todosNext: []
      }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      seasonNext: state => state.seasonNext,
      todosOrigin: state => state.todos,
      moveTodo: state => state.moveTodo,
    }),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions(['dragStartNEnd', 'dragFinish']),
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
      const todosChecked = copyTodos.filter(todo => todo.seasonId === this.seasonNext.seasonId)
      this.todosNext = todosChecked
    }
  }
}
</script>

<style>
</style>
