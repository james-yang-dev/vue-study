<template>
  <div class="todo">
    <span>welcome Todo</span>
    <div>
      <Todo></Todo>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
  name: 'TodoPage',
  components: {
    Todo
  }
}
</script>

<style></style>
