<template>
  <!-- default -->
	<div v-if="apiLoaded" class="todo-list">
		<span>welcome todo list</span>
		<div class="inner-todo">
			<div>
				<TodoListSeason></TodoListSeason>
			</div>
			<div>
				<TodoListNext></TodoListNext>
			</div>
			<div>
				<TodoListFailed></TodoListFailed>
			</div>
		</div>
	</div>
  <!--// default -->

  <!-- no data -->
  <div v-else>
    loading...
  </div>
  <!--// no data -->
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoData from '@/components/NoData.vue'
import TodoListSeason from '@/components/TodoListSeason.vue'
import TodoListNext from '@/components/TodoListNext.vue'
import TodoListFailed from '@/components/TodoListFailed.vue'

const {
	mapState,
	mapGetters,
	mapActions,
	mapMutations
} = createNamespacedHelpers('TodoList')

export default {
	name: 'TodoListPage',
	data() {
		return {
      apiLoaded: false
    }
	},
	components: {
		TodoListSeason,
		TodoListNext,
		TodoListFailed,
  },
  mounted() {
    this.getCategoryList()
    this.getSeasonsList()
    this.getTodosList()
    this.apiLoaded = true
  },
	computed: {},
	methods: {
    ...mapActions(['getCategoryList', 'getSeasonsList', 'getTodosList'])
  },
}
</script>

<style>
.todo-list * {
	margin: 0;
	padding: 0;
	color: #2c3e50
}

.inner-todo {
	display: flex;
	justify-content: center;
	min-width: 900px
}

.inner-todo>div {
	flex: 1 1 0;
	margin: 15px;
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 5px
}

.draging {
	transform: translate(-5px, -5px);
	opacity: .5;
	box-shadow: 5px 5px 2px 1px rgba(0, 0, 0, .1);
}

.box-todo {
  height: 100%;
}

.box-todo div:first-child {
  min-height: 46px;
}

.box-todo strong {
  display: block;
  text-align: left;
  font-size: 20px;
}

.box-todo span {
	display: block;
	margin-top: 10px;
  text-align: left;
  font-size: 12px;
  font-style: normal;
  color: #999;
}

.box-todo ul {
  margin: 40px 0 0;
  padding: 0;
}

.box-todo ul li {
  display: block;
  position: relative;
  overflow: hidden;
  min-height: 30px;
  margin: 10px 0 0;
  padding: 6px 10px 46px;
  text-align: left;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background: #fff;
  text-decoration: none;
  list-style: none;
}

.box-todo li em {
  overflow: hidden;
  display: block;
	margin-bottom:10px;
	padding-right:70px;
  font-weight: bold;
  font-style: normal;
}

.box-todo li input {
  display: block;
  width: 100%;
  font-size: 16px;
  font-family:Avenir, Helvetica, Arial, sans-serif;
  border: 0 none;
  border-bottom:1px solid #dddddd;
}

.box-todo li em span {
  display: inline-block;
  padding: 1px 4px;
  font-size: 11px;
  font-weight: normal;
  border-radius: 3px;
  background: #42b983;
  color: #fff;
}

.box-todo ul li.on,
.box-todo ul li:hover {
  cursor: pointer;
  border: 1px solid #42b983;
}

.box-todo ul li.on button,
.box-todo ul li:hover button {
  display: block;
}

.box-todo li button {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  width: 60px;
  height: 30px;
  font-weight: bold;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background: #fff;
  color: #999;
}

.box-todo ul li button:hover {
  background: #42b983;
  color: #fff;
}

.box-todo ul li>span {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  min-height: 30px;
  padding: 0 10px;
  font-size: 12px;
  line-height: 20px;
  color: #999;
}
</style>
