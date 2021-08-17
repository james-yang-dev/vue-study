<template>
  <!-- default -->
  <div v-if="!isShow" class="modal-todo">
    <div class="inner-modal">
			<strong>'뭐뭐' 설명 변경</strong>
			<p>'뭐뭐'의 변경할 설명을 입력해주세요.</p>
			<input type="text" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('TodoList')

export default {
  name: 'TodoListFailed',
  data() {
    return {
      isShow: true
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
.modal-todo {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	background: rgba(0, 0, 0, .5)
}

.modal-todo .inner-modal {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 10;
	transform: translate(-50%, -50%);
	width: 500px;
	height: 300px;
	padding: 30px 10px;
	border-radius: 15px;
	background: #fff;
	box-sizing: border-box;
}
</style>
