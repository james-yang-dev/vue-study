<template>
  <div class="home">
    <span>welcome home</span>
    <User></User>
  </div>
</template>

<script>
import User from '@/components/User.vue'

export default {
  name: 'Home',
  components: {
    User
  }
}
</script>
