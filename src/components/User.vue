<template class="user">
  <div>
    {{getMessage}}
    <button @click="isUser">user info</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('User')

export default {
  name: 'user',
  data() {
    return {
      introText: 'hi'
    }
  },
  computed: {
    ...mapState({
      message: state => state.message
    }),
    ...mapGetters(['getMessage'])
  },
  methods: {
    ...mapActions({
      checkUserInfo: 'checkUserInfo',
      isUser: 'isUser'
    }),
    submitted() {
      this.isSubmitted = true
      alert('aa')
    }
  }
}
</script>

<style>
</style>