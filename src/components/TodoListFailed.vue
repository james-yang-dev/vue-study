<template>
  <!-- default -->
  <div v-if="seasonDone" class="box-todo type-done" @dragenter.prevent="untransferable(dragMessge1, $event)">
    <strong>{{ title }}</strong>
    <span>{{ seasonDone.title }}</span>
    
    <ul v-if="todosDone" class="todoListDetail">
      <li
        v-for="todo of todosDone"
        :id="todo.id"
        :key="todo.id"
        draggable="true"
        @dragstart.self.prevent="untransferable(dragMessge2, $event)"
        >
        <em>
          {{ todo.title }}
          <span>{{ categoryCodeChange(todo.categoryCode) }}</span>
        </em>
        {{ todo.description | maxDescription(todo.description) }}
        <span>담당자 : {{ todo.userId }}</span>
        <button @click="clickRestoreAnother(todo.id)" type="button">부활</button>
      </li>
    </ul>

    <span v-else>실패한 목록이 없습니다.</span>
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
  name: 'TodoListFailed',
  props: [],
  data() {
    return {
      title: '실패한 작업',
      dragMessge1: '이 위치로는 이동할 수 없습니다.',
      dragMessge2: '이 목록은 이동할 수 없습니다.',
      todosDone: [],
    }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      seasonDone: state => state.seasonDone,
      todosOrigin: state => state.todos,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapActions(['clickRestoreAnother']),
    ...mapMutations({}),
    // 카테고리 코드 이름으로 노출
    categoryCodeChange: function(inputCode) {
      const cateNameCheck = this.categories.filter(cate =>
          cate.categoryCode == inputCode ? cate : null
      )
      const convertCate = cateNameCheck[0].categoryName
      return convertCate
    },
    // 드래그, 드랍 불가 안내
    untransferable(msg, event) {
      return alert(msg)
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
      const todosChecked = copyTodos.filter(todo => todo.seasonId === this.seasonDone.seasonId && todo.done === false)
      this.todosDone = todosChecked
    }
  }
}
</script>

<style>
.box-todo.type-done strong {
  color: tomato;
}

.box-todo.type-done ul li.on,
.box-todo.type-done ul li:hover {
  border: 1px solid tomato;
}

.box-todo.type-done ul li button:hover {
  background: tomato;
}
</style>
