<template>
  <div class="login">
    <div>
      <span>welcome login</span>
    </div>
    <div>
      <Login></Login>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login
  }
}
</script>

<style></style>
